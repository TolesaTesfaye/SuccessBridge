import { StudentProgress, Resource, QuizResult, Subject, Quiz, ResourceAccess } from '../models/index.js'
import { AppError } from '../middleware/errorHandler.js'
import sequelize from '../config/database.js'

export class StudentService {
  static async getProgress(studentId: string) {
    return await StudentProgress.findAll({
      where: { studentId },
      include: ['subject']
    })
  }

  static async getStats(studentId: string) {
    const totalResources = await Resource.count()
    const resourceAccessList = await ResourceAccess.findAll({ where: { studentId } })
    const uniqueResources = new Set(resourceAccessList.map(r => r.resourceId))
    const completedResources = uniqueResources.size

    
    // Fetch all quiz results with quizzes and subjects to classify them
    const quizResults = await QuizResult.findAll({
      where: { studentId },
      include: [
        {
          model: Quiz,
          as: 'quiz',
          include: [{ model: Subject, as: 'subject' }]
        }
      ]
    })

    const officialResults = quizResults.filter(r => !(r as any).quiz?.isAiGenerated);
    const aiResults = quizResults.filter(r => (r as any).quiz?.isAiGenerated);

    // Official quiz calculations
    const officialQuizzesCompleted = officialResults.length;
    const officialAverageScore = officialQuizzesCompleted > 0
      ? Math.round(officialResults.reduce((sum, r) => sum + r.score, 0) / officialQuizzesCompleted)
      : 0;

    // AI practice quiz calculations
    const aiQuizzesCompleted = aiResults.length;
    const aiAverageScore = aiQuizzesCompleted > 0
      ? Math.round(aiResults.reduce((sum, r) => sum + r.score, 0) / aiQuizzesCompleted)
      : 0;

    // Split subject progress for official quizzes
    const officialSubjectMap = new Map<string, { totalScore: number, count: number }>();
    for (const r of officialResults) {
      const subjectName = (r as any).quiz?.subject?.name || 'Academy Quizzes';
      const current = officialSubjectMap.get(subjectName) || { totalScore: 0, count: 0 };
      officialSubjectMap.set(subjectName, {
        totalScore: current.totalScore + r.score,
        count: current.count + 1
      });
    }
    const officialSubjectProgress = Array.from(officialSubjectMap.entries()).map(([subject, data]) => ({
      subject,
      progress: Math.round(data.totalScore / data.count),
      quizzes: data.count
    }));

    // Split subject progress for AI quizzes
    const aiSubjectMap = new Map<string, { totalScore: number, count: number }>();
    for (const r of aiResults) {
      const subjectName = (r as any).quiz?.subject?.name || 'AI Practice';
      const current = aiSubjectMap.get(subjectName) || { totalScore: 0, count: 0 };
      aiSubjectMap.set(subjectName, {
        totalScore: current.totalScore + r.score,
        count: current.count + 1
      });
    }
    const aiSubjectProgress = Array.from(aiSubjectMap.entries()).map(([subject, data]) => ({
      subject,
      progress: Math.round(data.totalScore / data.count),
      quizzes: data.count
    }));

    const avgScoreResult = await StudentProgress.findOne({
      attributes: [[sequelize.fn('AVG', sequelize.col('averageScore')), 'avgScore']],
      where: { studentId },
      raw: true
    }) as any

    const progressList = await StudentProgress.findAll({
      where: { studentId },
      include: [{ model: Subject, as: 'subject' }]
    })

    const subjectProgress = progressList.map(p => ({
      subject: (p as any).subject?.name || 'Unknown',
      progress: Math.round(p.averageScore || 0),
      quizzes: p.quizzesCompleted || 0
    }))

    // Calculate Study Streak
    const activeDates = new Set<string>();
    resourceAccessList.forEach(r => {
      if (r.createdAt) activeDates.add(new Date(r.createdAt).toISOString().split('T')[0]);
    });
    quizResults.forEach(r => {
      if (r.createdAt) activeDates.add(new Date(r.createdAt).toISOString().split('T')[0]);
    });
    
    const sortedDates = Array.from(activeDates).sort((a, b) => b.localeCompare(a));
    let studyStreak = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = yesterdayDate.toISOString().split('T')[0];
    
    let expectedDate = todayStr;
    if (sortedDates.length > 0 && sortedDates[0] === yesterdayStr && !sortedDates.includes(todayStr)) {
       expectedDate = yesterdayStr;
    }
    
    for (const date of sortedDates) {
      if (date === expectedDate) {
        studyStreak++;
        const nextDate = new Date(expectedDate);
        nextDate.setDate(nextDate.getDate() - 1);
        expectedDate = nextDate.toISOString().split('T')[0];
      } else {
        break;
      }
    }

    // Calculate Total Study Hours
    const totalQuizSeconds = quizResults.reduce((sum, r) => sum + (r.timeSpent || 0), 0);
    const estimatedResourceSeconds = completedResources * 600; // 10 mins per resource
    const totalStudyHours = Math.round((totalQuizSeconds + estimatedResourceSeconds) / 3600);

    // Generate Weekly Goals
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentQuizzes = quizResults.filter(r => new Date(r.createdAt) >= oneWeekAgo);
    const recentResources = resourceAccessList.filter(r => new Date(r.createdAt) >= oneWeekAgo);
    
    const weeklyGoals = [
      { goal: "Read 2 Resources This Week", done: recentResources.length >= 2 },
      { goal: "Take 1 Official Quiz This Week", done: recentQuizzes.filter(r => !(r as any).quiz?.isAiGenerated).length >= 1 },
      { goal: "Take 1 AI Quiz This Week", done: recentQuizzes.filter(r => (r as any).quiz?.isAiGenerated).length >= 1 },
      { goal: "Achieve a 3-Day Streak", done: studyStreak >= 3 }
    ];

    const recentQuizHistory = quizResults.map(r => {
      const q = (r as any).quiz;
      const ans = r.answers || {};
      const questionsAnswered = Object.keys(ans).length;
      // Use score vs totalPoints to estimate correct vs missed if exact counts aren't available
      return {
        id: r.id,
        quizTitle: q?.title || 'Unknown Quiz',
        subject: q?.subject?.name || 'Unknown',
        score: r.score,
        totalPoints: r.totalPoints,
        questionsAnswered,
        passed: r.passed,
        date: r.createdAt
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    return {
      totalResources,
      resourcesAccessed: completedResources || 0,
      quizzesCompleted: quizResults.length,
      averageScore: Math.round(Number(avgScoreResult?.avgScore || 0)),
      studyStreak,
      totalStudyHours,
      weeklyGoals,
      subjectProgress,
      recentQuizHistory,
      
      // Split stats
      officialQuizzesCompleted,
      officialAverageScore,
      officialSubjectProgress,
      
      aiQuizzesCompleted,
      aiAverageScore,
      aiSubjectProgress
    }
  }
}
