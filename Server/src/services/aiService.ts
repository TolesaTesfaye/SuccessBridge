/** Groq is OpenAI-compatible; we use its Chat Completions endpoint. */
type GroqChatRole = "system" | "user" | "assistant";

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getGroqConfig = () => {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not configured in the server environment. Add it to Server/.env to enable AI features.",
    );
  }

  return {
    apiKey,
    baseUrl: (process.env.GROQ_BASE_URL?.trim() ||
      "https://api.groq.com/openai/v1") as string,
    model: (process.env.GROQ_MODEL?.trim() ||
      "llama-3.1-8b-instant") as string,
  };
};

const isRetryableGroqError = (error: unknown): boolean => {
  const msg = getErrorMessage(error);
  return /429|rate limit|Too Many Requests|timeout|ETIMEDOUT|ECONNRESET|503|temporarily unavailable/i.test(
    msg,
  );
};

const classifyGroqFailure = (error: unknown): string => {
  const msg = getErrorMessage(error);
  if (/GROQ_API_KEY|API key/i.test(msg)) {
    return "Groq API key is missing/invalid. Add GROQ_API_KEY to Server/.env.";
  }
  if (/429|rate limit|Too Many Requests/i.test(msg)) {
    return "Groq rate limit reached. Please wait a moment and try again.";
  }
  if (/401|unauthorized/i.test(msg)) {
    return "Groq API key is invalid/unauthorized. Regenerate your key in Groq Cloud.";
  }
  return "Groq was unavailable. Template questions were added instead.";
};

type GroqChatMessage = { role: GroqChatRole; content: string };

const groqChatCompletion = async (params: {
  messages: GroqChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormatJson?: boolean;
}): Promise<string> => {
  const { apiKey, baseUrl, model } = getGroqConfig();
  const chosenModel = params.model ?? model;

  const body: any = {
    model: chosenModel,
    messages: params.messages,
    temperature: params.temperature ?? 0.3,
  };

  if (typeof params.maxTokens === "number") body.max_tokens = params.maxTokens;

  // Groq supports OpenAI-compatible response_format for JSON on supported models.
  if (params.responseFormatJson) {
    body.response_format = { type: "json_object" };
  }

  const url = `${baseUrl.replace(/\/+$/, "")}/chat/completions`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Groq API error ${res.status}: ${text || res.statusText || "Unknown error"}`,
    );
  }

  const json: any = await res.json();
  const content = json?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || content.trim() === "") {
    throw new Error("Groq returned an empty response.");
  }
  return content;
};

const parseJsonArray = (text: string): unknown[] => {
  const trimmed = text.trim();
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = (fenceMatch ? fenceMatch[1] : trimmed).trim();
  const parsed = JSON.parse(jsonStr);
  if (!Array.isArray(parsed)) {
    throw new Error("AI generated an invalid quiz format. Please try again.");
  }
  return parsed;
};

const buildLocalQuizFallback = (
  topic: string,
  subjectName: string,
  difficulty: string,
  questionCount: number,
): unknown[] => {
  const points =
    difficulty === "hard" ? 10 : difficulty === "easy" ? 5 : 8;
  const stems = [
    `Which statement best describes a core idea in "${topic}" (${subjectName})?`,
    `What is the most accurate definition related to "${topic}" in ${subjectName}?`,
    `Which example best illustrates "${topic}" in the context of ${subjectName}?`,
    `What is a common misconception about "${topic}" in ${subjectName}?`,
    `Which approach is most appropriate when studying "${topic}" in ${subjectName}?`,
  ];

  return Array.from({ length: questionCount }, (_, i) => {
    const correct = `Key concept ${String.fromCharCode(66 + (i % 3))}`;
    const options = [
      `Distractor A for question ${i + 1}`,
      correct,
      `Distractor C for question ${i + 1}`,
      `Distractor D for question ${i + 1}`,
    ];
    return {
      id: `fallback_q${i + 1}`,
      text: stems[i % stems.length],
      type: "multiple_choice",
      options,
      correctAnswer: correct,
      points,
    };
  });
};

export type QuizGenerationResult = {
  questions: unknown[];
  source: "groq" | "fallback";
  model?: string;
  fallbackReason?: string;
};

export class AIService {
  /**
   * Generates a chat response from Groq acting as an academic tutor.
   */
  static async generateChatResponse(
    messages: { role: "user" | "model"; content: string }[],
  ): Promise<string> {
    const system =
      "You are 'BridgeBot', a highly encouraging, friendly, and expert academic tutor on the SuccessBridge learning platform. " +
      "Your mission is to help students learn, explain concepts clearly, suggest resources, answer queries, and keep them motivated. " +
      "Keep your answers structured, clear, and concise. Use clean markdown formatting (headers, bullet points, bold text). " +
      "If the student asks something completely off-topic or unrelated to academics, politely guide them back to their studies.";

    const converted: GroqChatMessage[] = [
      { role: "system", content: system },
      ...messages.map((m) => ({
        role: (m.role === "user" ? "user" : "assistant") as GroqChatRole,
        content: m.content,
      })),
    ];

    return await groqChatCompletion({
      messages: converted,
      temperature: 0.5,
      maxTokens: 800,
    });
  }

  /**
   * Explains a specific concept with different explanation styles.
   */
  static async explainConcept(
    concept: string,
    subject?: string,
    style: string = "simple",
  ): Promise<string> {
    let prompt = `Explain the concept of "${concept}"`;
    if (subject) {
      prompt += ` in the context of the subject "${subject}"`;
    }

    if (style === "simple") {
      prompt += `. Please explain it in simple, easy-to-understand terms suitable for a beginner. Use common analogies where helpful. Imagine explaining it to someone with no prior background in this topic.`;
    } else if (style === "analogy") {
      prompt += `. Explain it primarily using a creative, relatable analogy or metaphor, showing how it works in real-world terms, followed by a brief summary.`;
    } else if (style === "deep_dive") {
      prompt += `. Provide a detailed, advanced technical explanation. Cover core principles, theoretical foundations, real-world engineering or practical applications, and advanced subtopics.`;
    }

    prompt += ` Structure your response beautifully using markdown headers, bullet points, bold keywords, and code snippets or examples if applicable.`;
    return await groqChatCompletion({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful academic tutor. Be accurate, concise, and well-structured in Markdown.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      maxTokens: 900,
    });
  }

  /**
   * Generates a multiple-choice quiz about a topic in structured JSON.
   */
  static async generateQuiz(
    topic: string,
    subjectName: string,
    difficulty: string,
    questionCount: number = 5,
  ): Promise<QuizGenerationResult> {
    const prompt = `Generate a ${difficulty} difficulty multiple-choice quiz about the topic "${topic}" for the subject "${subjectName}".
The quiz must contain exactly ${questionCount} questions.
You must output a raw JSON array matching this TypeScript interface structure:
interface IQuestion {
  id: string; // Generate a unique identifier like q1, q2, q3, etc.
  text: string; // The question text
  type: 'multiple_choice';
  options: string[]; // Exactly 4 choices/options
  correctAnswer: string; // Must exactly match one of the string values in the options array
  points: number; // Set points (e.g. 10 per question)
}

Do not include any wrapping markdown formatting like \`\`\`json. Return only the valid JSON array string. Ensure that the correctAnswer matches one of the values in the options array exactly.`;

    let lastError: unknown;

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const { model } = getGroqConfig();
        const text = await groqChatCompletion({
          messages: [
            {
              role: "system",
              content:
                "Return ONLY valid JSON. No markdown. Output must be a JSON array of questions.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.2,
          maxTokens: 1400,
        });
        const questions = parseJsonArray(text);
        return { questions, source: "groq", model };
      } catch (error) {
        lastError = error;
        const msg = getErrorMessage(error);
        if (!isRetryableGroqError(error) || attempt === 1) break;
        const retrySec = Number(msg.match(/retry(?:ing)? in (\d+)/i)?.[1]) || 3;
        await sleep(Math.min(retrySec, 20) * 1000);
      }
    }

    console.warn(
      "Groq failed for quiz generation; using server-side templates:",
      getErrorMessage(lastError),
    );
    return {
      questions: buildLocalQuizFallback(
        topic,
        subjectName,
        difficulty.toLowerCase(),
        questionCount,
      ),
      source: "fallback",
      fallbackReason: classifyGroqFailure(lastError),
    };
  }

  /**
   * Summarizes notes or lessons for students.
   */
  static async summarizeText(
    text: string,
    maxLength?: number,
  ): Promise<string> {
    let prompt = `Summarize the following text or notes for a student. 
Generate a clear, high-yield summary that contains:
1. A brief overview paragraph.
2. Key terms/concepts defined in a checklist or list.
3. Bullet points of the most important takeaways.
4. If applicable, a quick-review question with answer to help test understanding.

Make it highly legible, structured, and easy to review before an exam.`;

    if (maxLength) {
      prompt += ` Keep the summary under ${maxLength} words.`;
    }

    prompt += `\n\nText to summarize:\n${text}`;
    return await groqChatCompletion({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful academic tutor. Produce a concise, well-structured Markdown summary.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      maxTokens: 900,
    });
  }

  /**
   * Generates a weekly/daily study plan.
   */
  static async generateStudyPlan(
    topic: string,
    durationWeeks: number,
    hoursPerDay: number,
    currentLevel: string,
  ): Promise<string> {
    const prompt = `Create a custom, structured study plan for a student wishing to master the topic/skill: "${topic}".
Details:
- Duration: ${durationWeeks} weeks
- Daily study allocation: ${hoursPerDay} hours per day
- Current expertise level: ${currentLevel}

Please structure the study plan to be highly action-oriented. For each week, outline:
1. Weekly Goal & Main Theme
2. Daily task-by-task breakdown (Day 1 through Day 5, assuming a 5-day study week)
3. Key milestones or self-assessment checkpoint for the week
4. Recommended study techniques or resources (e.g. active recall, practice quizzes, specific documentation/topics to read)

Format the response using clean Markdown. Use headers, bold text, checklists, and bullet points to make it visually engaging and readable.`;
    return await groqChatCompletion({
      messages: [
        {
          role: "system",
          content:
            "You are a study coach. Produce a practical, structured Markdown plan.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      maxTokens: 1200,
    });
  }
}
