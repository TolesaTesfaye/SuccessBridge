import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { userService } from "@services/userService";

interface StudentsTabProps {
  onViewStudent: (student: any) => void;
  onShowModal: () => void;
}

export const StudentsTab: React.FC<StudentsTabProps> = ({
  onViewStudent,
  onShowModal,
}) => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers(1, 100, "student");
      const studentsList = Array.isArray(response.data) ? response.data : [];
      setStudents(studentsList);
    } catch (err) {
      console.error(err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewStudent = (student: any) => {
    onViewStudent({
      id: student.id,
      name: student.name,
      email: student.email,
      educationLevel: student.universityId ? "University" : "High School",
      university: student.universityId || "N/A",
      department: student.departmentId || "N/A",
      grade: student.gradeId ? `Grade ${student.gradeId}` : "N/A",
      joinedDate: new Date(student.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "Active",
      isAdmin: false,
    });
    onShowModal();
  };

  const handleDeleteStudent = async (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await userService.deleteUser(id);
        setStudents(students.filter((s) => s.id !== id));
      } catch (err) {
        alert("Failed to delete student");
        console.error(err);
      }
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const level = student.universityId ? "university" : "high_school";
    const matchesLevel = levelFilter === "all" || level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  if (loading) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-20">
            <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-purple-600 rounded-full mb-4"></div>
            <p className="text-slate-500 font-bold animate-pulse">
              Synchronizing student records...
            </p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-none shadow-2xl shadow-slate-200/50">
      <CardHeader className="bg-white dark:bg-slate-800/60 pb-0 border-none">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-inner flex-shrink-0">
              🎓
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Active Student Registry
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-medium">
                Monitoring {students.length} curious minds on SuccessBridge
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
            <div className="relative flex-1 min-w-[150px] md:min-w-[200px]">
              <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Find a student..."
                className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold focus:ring-2 md:focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-3 py-2 md:px-4 md:py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold outline-none focus:ring-2 md:focus:ring-4 focus:ring-purple-500/10 transition-all cursor-pointer"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="high_school">High School</option>
              <option value="university">University</option>
            </select>

            <button
              onClick={fetchStudents}
              className="p-2 md:p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5 rounded-xl md:rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
              title="Refresh Registry"
            >
              🔄
            </button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        {/* Mobile Card View */}
        <div className="md:hidden space-y-3 p-4">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-20">🕵️‍♂️</div>
              <p className="text-slate-500 text-lg font-black">
                No scholars found in this scope
              </p>
              <p className="text-slate-400 mt-2 font-medium text-sm">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                className="group relative overflow-hidden bg-gradient-to-br from-white to-purple-50/30 dark:from-slate-800/50 dark:to-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-900/30 p-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative space-y-3">
                  {/* Header with Avatar and Status */}
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-lg">
                        {student.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800 shadow-sm animate-pulse"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 dark:text-white text-base truncate">
                        {student.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">
                        {student.email}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-[10px] font-bold tracking-wide uppercase shadow-sm flex-shrink-0 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      Active
                    </span>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-3 border border-slate-100 dark:border-white/5">
                      <div
                        className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${student.universityId ? "text-blue-500" : "text-orange-500"}`}
                      >
                        {student.universityId
                          ? "🎓 University"
                          : "📚 High School"}
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm truncate">
                        {student.universityId || "General HS"}
                      </div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-3 border border-slate-100 dark:border-white/5">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                        Academic Area
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm truncate">
                        {student.departmentId ||
                          (student.gradeId
                            ? `Grade ${student.gradeId}`
                            : "N/A")}
                      </div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-3 border border-slate-100 dark:border-white/5 col-span-2">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                        📅 Joined Platform
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {new Date(student.createdAt).toLocaleDateString(
                          undefined,
                          { month: "long", day: "numeric", year: "numeric" },
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleViewStudent(student)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <span>👁️</span>
                      <span>View Profile</span>
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                      title="Delete Student"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-slate-800 dark:to-slate-800 border-y border-purple-100 dark:border-slate-700">
                <th className="px-6 py-4 text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  Student Identity
                </th>
                <th className="px-6 py-4 text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  Education Level
                </th>
                <th className="px-6 py-4 text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  Academic Area
                </th>
                <th className="px-6 py-4 text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-6xl mb-4 opacity-20">🕵️‍♂️</div>
                      <p className="text-slate-500 text-lg font-bold">
                        No scholars found in this scope
                      </p>
                      <p className="text-slate-400 mt-2 font-medium text-sm">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-indigo-50/30 dark:hover:from-purple-900/10 dark:hover:to-indigo-900/10 transition-all group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {student.name.charAt(0)}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800 shadow-sm"></div>
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {student.name}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold w-fit ${
                            student.universityId
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                          }`}
                        >
                          <span>{student.universityId ? "🎓" : "📚"}</span>
                          <span>
                            {student.universityId
                              ? "University"
                              : "High School"}
                          </span>
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {student.universityId || "General High School"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {student.departmentId ||
                          (student.gradeId
                            ? `Grade ${student.gradeId}`
                            : "N/A")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {new Date(student.createdAt).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-xs font-bold shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 invisible group-hover:visible transition-all">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all"
                        >
                          <span>👁️</span>
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all"
                        >
                          <span>🗑️</span>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};
