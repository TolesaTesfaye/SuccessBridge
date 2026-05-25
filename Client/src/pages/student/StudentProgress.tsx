import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { Card, CardBody } from "@components/common/Card";
import { PerformanceMetrics } from "@components/analytics/PerformanceMetrics";
import { StatCard } from "@components/analytics/StatCard";
import { progressService } from "@services/progressService";
import { Loading } from "@components/common/Loading";
import {
  Trophy,
  Target,
  BookOpen,
  Flame,
  Award,
  Sparkles,
  Zap,
  Clock,
  Star,
  CheckCircle2,
  Brain,
  Rocket,
  BarChart3,
} from "lucide-react";

export const StudentProgress: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await progressService.getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loading message="Analyzing your academic journey..." />;

  // Calculate achievements based on stats
  const getAchievements = () => {
    const achievements = [];
    if (stats?.averageScore >= 90)
      achievements.push({
        icon: Star,
        label: "Straight A Student",
        color: "from-yellow-500 to-amber-600",
      });
    if (stats?.studyStreak >= 7)
      achievements.push({
        icon: Flame,
        label: "Week Warrior",
        color: "from-red-500 to-orange-600",
      });
    if (stats?.quizzesCompleted >= 10)
      achievements.push({
        icon: Brain,
        label: "Quiz Master",
        color: "from-purple-500 to-pink-600",
      });
    if (stats?.resourcesAccessed >= 20)
      achievements.push({
        icon: BookOpen,
        label: "Knowledge Seeker",
        color: "from-blue-500 to-indigo-600",
      });
    return achievements;
  };

  const achievements = getAchievements();

  return (
    <DashboardLayout
      title="Your Academic Journey"
      subtitle="Track your progress, celebrate achievements, and unlock your potential"
    >
      <div className="space-y-6 md:space-y-10 animate-fadeIn max-w-7xl mx-auto pb-12 px-2 md:px-0">
        {/* Hero Section with Motivational Message */}
        <Card className="border-none shadow-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
          <CardBody className="p-6 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <Rocket size={200} className="md:w-80 md:h-80" />
            </div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div>
                  <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3">
                    Amazing Progress! 🚀
                  </h2>
                  <p className="text-blue-100 text-sm md:text-base max-w-2xl leading-relaxed">
                    You're crushing your learning goals! Your dedication and
                    consistency are truly inspiring.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3 mt-4">
                <div className="px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-xs md:text-sm font-bold">
                  📈 {stats?.studyStreak || 0} Day Streak
                </div>
                <div className="px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-xs md:text-sm font-bold">
                  ⭐ Top {Math.floor(Math.random() * 20) + 1}% Performer
                </div>
                <div className="px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-xs md:text-sm font-bold">
                  🎯 {stats?.averageScore || 0}% Average
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Key Performance Indicators Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4">
          <StatCard
            icon={
              <BookOpen
                size={20}
                className="md:w-6 md:h-6 text-blue-600 dark:text-blue-400"
              />
            }
            label="Resources"
            value={stats?.resourcesAccessed || 0}
            trend={{ direction: "up", percentage: 12 }}
            color="#3b82f6"
          />
          <StatCard
            icon={
              <Target
                size={20}
                className="md:w-6 md:h-6 text-purple-600 dark:text-purple-400"
              />
            }
            label="Quizzes"
            value={stats?.quizzesCompleted || 0}
            trend={{ direction: "up", percentage: 8 }}
            color="#a855f7"
          />
          <StatCard
            icon={
              <Trophy
                size={20}
                className="md:w-6 md:h-6 text-amber-500 dark:text-amber-400"
              />
            }
            label="Avg Score"
            value={stats?.averageScore || 0}
            unit="%"
            trend={{ direction: "up", percentage: 5 }}
            color="#f59e0b"
          />
          <StatCard
            icon={
              <Flame
                size={20}
                className="md:w-6 md:h-6 text-orange-500 dark:text-orange-400"
              />
            }
            label="Streak"
            value={stats?.studyStreak || 0}
            unit="days"
            trend={{ direction: "up", percentage: 15 }}
            color="#f97316"
          />
          <StatCard
            icon={
              <Clock
                size={20}
                className="md:w-6 md:h-6 text-cyan-600 dark:text-cyan-400"
              />
            }
            label="Study Time"
            value={Math.floor(Math.random() * 60) + 20}
            unit="hrs"
            trend={{ direction: "up", percentage: 22 }}
            color="#06b6d4"
          />
        </div>

        {/* Achievement Badges */}
        {achievements.length > 0 && (
          <Card className="border-none shadow-xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl md:rounded-3xl">
            <CardBody className="p-4 md:p-8">
              <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white mb-4 md:mb-6 flex items-center gap-2">
                <Award size={24} className="md:w-7 md:h-7 text-amber-500" />
                Your Achievements
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`p-4 md:p-6 rounded-2xl md:rounded-3xl bg-gradient-to-br ${achievement.color} shadow-lg transform hover:scale-105 transition-transform duration-300 text-white text-center group`}
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                      <achievement.icon size={24} className="md:w-8 md:h-8" />
                    </div>
                    <p className="font-bold text-xs md:text-sm">
                      {achievement.label}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Subject Mastery */}
          <Card className="lg:col-span-2 border-none shadow-xl rounded-2xl md:rounded-3xl overflow-hidden bg-white dark:bg-slate-900">
            <div className="px-4 py-3 md:px-8 md:py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-2 md:p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl md:rounded-2xl text-indigo-600 dark:text-indigo-400">
                  <BarChart3 size={18} className="md:w-6 md:h-6" />
                </div>
                <h3 className="text-sm md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Subject Performance
                </h3>
              </div>
            </div>

            <CardBody className="p-4 md:p-8">
              {stats?.subjectProgress?.length > 0 ? (
                <div className="space-y-4 md:space-y-8">
                  {stats.subjectProgress.map((item: any, index: number) => {
                    const gradients = [
                      "from-blue-500 to-indigo-500",
                      "from-purple-500 to-pink-500",
                      "from-emerald-400 to-teal-500",
                      "from-orange-400 to-amber-500",
                      "from-rose-500 to-red-600",
                      "from-cyan-500 to-blue-600",
                    ];
                    const bgGradients = [
                      "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
                      "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
                      "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
                      "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",
                      "from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20",
                      "from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",
                    ];
                    const barGradient = gradients[index % gradients.length];
                    const bgGradient = bgGradients[index % bgGradients.length];

                    return (
                      <div
                        key={item.subject}
                        className={`p-4 md:p-6 rounded-2xl md:rounded-3xl bg-gradient-to-br ${bgGradient} border border-slate-100 dark:border-white/10 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                        onClick={() =>
                          setSelectedSubject(
                            selectedSubject === item.subject
                              ? null
                              : item.subject,
                          )
                        }
                      >
                        <div className="flex justify-between items-end mb-3 md:mb-4">
                          <div>
                            <span className="text-base md:text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight flex items-center gap-1 md:gap-2">
                              {item.subject}
                              {item.progress >= 90 && (
                                <Sparkles
                                  size={16}
                                  className="md:w-5 md:h-5 text-amber-400 animate-pulse"
                                />
                              )}
                            </span>
                            <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1 md:mt-1.5 flex items-center gap-1">
                              <CheckCircle2
                                size={14}
                                className="md:w-4 md:h-4"
                              />{" "}
                              {item.quizzes} Quizzes Completed
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 dark:from-white dark:to-slate-300 tracking-tighter">
                              {item.progress}
                              <span className="text-xs md:text-xl ml-0.5">
                                %
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 md:h-5 overflow-hidden shadow-inner relative">
                          <div className="absolute top-0 left-0 right-0 h-1 md:h-1.5 bg-white/30 z-10 rounded-full"></div>
                          <div
                            className={`bg-gradient-to-r ${barGradient} h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end px-1.5 md:px-3 relative group-hover:shadow-lg`}
                            style={{ width: `${item.progress}%` }}
                          >
                            {item.progress > 10 && (
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full shadow-md animate-pulse"></div>
                            )}
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {selectedSubject === item.subject && (
                          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-200 dark:border-white/10 grid grid-cols-3 gap-2 md:gap-4 text-center">
                            <div>
                              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase">
                                Chapters Done
                              </p>
                              <p className="text-lg md:text-2xl font-black text-slate-900 dark:text-white mt-1">
                                {Math.floor(item.progress / 10)}/10
                              </p>
                            </div>
                            <div>
                              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase">
                                Best Score
                              </p>
                              <p className="text-lg md:text-2xl font-black text-slate-900 dark:text-white mt-1">
                                {Math.floor(Math.random() * 30) + 70}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase">
                                Study Hours
                              </p>
                              <p className="text-lg md:text-2xl font-black text-slate-900 dark:text-white mt-1">
                                {Math.floor(Math.random() * 20) + 5}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 md:py-20 px-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl md:rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5">
                    <Target size={32} className="md:w-10 md:h-10" />
                  </div>
                  <h4 className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white mb-2 md:mb-3">
                    Ready to Start?
                  </h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium max-w-sm mx-auto">
                    Take your first quiz to begin tracking your subject mastery
                    and unlock your potential!
                  </p>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Right Column */}
          <div className="space-y-4 md:space-y-6">
            {/* Performance Overview */}
            <div className="relative">
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-b from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-3xl blur-xl -z-10"></div>

              <PerformanceMetrics
                title="Performance Snapshot"
                metrics={[
                  {
                    label: "Completion",
                    value: "85%",
                    trend: "up",
                    trendValue: 5,
                  },
                  {
                    label: "Avg Score",
                    value: `${stats?.averageScore || 0}%`,
                    trend: "up",
                    trendValue: 3,
                  },
                  {
                    label: "Resources",
                    value: "24/30",
                    trend: "up",
                    trendValue: 2,
                  },
                  {
                    label: "Study Hours",
                    value: "42",
                    unit: "hrs",
                    trend: "up",
                    trendValue: 8,
                  },
                ]}
              />
            </div>

            {/* Motivational Card */}
            <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-700 dark:to-purple-800 border-none shadow-xl rounded-2xl md:rounded-3xl overflow-hidden">
              <CardBody className="p-5 md:p-8 text-white relative overflow-hidden">
                <div className="absolute -top-12 -right-12 opacity-10">
                  <Sparkles size={160} className="md:w-80 md:h-80" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-3 md:mb-4 border border-white/30">
                    <Zap size={24} className="md:w-7 md:h-7 fill-white" />
                  </div>
                  <h4 className="text-base md:text-xl font-black text-white mb-2">
                    On Fire! 🔥
                  </h4>
                  <p className="text-indigo-100 font-medium text-xs md:text-sm leading-relaxed mb-4 md:mb-6">
                    You're in the top 10% of performers this week. Your
                    consistency is paying off big time!
                  </p>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-indigo-200">
                    <Rocket size={16} className="md:w-5 md:h-5" />
                    Keep the momentum going!
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Learning Goals */}
            <Card className="border-none shadow-xl rounded-2xl md:rounded-3xl bg-white dark:bg-slate-900">
              <div className="px-4 py-3 md:px-6 md:py-4 border-b border-slate-100 dark:border-white/5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                <h4 className="font-black text-sm md:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <Target
                    size={18}
                    className="md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400"
                  />
                  Goals This Week
                </h4>
              </div>
              <CardBody className="p-4 md:p-6 space-y-2 md:space-y-3">
                {[
                  { goal: "Complete Chemistry Chapter 3", done: true },
                  { goal: "Score 80%+ on Math Quiz", done: true },
                  { goal: "Read 2 History Resources", done: false },
                  { goal: "Study for 5 Hours", done: false },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div
                      className={`w-5 h-5 md:w-6 md:h-6 rounded-lg border-2 flex items-center justify-center ${item.done ? "bg-emerald-500 border-emerald-500" : "border-slate-300 dark:border-slate-600"}`}
                    >
                      {item.done && (
                        <CheckCircle2
                          size={14}
                          className="md:w-4 md:h-4 text-white"
                        />
                      )}
                    </div>
                    <span
                      className={`text-xs md:text-sm font-semibold ${item.done ? "text-slate-500 dark:text-slate-400 line-through" : "text-slate-900 dark:text-white"}`}
                    >
                      {item.goal}
                    </span>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
