import React, { useMemo, useState } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { subjectService } from "@services/subjectService";
import { departmentService } from "@services/departmentService";
import { universityService } from "@services/universityService";
import { resourceService } from "@services/resourceService";
import { quizService } from "@services/quizService";
import {
  AlertTriangle,
  BarChart3,
  BookOpenCheck,
  Building2,
  GraduationCap,
  PlusCircle,
  RefreshCcw,
  School,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type TabKey =
  | "overview"
  | "subjects"
  | "departments"
  | "universities"
  | "reports";

type DashboardState = {
  loading: boolean;
  error: string | null;
  subjects: any[];
  departments: any[];
  universities: any[];
  quizzes: any[];
  resourceStats: any | null;
};

const initialState: DashboardState = {
  loading: true,
  error: null,
  subjects: [],
  departments: [],
  universities: [],
  quizzes: [],
  resourceStats: null,
};

const parseArrayData = (value: any): any[] => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.data?.data)) return value.data.data;
  if (Array.isArray(value?.subjects)) return value.subjects;
  if (Array.isArray(value?.departments)) return value.departments;
  if (Array.isArray(value?.universities)) return value.universities;
  return [];
};

const parseError = (err: any): string => {
  const status = err?.response?.status;
  if (status === 403)
    return "You do not have permission to perform this action.";
  if (status === 401) return "Please login again to continue.";
  return (
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Request failed."
  );
};

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [state, setState] = useState<DashboardState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [subjectForm, setSubjectForm] = useState({
    name: "",
    code: "",
    departmentId: "",
    gradeId: "",
    streamId: "",
  });

  const [departmentForm, setDepartmentForm] = useState({
    name: "",
    universityId: "",
  });

  const [universityForm, setUniversityForm] = useState({
    name: "",
    location: "",
    email: "",
  });

  const fetchDashboardData = React.useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    const results = await Promise.allSettled([
      subjectService.getAll(),
      departmentService.getAll(),
      universityService.getUniversities(),
      quizService.getAll({ limit: 200 }),
      resourceService.getResourceStats(),
    ]);

    const [
      subjectsRes,
      departmentsRes,
      universitiesRes,
      quizzesRes,
      resourceStatsRes,
    ] = results;

    const subjects =
      subjectsRes.status === "fulfilled"
        ? parseArrayData(subjectsRes.value)
        : [];
    const departments =
      departmentsRes.status === "fulfilled"
        ? parseArrayData(departmentsRes.value)
        : [];
    const universities =
      universitiesRes.status === "fulfilled"
        ? parseArrayData(universitiesRes.value?.data || universitiesRes.value)
        : [];
    const quizzes =
      quizzesRes.status === "fulfilled" ? parseArrayData(quizzesRes.value) : [];
    const resourceStats =
      resourceStatsRes.status === "fulfilled"
        ? resourceStatsRes.value?.data || {}
        : null;

    const hardFailures = [
      subjectsRes,
      departmentsRes,
      universitiesRes,
      quizzesRes,
      resourceStatsRes,
    ].filter((result) => result.status === "rejected").length;

    setState({
      loading: false,
      error:
        hardFailures >= 3
          ? "Some dashboard sources are unavailable right now."
          : null,
      subjects,
      departments,
      universities,
      quizzes,
      resourceStats,
    });
  }, []);

  React.useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const overviewStats = useMemo(
    () => [
      {
        label: "Subjects",
        value: state.subjects.length,
        icon: BookOpenCheck,
        color: "text-emerald-600",
      },
      {
        label: "Departments",
        value: state.departments.length,
        icon: Building2,
        color: "text-violet-600",
      },
      {
        label: "Universities",
        value: state.universities.length,
        icon: School,
        color: "text-amber-600",
      },
      {
        label: "Quizzes",
        value: state.quizzes.length,
        icon: GraduationCap,
        color: "text-pink-600",
      },
      {
        label: "Resources",
        value: Number(
          state.resourceStats?.totalResources ||
            state.resourceStats?.total ||
            0,
        ),
        icon: BarChart3,
        color: "text-cyan-600",
      },
    ],
    [state],
  );

  const tabButton = (id: TabKey, label: string) => (
    <button
      key={id}
      className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${
        activeTab === id
          ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
          : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
      }`}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </button>
  );

  const resetAlerts = () => {
    setActionMessage(null);
    setActionError(null);
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectForm.name.trim() || !subjectForm.code.trim()) return;
    resetAlerts();
    setSubmitting(true);
    try {
      await subjectService.create({
        name: subjectForm.name.trim(),
        code: subjectForm.code.trim(),
        departmentId: subjectForm.departmentId || undefined,
        gradeId: subjectForm.gradeId || undefined,
        streamId: subjectForm.streamId || undefined,
      });
      setSubjectForm({
        name: "",
        code: "",
        departmentId: "",
        gradeId: "",
        streamId: "",
      });
      setActionMessage("Subject created successfully.");
      await fetchDashboardData();
    } catch (err: any) {
      setActionError(parseError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentForm.name.trim() || !departmentForm.universityId.trim())
      return;
    resetAlerts();
    setSubmitting(true);
    try {
      await departmentService.create({
        name: departmentForm.name.trim(),
        universityId: departmentForm.universityId.trim(),
      });
      setDepartmentForm({ name: "", universityId: "" });
      setActionMessage("Department created successfully.");
      await fetchDashboardData();
    } catch (err: any) {
      setActionError(parseError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateUniversity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!universityForm.name.trim() || !universityForm.location.trim()) return;
    resetAlerts();
    setSubmitting(true);
    try {
      await universityService.createUniversity({
        name: universityForm.name.trim(),
        location: universityForm.location.trim(),
        email: universityForm.email.trim() || undefined,
      });
      setUniversityForm({ name: "", location: "", email: "" });
      setActionMessage("University created successfully.");
      await fetchDashboardData();
    } catch (err: any) {
      setActionError(parseError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Manage structures with live database data"
    >
      <div className="space-y-6">
        <div className="border-b-2 border-gray-200 dark:border-slate-700 flex gap-0 overflow-x-auto -mx-6 px-6">
          {tabButton("overview", "Overview")}
          {tabButton("subjects", "Subjects")}
          {tabButton("departments", "Departments")}
          {tabButton("universities", "Universities")}
          {tabButton("reports", "Reports")}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {state.loading
              ? "Refreshing data..."
              : "Synced with latest database records"}
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchDashboardData}
            loading={state.loading}
            icon={<RefreshCcw className="w-4 h-4" />}
          >
            Refresh
          </Button>
        </div>

        {state.error && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> {state.error}
          </div>
        )}
        {actionMessage && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 text-sm">
            {actionMessage}
          </div>
        )}
        {actionError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
            {actionError}
          </div>
        )}

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {overviewStats.map((item) => (
              <Card key={item.label}>
                <CardBody className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        {item.label}
                      </p>
                      <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">
                        {item.value}
                      </p>
                    </div>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "subjects" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card>
              <CardHeader>Add Subject</CardHeader>
              <CardBody>
                <form className="space-y-3" onSubmit={handleCreateSubject}>
                  <input
                    value={subjectForm.name}
                    onChange={(e) =>
                      setSubjectForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Subject name"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white dark:bg-slate-900"
                    required
                  />
                  <input
                    value={subjectForm.code}
                    onChange={(e) =>
                      setSubjectForm((prev) => ({
                        ...prev,
                        code: e.target.value,
                      }))
                    }
                    placeholder="Subject code"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white dark:bg-slate-900"
                    required
                  />
                  <input
                    value={subjectForm.departmentId}
                    onChange={(e) =>
                      setSubjectForm((prev) => ({
                        ...prev,
                        departmentId: e.target.value,
                      }))
                    }
                    placeholder="Department ID (optional)"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white dark:bg-slate-900"
                  />
                  <input
                    value={subjectForm.gradeId}
                    onChange={(e) =>
                      setSubjectForm((prev) => ({
                        ...prev,
                        gradeId: e.target.value,
                      }))
                    }
                    placeholder="Grade ID (optional)"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white dark:bg-slate-900"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    loading={submitting}
                    icon={<PlusCircle className="w-4 h-4" />}
                  >
                    Create Subject
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === "departments" && (
          <div className="max-w-xl">
            <Card>
              <CardHeader>Add Department</CardHeader>
              <CardBody>
                <form className="space-y-3" onSubmit={handleCreateDepartment}>
                  <input
                    value={departmentForm.name}
                    onChange={(e) =>
                      setDepartmentForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Department name"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white dark:bg-slate-900"
                    required
                  />
                  <select
                    value={departmentForm.universityId}
                    onChange={(e) =>
                      setDepartmentForm((prev) => ({
                        ...prev,
                        universityId: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white dark:bg-slate-900"
                    required
                  >
                    <option value="">Select university</option>
                    {state.universities.map((university: any) => (
                      <option key={university.id} value={university.id}>
                        {university.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    loading={submitting}
                    icon={<PlusCircle className="w-4 h-4" />}
                  >
                    Create Department
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === "universities" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card>
              <CardHeader>Add University</CardHeader>
              <CardBody>
                <form className="space-y-3" onSubmit={handleCreateUniversity}>
                  <input
                    value={universityForm.name}
                    onChange={(e) =>
                      setUniversityForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="University name"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white dark:bg-slate-900"
                    required
                  />
                  <input
                    value={universityForm.location}
                    onChange={(e) =>
                      setUniversityForm((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="Location"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white dark:bg-slate-900"
                    required
                  />
                  <input
                    value={universityForm.email}
                    onChange={(e) =>
                      setUniversityForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="Email (optional)"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white dark:bg-slate-900"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    loading={submitting}
                    icon={<PlusCircle className="w-4 h-4" />}
                  >
                    Create University
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>Academic Coverage Report</CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Subjects</span>
                    <span className="font-black text-slate-900 dark:text-white">
                      {state.subjects.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Departments</span>
                    <span className="font-black text-slate-900 dark:text-white">
                      {state.departments.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Universities</span>
                    <span className="font-black text-slate-900 dark:text-white">
                      {state.universities.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Quizzes</span>
                    <span className="font-black text-slate-900 dark:text-white">
                      {state.quizzes.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Resources</span>
                    <span className="font-black text-slate-900 dark:text-white">
                      {Number(
                        state.resourceStats?.totalResources ||
                          state.resourceStats?.total ||
                          0,
                      )}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>Structure Summary</CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-4">
                    <p className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-300">
                      Avg Subjects / Department
                    </p>
                    <p className="text-2xl font-black text-blue-700 dark:text-blue-200">
                      {state.departments.length > 0
                        ? (
                            state.subjects.length / state.departments.length
                          ).toFixed(1)
                        : "0.0"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-4">
                    <p className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-300">
                      Avg Departments / University
                    </p>
                    <p className="text-2xl font-black text-emerald-700 dark:text-emerald-200">
                      {state.universities.length > 0
                        ? (
                            state.departments.length / state.universities.length
                          ).toFixed(1)
                        : "0.0"}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
