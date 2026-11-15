import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { Loading } from "@components/common/Loading";
import { universityService } from "@services/universityService";
import {
  School,
  MapPin,
  Mail,
  Plus,
  Trash2,
  Edit,
  Building2,
  Search,
  Users,
  Eye,
  X,
} from "lucide-react";

interface UniversitiesTabProps {
  toast: any;
}

export const UniversitiesTab: React.FC<UniversitiesTabProps> = ({ toast }) => {
  const [universities, setUniversities] = useState<any[]>([]);
  const [studentCounts, setStudentCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [viewingUni, setViewingUni] = useState<any | null>(null);
  const [viewingStudents, setViewingStudents] = useState<any[]>([]);
  const [viewingLoading, setViewingLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const loadUniversities = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch universities and per-university student counts in parallel —
      // counts are supplementary, so a failure there must not fail the tab.
      const [response, counts] = await Promise.all([
        universityService.getUniversities(),
        universityService.getStudentCounts(),
      ]);
      setUniversities(Array.isArray(response.data) ? response.data : []);
      setStudentCounts(counts);
    } catch (err: any) {
      setError(err?.message || "Failed to load universities.");
      toast.error("Failed to load universities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUniversities();
  }, []);

  const filteredUniversities = useMemo(() => {
    if (!searchTerm) return universities;
    const query = searchTerm.toLowerCase();
    return universities.filter(
      (uni) =>
        uni.name.toLowerCase().includes(query) ||
        (uni.email && uni.email.toLowerCase().includes(query))
    );
  }, [universities, searchTerm]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter the university name");
      return;
    }

    try {
      setSubmitting(true);
      await universityService.createUniversity({
        name: formData.name.trim(),
        email: formData.email || undefined,
      });
      await loadUniversities();
      closeForm();
      toast.success("University added successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to add university");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !formData.name.trim()) {
      toast.error("Please enter the university name");
      return;
    }

    try {
      setSubmitting(true);
      await universityService.updateUniversity(editingId, {
        name: formData.name.trim(),
        email: formData.email || undefined,
      });
      await loadUniversities();
      closeForm();
      toast.success("University updated successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update university");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const count = studentCounts[id] || 0;
    const warning =
      count > 0
        ? `\n\n${count} student${count === 1 ? "" : "s"} who selected it will be unlinked.`
        : "";
    if (!window.confirm(`Delete ${name}?${warning}`)) return;

    try {
      await universityService.deleteUniversity(id);
      await loadUniversities();
      toast.success("University deleted successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete university");
    }
  };

  const openAddModal = () => {
    setFormMode("add");
    setEditingId(null);
    setFormData({ name: "", email: "" });
    setFormOpen(true);
  };

  const openEditModal = (uni: any) => {
    setFormMode("edit");
    setEditingId(uni.id);
    setFormData({ name: uni.name, email: uni.email || "" });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setFormData({ name: "", email: "" });
  };

  const handleViewStudents = async (uni: any) => {
    setViewingUni(uni);
    setViewingStudents([]);
    setViewingLoading(true);
    try {
      const students = await universityService.getUniversityStudents(uni.id);
      setViewingStudents(students);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load students");
    } finally {
      setViewingLoading(false);
    }
  };

  const stats = useMemo(
    () => [
      {
        label: "Total Institutions",
        value: universities.length,
        description: "Registered universities",
        icon: Building2,
        accent: "from-blue-500 to-blue-600",
      },
      {
        label: "Active Locations",
        value: new Set(universities.map((u) => u.location)).size,
        description: "Cities covered",
        icon: MapPin,
        accent: "from-emerald-500 to-emerald-600",
      },
      {
        label: "With Contact",
        value: universities.filter((u) => u.email).length,
        description: "Have contact email",
        icon: Mail,
        accent: "from-purple-500 to-purple-600",
      },
    ],
    [universities]
  );

  if (loading) {
    return <Loading message="Loading universities..." />;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 text-white shadow-lg hover:shadow-xl transition-shadow border border-slate-700/50"
          >
            <div className="flex items-start justify-between mb-2">
              <div
                className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.accent} flex items-center justify-center`}
              >
                <stat.icon size={18} />
              </div>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-bold mb-0.5">{stat.value}</p>
            <p className="text-xs text-slate-400">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Universities Table */}
      <Card className="border-slate-200/80 shadow-sm dark:border-white/10">
        <CardHeader className="border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-slate-500" />
              <span className="font-bold text-slate-900 dark:text-white">
                Universities
              </span>
              <span className="ml-auto text-sm text-slate-500">
                {filteredUniversities.length} of {universities.length}
              </span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={openAddModal}
              disabled={formOpen}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-4 text-sm text-red-700 dark:text-red-200 mb-4">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 dark:border-white/10 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      Students
                    </span>
                  </th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredUniversities.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-8 px-4 text-center text-slate-500 dark:text-slate-400"
                    >
                      No universities found
                    </td>
                  </tr>
                ) : (
                  filteredUniversities.map((uni) => (
                    <tr
                      key={uni.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        {uni.name}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            (studentCounts[uni.id] || 0) > 0
                              ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                          }`}
                          title="Students who selected this university"
                        >
                          <Users className="w-3.5 h-3.5" />
                          {studentCounts[uni.id] || 0}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewStudents(uni)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors"
                            title="View students"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(uni)}
                            disabled={formOpen}
                            className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded transition-colors disabled:opacity-50"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(uni.id, uni.name)}
                            disabled={formOpen}
                            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* View Students Modal */}
      {viewingUni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setViewingUni(null)}
          />
          <div className="relative w-full max-w-lg max-h-[80vh] flex flex-col rounded-xl bg-slate-900 border border-slate-700/60 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-700/60">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white truncate">
                    {viewingUni.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {viewingLoading
                      ? "Loading…"
                      : `${viewingStudents.length} student${
                          viewingStudents.length === 1 ? "" : "s"
                        } selected this university`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingUni(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors shrink-0"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto p-2">
              {viewingLoading ? (
                <Loading message="Loading students..." />
              ) : viewingStudents.length === 0 ? (
                <div className="py-10 text-center text-sm text-slate-400">
                  No students have selected this university yet
                </div>
              ) : (
                viewingStudents.map((s: any) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {(s.name || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">
                        {s.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {s.email}
                      </p>
                    </div>
                    {s.department && (
                      <span className="hidden sm:block text-[11px] text-slate-400 truncate max-w-[120px]">
                        {s.department}
                      </span>
                    )}
                    <span className="shrink-0 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400">
                      {s.studentType === "high_school"
                        ? `Grade ${(s.highSchoolGrade || "").replace("grade_", "")}`
                        : s.universityLevel
                        ? s.universityLevel.charAt(0).toUpperCase() +
                          s.universityLevel.slice(1)
                        : "Student"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit University Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeForm}
          />
          <div className="relative w-full max-w-md rounded-xl bg-slate-900 border border-slate-700/60 shadow-2xl">
            <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-700/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
                  {formMode === "edit" ? (
                    <Edit className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-white" />
                  )}
                </div>
                <h3 className="font-bold text-white">
                  {formMode === "edit"
                    ? "Edit University"
                    : "Add New University"}
                </h3>
              </div>
              <button
                onClick={closeForm}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors shrink-0"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={formMode === "edit" ? handleUpdate : handleCreate}
              className="p-4 space-y-4"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  University Name *
                </label>
                <input
                  required
                  autoFocus
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Addis Ababa University"
                  className="w-full px-3 py-2 rounded-lg border border-slate-600/60 bg-slate-800 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="contact@university.edu"
                  className="w-full px-3 py-2 rounded-lg border border-slate-600/60 bg-slate-800 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-1">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={closeForm}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={submitting}>
                  {submitting
                    ? "Saving..."
                    : formMode === "edit"
                    ? "Update"
                    : "Add University"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversitiesTab;
