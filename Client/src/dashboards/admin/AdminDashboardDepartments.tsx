import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { Loading } from "@components/common/Loading";
import { departmentService } from "@services/departmentService";
import { universityService } from "@services/universityService";
import {
  Building2,
  Building,
  School,
  Plus,
  Trash2,
  Edit,
  Sparkles,
  Filter,
  CheckCircle2,
  GraduationCap,
  Layers,
  ChevronRight,
  Search,
  BookOpen,
} from "lucide-react";
import {
  DashboardHeroSkeleton,
  DashboardListSkeleton,
} from "@components/dashboards/DashboardSkeleton";

export const AdminDashboardDepartments: React.FC = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    universityId: "",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [deptsRes, unisRes] = await Promise.all([
        departmentService.getAll(),
        universityService.getUniversities(),
      ]);
      setDepartments(Array.isArray(deptsRes) ? deptsRes : []);
      setUniversities(Array.isArray(unisRes.data) ? unisRes.data : []);
    } catch (err) {
      console.error("Failed to load departments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.universityId) return;

    setSubmitting(true);
    try {
      await departmentService.create(formData);
      setFormData({ name: "", universityId: "" });
      setShowAddForm(false);
      loadData();
    } catch (err) {
      alert("Failed to create department.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this department?")) return;
    try {
      await departmentService.delete(id);
      loadData();
    } catch (err) {
      alert("Failed to delete department.");
    }
  };

  const filteredDepartments = useMemo(() => {
    return departments.filter((d) => {
      const matchesSearch = d.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesUni =
        selectedUniversity === "all" || d.universityId === selectedUniversity;
      return matchesSearch && matchesUni;
    });
  }, [departments, searchTerm, selectedUniversity]);

  const universityMap = useMemo(() => {
    const map: Record<string, string> = {};
    universities.forEach((u) => (map[u.id] = u.name));
    return map;
  }, [universities]);

  const stats = useMemo(
    () => [
      {
        label: "Total Departments",
        value: departments.length,
        icon: Building2,
        accent: "from-violet-500 to-purple-500",
      },
      {
        label: "Partner Institutions",
        value: universities.length,
        icon: School,
        accent: "from-blue-500 to-cyan-500",
      },
      {
        label: "Avg. Depts / Uni",
        value:
          universities.length > 0
            ? (departments.length / universities.length).toFixed(1)
            : 0,
        icon: Layers,
        accent: "from-emerald-500 to-teal-500",
      },
      {
        label: "Academic Fields",
        value: "Multi-disciplinary",
        icon: BookOpen,
        accent: "from-rose-500 to-pink-500",
      },
    ],
    [departments, universities],
  );

  if (loading && departments.length === 0) {
    return (
      <div className="space-y-6">
        <DashboardHeroSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="h-[400px] rounded-3xl bg-slate-100 dark:bg-white/5 animate-pulse" />
          </div>
          <div className="lg:col-span-3">
            <DashboardListSkeleton rows={8} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden border border-slate-200 bg-[#0c0a09] px-8 py-10 text-white shadow-2xl dark:border-white/5 -mx-4 md:-mx-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.2),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.15),transparent_35%)]" />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-violet-300 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Departmental Command
            </div>
            <h2 className="text-4xl font-black tracking-tight leading-tight sm:text-5xl">
              Academic Infrastructure Control.
            </h2>
            <p className="text-lg font-medium text-slate-300/80 leading-relaxed max-w-xl">
              Manage the granular organizational structure of your platform.
              Create departments, assign them to universities, and monitor
              curriculum coverage.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                variant="primary"
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-violet-600 hover:bg-violet-500 border-none shadow-[0_10px_20px_rgba(139,92,246,0.3)] h-12 px-8 rounded-2xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Department
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  window.scrollTo({
                    top:
                      document.getElementById("dept-registry")?.offsetTop || 0,
                    behavior: "smooth",
                  })
                }
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 h-12 px-8 rounded-2xl backdrop-blur-md"
              >
                Explore Registry
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md group hover:bg-white/10 transition-all"
              >
                <div
                  className={`p-3 rounded-2xl bg-gradient-to-br ${stat.accent} text-white mb-4 inline-flex group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black tracking-tighter mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-violet-300/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddForm && (
        <Card className="border-none shadow-2xl bg-white dark:bg-[#1a1b23] animate-in zoom-in-95 duration-300">
          <CardHeader className="border-b border-slate-100 dark:border-white/5 p-6">
            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-violet-500" />
              Configure New Department
            </h3>
          </CardHeader>
          <CardBody className="p-8">
            <form
              onSubmit={handleCreate}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Department Title
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Computer Science & Engineering"
                  className="w-full h-14 px-5 rounded-2xl border border-slate-100 bg-slate-50 dark:bg-white/5 dark:border-white/10 text-sm font-bold focus:border-violet-500 focus:ring-0 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Affiliated University
                </label>
                <select
                  required
                  value={formData.universityId}
                  onChange={(e) =>
                    setFormData({ ...formData, universityId: e.target.value })
                  }
                  className="w-full h-14 px-5 rounded-2xl border border-slate-100 bg-slate-50 dark:bg-white/5 dark:border-white/10 text-sm font-bold focus:border-violet-500 focus:ring-0 transition-all"
                >
                  <option value="">Select Target Institution</option>
                  {universities.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddForm(false)}
                  className="rounded-2xl px-8 h-14"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  loading={submitting}
                  className="rounded-2xl px-12 h-14 bg-violet-600 hover:bg-violet-500 shadow-xl shadow-violet-500/20"
                >
                  Initialize Department
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Control Panel */}
      <div id="dept-registry" className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-xl bg-white dark:bg-[#1a1b23] h-fit">
          <CardHeader className="border-b border-slate-100 dark:border-white/5 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-500/10">
                <Filter className="h-5 w-5 text-violet-500" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Refine View
              </h3>
            </div>
          </CardHeader>
          <CardBody className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Search Registry
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Department name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-xs font-bold"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Institutional Filter
              </label>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 [scrollbar-width:thin]">
                <button
                  onClick={() => setSelectedUniversity("all")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${selectedUniversity === "all" ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20" : "bg-slate-50 dark:bg-white/5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"}`}
                >
                  Global View
                </button>
                {universities.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUniversity(u.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${selectedUniversity === u.id ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20" : "bg-slate-50 dark:bg-white/5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"}`}
                  >
                    {u.name}
                  </button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card className="border-none shadow-xl bg-white dark:bg-[#1a1b23] overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-white/5 p-6 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10">
                  <Building2 className="h-5 w-5 text-emerald-500" />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Departmental Registry
                </h3>
              </div>
              <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg uppercase tracking-widest">
                {filteredDepartments.length} Departments Active
              </span>
            </CardHeader>
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-separate border-spacing-0">
                  <thead className="bg-slate-50/50 dark:bg-white/[0.02] text-[10px] uppercase font-black tracking-widest text-slate-400 border-b border-slate-100 dark:border-white/5">
                    <tr>
                      <th className="px-6 py-4">Department Identity</th>
                      <th className="px-6 py-4">Institutional Affiliation</th>
                      <th className="px-6 py-4">Infrastructure Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {filteredDepartments.map((dept) => (
                      <tr
                        key={dept.id}
                        className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform">
                              <GraduationCap className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-violet-600 transition-colors">
                                {dept.name}
                              </div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                ID: {dept.id.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10">
                              <School className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate max-w-[200px]">
                              {universityMap[dept.universityId] ||
                                "Independent"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                              Active Node
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all dark:bg-white/5 dark:border-white/10">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(dept.id)}
                              className="p-2 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all dark:bg-white/5 dark:border-white/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredDepartments.length === 0 && !loading && (
                  <div className="p-16 text-center">
                    <div className="mx-auto w-20 h-20 rounded-3xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-4xl mb-6">
                      📂
                    </div>
                    <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      Registry Search Complete
                    </h4>
                    <p className="text-xs text-slate-500 mt-2">
                      No departments matching your intelligence criteria were
                      found in the current cluster.
                    </p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
