import { GoogleGenerativeAI } from "@google/generative-ai";

const getGenAI = (): GoogleGenerativeAI => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured in the server environment. Please get an API key from Google AI Studio and add it to your Server/.env file.",
    );
  }
  return new GoogleGenerativeAI(apiKey);
};

export class AIService {
  /**
   * Generates a chat response from Gemini acting as an academic tutor.
   */
  static async generateChatResponse(
    messages: { role: "user" | "model"; content: string }[],
  ): Promise<string> {
    const genAI = getGenAI();
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction:
        "You are 'BridgeBot', a highly encouraging, friendly, and expert academic tutor on the SuccessBridge learning platform. " +
        "Your mission is to help students learn, explain concepts clearly, suggest resources, answer queries, and keep them motivated. " +
        "Keep your answers structured, clear, and concise. Use clean markdown formatting (headers, bullet points, bold text). " +
        "If the student asks something completely off-topic or unrelated to academics, politely guide them back to their studies.",
    });

    // Translate our user/model role list into the format Gemini expects
    // Note: Gemini chat history MUST start with a 'user' message. We filter out any initial model greeting messages.
    let filteredMessages = messages.slice(0, -1);
    while (filteredMessages.length > 0 && filteredMessages[0].role !== "user") {
      filteredMessages.shift();
    }

    const history = filteredMessages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
      history: history,
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    return response.text();
  }

  /**
   * Explains a specific concept with different explanation styles.
   */
  static async explainConcept(
    concept: string,
    subject?: string,
    style: string = "simple",
  ): Promise<string> {
    const genAI = getGenAI();
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  /**
   * Generates a multiple-choice quiz about a topic in structured JSON.
   */
  static async generateQuiz(
    topic: string,
    subjectName: string,
    difficulty: string,
    questionCount: number = 5,
  ): Promise<any[]> {
    const genAI = getGenAI();
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    // Use JSON-mode response to ensure we get structured data
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Gemini JSON quiz:", text);
      throw new Error("AI generated an invalid quiz format. Please try again.");
    }
  }

  /**
   * Summarizes notes or lessons for students.
   */
  static async summarizeText(
    text: string,
    maxLength?: number,
  ): Promise<string> {
    const genAI = getGenAI();
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
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
    const genAI = getGenAI();
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }
}
