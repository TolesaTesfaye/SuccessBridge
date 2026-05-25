import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { Card, CardBody } from "@components/common/Card";
import { progressService } from "@services/progressService";
import { paymentService } from "@services/paymentService";
import { Loading } from "@components/common/Loading";
import { useAuthStore } from "@store/authStore";
import {
  Trophy,
  Target,
  BookOpen,
  Flame,
  Sparkles,
  Zap,
  Clock,
  Star,
  Brain,
  Rocket,
  BarChart3,
  TrendingUp,
  CreditCard,
  ChevronRight,
  ArrowUpRight,
  Award as AchievementIcon,
  BookMarked,
  GraduationCap,
  Timer,
  AlertCircle,
  CheckCircle,
  Circle,
} from "lucide-react";

interface ProgressData {
  resourcesAccessed: number;
  quizzesCompleted: number;
  averageScore: number;
  studyStreak: number;
  subjectProgress: Array<{
    subject: string;
    progress: number;
    quizzes: number;
  }>;
}

interface PaymentData {
  id: string;
  amount: number;
  currency?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string | Date;
  approvedAt?: string | Date;
}

interface Achievement {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  unlocked: boolean;
}

const StudentProgress: React.FC = () => {
  const [stats, setStats] = useState<ProgressData | null>(null);
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, paymentsData] = await Promise.all([
          progressService.getStats(),
          paymentService.getUserPayments().then((res) => res.data || []),
        ]);
        setStats(statsData);
        setPayments(paymentsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading message="Analyzing your academic journey..." />;

  if (!stats) return <Loading message="Loading your progress..." />;

  // Calculate payment status
  const latestPayment = payments.length > 0 ? payments[0] : null;
  const isPaymentApproved = latestPayment?.status === "approved";
  const isPaymentPending = latestPayment?.status === "pending";

  // Calculate overall progress (combining quiz performance and payment)
  const calculateOverallProgress = () => {
    const quizWeight = 0.6;
    const paymentWeight = 0.4;
    const quizProgress = stats?.averageScore || 0;
    const paymentProgress = isPaymentApproved ? 100 : isPaymentPending ? 50 : 0;
    return Math.round(
      quizProgress * quizWeight + paymentProgress * paymentWeight,
    );
  };

  const overallProgress = calculateOverallProgress();

  // Generate achievements based on stats and payment
  const getAchievements = (): Achievement[] => {
    const achievements: Achievement[] = [
      {
        id: "straight-a",
        icon: Star,
        label: "Straight A Student",
        description: "Maintain 90%+ average score",
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
        unlocked: stats?.averageScore >= 90 || false,
      },
      {
        id: "week-warrior",
        icon: Flame,
        label: "Week Warrior",
        description: "7+ day study streak",
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        unlocked: (stats?.studyStreak || 0) >= 7,
      },
      {
        id: "quiz-master",
        icon: Brain,
        label: "Quiz Master",
        description: "Complete 10+ quizzes",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        unlocked: (stats?.quizzesCompleted || 0) >= 10,
      },
      {
        id: "knowledge-seeker",
        icon: BookOpen,
        label: "Knowledge Seeker",
        description: "Access 20+ resources",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        unlocked: (stats?.resourcesAccessed || 0) >= 20,
      },
      {
        id: "paid-member",
        icon: CreditCard,
        label: "Premium Member",
        description: "Active payment status",
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        unlocked: isPaymentApproved || false,
      },
      {
        id: "dedicated-learner",
        icon: GraduationCap,
        label: "Dedicated Learner",
        description: "Study 40+ hours",
        color: "text-indigo-500",
        bgColor: "bg-indigo-500/10",
        unlocked: false, // Would need study hours data
      },
    ];
    return achievements;
  };

  const achievements = getAchievements();
  const unlockedAchievements = achievements.filter((a) => a.unlocked);

  // Get progress color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-500";
    if (percentage >= 70) return "text-blue-500";
    if (percentage >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getPaymentStatusInfo = () => {
    if (!latestPayment) {
      return {
        status: "No Payment",
        color: "text-gray-500",
        bgColor: "bg-gray-100 dark:bg-gray-800",
        icon: AlertCircle,
        message: "Complete your payment to unlock all features",
      };
    }
    switch (latestPayment.status) {
      case "approved":
        return {
          status: "Active",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30",
          icon: CheckCircle,
          message: "Your payment is approved. Full access granted!",
        };
      case "pending":
        return {
          status: "Pending",
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
          icon: Clock,
          message: "Your payment is being reviewed",
        };
      case "rejected":
        return {
          status: "Rejected",
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-900/30",
          icon: AlertCircle,
          message: "Payment was rejected. Please try again.",
        };
    }
  };

  const paymentInfo = getPaymentStatusInfo();

  return (
    <DashboardLayout
      title="Your Progress"
      subtitle="Track your learning journey, achievements, and milestones"
    >
      <div className="space-y-6 max-w-7xl mx-auto pb-12 px-2 md:px-0">
        {/* Hero Section - Overall Progress */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 md:p-10 text-white">
          <div className="absolute top-0 right-0 opacity-10">
            <Rocket size={250} />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-4xl font-black mb-2">
                  Welcome back, {user?.name?.split(" ")[0] || "Learner"}! 🚀
                </h2>
                <p className="text-blue-100 text-sm md:text-base max-w-lg">
                  You're making great progress! Keep up the momentum and reach
                  your learning goals.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                    <Flame size={16} className="text-orange-300" />
                    <span className="font-bold text-sm">
                      {stats?.studyStreak || 0} Day Streak
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                    <Trophy size={16} className="text-yellow-300" />
                    <span className="font-bold text-sm">
                      Top {Math.min(Math.floor(Math.random() * 20) + 1, 15)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Circular Progress */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="white"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${overallProgress * 2.83} 283`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl md:text-4xl font-black">
                      {overallProgress}%
                    </span>
                    <span className="text-xs text-blue-200">Overall</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Resources Card */}
          <Card className="hoverable group">
            <CardBody className="p-4 md:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                    Resources
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mt-1">
                    {stats?.resourcesAccessed || 0}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-green-600 dark:text-green-400 text-xs font-bold">
                    <TrendingUp size={12} />
                    <span>+12%</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <BookOpen
                    size={20}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Quizzes Card */}
          <Card className="hoverable group">
            <CardBody className="p-4 md:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                    Quizzes Done
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mt-1">
                    {stats?.quizzesCompleted || 0}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-green-600 dark:text-green-400 text-xs font-bold">
                    <TrendingUp size={12} />
                    <span>+8%</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Target
                    size={20}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Average Score Card */}
          <Card className="hoverable group">
            <CardBody className="p-4 md:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                    Avg Score
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mt-1">
                    {stats?.averageScore || 0}%
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-green-600 dark:text-green-400 text-xs font-bold">
                    <TrendingUp size={12} />
                    <span>+5%</span>
                  </div>
                </div>
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <Trophy
                    size={20}
                    className="text-amber-600 dark:text-amber-400"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Study Streak Card */}
          <Card className="hoverable group">
            <CardBody className="p-4 md:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                    Day Streak
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mt-1">
                    {stats?.studyStreak || 0}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-orange-600 dark:text-orange-400 text-xs font-bold">
                    <Flame size={12} />
                    <span>On Fire!</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Flame
                    size={20}
                    className="text-orange-600 dark:text-orange-400"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Subject Performance - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-white/5 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-800/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl">
                      <BarChart3
                        size={18}
                        className="text-indigo-600 dark:text-indigo-400"
                      />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">
                      Subject Performance
                    </h3>
                  </div>
                </div>
              </div>

              <CardBody className="p-4 md:p-6">
                {(stats?.subjectProgress?.length || 0) > 0 ? (
                  <div className="space-y-4">
                    {stats.subjectProgress.map((item, index) => {
                      const gradients = [
                        "from-blue-500 to-indigo-500",
                        "from-purple-500 to-pink-500",
                        "from-emerald-400 to-teal-500",
                        "from-orange-400 to-amber-500",
                        "from-rose-500 to-red-600",
                        "from-cyan-500 to-blue-600",
                      ];
                      const barGradient = gradients[index % gradients.length];
                      const percentage = item.progress;

                      return (
                        <div
                          key={item.subject}
                          className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 hover:shadow-md transition-all duration-300 cursor-pointer group"
                          onClick={() =>
                            setSelectedSubject(
                              selectedSubject === item.subject
                                ? null
                                : item.subject,
                            )
                          }
                        >
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <span className="text-lg font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {item.subject}
                              </span>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {item.quizzes} quizzes completed
                              </p>
                            </div>
                            <div className="text-right">
                              <span
                                className={`text-2xl font-black ${getProgressColor(percentage)}`}
                              >
                                {percentage}%
                              </span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <div
                              className={`bg-gradient-to-r ${barGradient} h-full rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>

                          {/* Expanded Details */}
                          {selectedSubject === item.subject && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 grid grid-cols-3 gap-4 text-center">
                              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">
                                  Chapters
                                </p>
                                <p className="text-lg font-black text-gray-900 dark:text-white mt-1">
                                  {Math.floor(percentage / 10)}/10
                                </p>
                              </div>
                              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">
                                  Best Score
                                </p>
                                <p className="text-lg font-black text-gray-900 dark:text-white mt-1">
                                  {Math.min(percentage + 10, 100)}%
                                </p>
                              </div>
                              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">
                                  Time Spent
                                </p>
                                <p className="text-lg font-black text-gray-900 dark:text-white mt-1">
                                  {Math.floor(Math.random() * 20) + 5}h
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 px-4">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target size={28} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                      Start Your Journey
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                      Complete your first quiz to begin tracking your subject
                      mastery!
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Payment Status Card */}
            <Card className="overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${paymentInfo.bgColor}`}>
                    <paymentInfo.icon size={18} className={paymentInfo.color} />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">
                    Payment Status
                  </h3>
                </div>
              </div>
              <CardBody className="p-4 md:p-5">
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${paymentInfo.bgColor}`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${paymentInfo.color}`}>
                        {paymentInfo.status}
                      </span>
                      <ChevronRight size={18} className={paymentInfo.color} />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {paymentInfo.message}
                    </p>
                  </div>

                  {latestPayment && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Amount
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {latestPayment.currency
                            ? `${latestPayment.currency} `
                            : "ETB "}
                          {latestPayment.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Date
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {new Date(
                            latestPayment.createdAt,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      {latestPayment.approvedAt && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            Approved
                          </span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            {new Date(
                              latestPayment.approvedAt,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                    <CreditCard size={18} />
                    {latestPayment ? "View Payment Details" : "Make Payment"}
                  </button>
                </div>
              </CardBody>
            </Card>

            {/* Achievements Card */}
            <Card className="overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-xl">
                    <AchievementIcon
                      size={18}
                      className="text-amber-600 dark:text-amber-400"
                    />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">
                    Achievements
                  </h3>
                </div>
              </div>
              <CardBody className="p-4">
                <div className="grid grid-cols-3 gap-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`relative p-3 rounded-xl text-center transition-all duration-300 ${
                        achievement.unlocked
                          ? `${achievement.bgColor} cursor-pointer hover:scale-105`
                          : "bg-gray-100 dark:bg-gray-800 opacity-50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                          achievement.unlocked
                            ? "bg-white dark:bg-gray-900"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        <achievement.icon
                          size={20}
                          className={
                            achievement.unlocked
                              ? achievement.color
                              : "text-gray-400"
                          }
                        />
                      </div>
                      <p
                        className={`text-xs font-bold ${
                          achievement.unlocked
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-500"
                        }`}
                      >
                        {achievement.label}
                      </p>
                      {achievement.unlocked && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle size={8} className="text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                  {unlockedAchievements.length} of {achievements.length}{" "}
                  unlocked
                </p>
              </CardBody>
            </Card>

            {/* Weekly Goals */}
            <Card className="overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl">
                    <Target
                      size={18}
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">
                    Weekly Goals
                  </h3>
                </div>
              </div>
              <CardBody className="p-4">
                <div className="space-y-3">
                  {[
                    {
                      goal: "Complete Chemistry Ch. 3",
                      done: true,
                      icon: BookMarked,
                    },
                    {
                      goal: "Score 80%+ on Math Quiz",
                      done: true,
                      icon: CheckCircle,
                    },
                    {
                      goal: "Read 2 History Resources",
                      done: false,
                      icon: Circle,
                    },
                    {
                      goal: "Study for 5 Hours",
                      done: false,
                      icon: Timer,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <item.icon
                        size={18}
                        className={
                          item.done ? "text-green-500" : "text-gray-400"
                        }
                      />
                      <span
                        className={`text-sm font-semibold flex-1 ${
                          item.done
                            ? "text-gray-500 dark:text-gray-400 line-through"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {item.goal}
                      </span>
                      {item.done && (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Motivational Footer */}
        <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-700 dark:to-purple-800 overflow-hidden">
          <CardBody className="p-6 md:p-8 text-white relative">
            <div className="absolute -top-12 -right-12 opacity-10">
              <Sparkles size={200} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={24} className="text-yellow-300 fill-yellow-300" />
                  <h4 className="text-xl font-black">Keep the momentum!</h4>
                </div>
                <p className="text-indigo-100 font-medium max-w-xl">
                  You're in the top performers this week. Your consistency is
                  paying off. Keep pushing forward and unlock more achievements!
                </p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors whitespace-nowrap">
                Continue Learning
                <ArrowUpRight size={18} />
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export { StudentProgress };
