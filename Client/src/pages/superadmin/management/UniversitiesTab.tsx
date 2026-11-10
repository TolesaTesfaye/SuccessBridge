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
  Globe,
  Search,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface UniversitiesTabProps {
  toast: any;
}

export const UniversitiesTab: React.FC<UniversitiesTabProps> = ({ toast }) => {
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    email: "",
  });

  const loadUniversities = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await universityService.getUniversities();
      setUniversities(Array.isArray(response.data) ? response.data : []);
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
        uni.location.toLowerCase().includes(query) ||
        (uni.email && uni.email.toLowerCase().includes(query))
    );
  }, [universities, searchTerm]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      setSubmitting(true);
      const newUni = await universityService.createUniversity({
        name: formData.name,
        location: formData.location,
        email: formData.email || undefined,
      });
      setUniversities((prev) => [...prev, newUni]);
      setFormData({ name: "", location: "", email: "" });
      setShowAddForm(false);
      toast.success("University added successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to add university");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !formData.name || !formData.location) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      setSubmitting(true);
      const updated = await universityService.updateUniversity(editingId, {
        name: formData.name,
        location: formData.location,
        email: formData.email || undefined,
      });
      setUniversities((prev) =>
        prev.map((uni) => (uni.id === editingId ? updated : uni))
      );
      setFormData({ name: "", location: "", email: "" });
      setEditingId(null);
      toast.success("University updated successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update university");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete ${name}?`)) return;

    try {
      await universityService.deleteUniversity(id);
      setUniversities((prev) => prev.filter((uni) => uni.id !== id));
      toast.success("University deleted successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete university");
    }
  };

  const handleEdit = (uni: any) => {
    setFormData({
      name: uni.name,
      location: uni.location,
      email: uni.email || "",
    });
    setEditingId(uni.id);
  };

  const stats = useMemo(
    () => [
      {
        label: "Total Institutions",
        value: universities.length,
        icon: Building2,
        color: "blue",
      },
      {
        label: "Active Locations",
        value: new Set(universities.map((u) => u.location)).size,
        icon: MapPin,
        color: "emerald",
      },
      {
        label: "With Contact",
        value: universities.filter((u) => u.email).length,
        icon: Mail,
        color: "violet",
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow border border-slate-700/50"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <stat.icon size={18} />
              </div>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      {(showAddForm || editingId) && (
        <Card className="border-slate-200/80 shadow-sm dark:border-white/10 bg-white dark:bg-slate-900">
          <CardHeader className="border-b border-slate-100 dark:border-white/5">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {editingId ? "Edit University" : "Add New University"}
            </h3>
          </CardHeader>
          <CardBody>
            <form
              onSubmit={editingId ? handleUpdate : handleCreate}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  University Name *
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Addis Ababa University"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Location *
                </label>
                <input
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g. Addis Ababa, Ethiopia"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
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
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
                />
              </div>
              <div className="md:col-span-3 flex justify-end gap-3 pt-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                    setFormData({ name: "", location: "", email: "" });
                  }}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Saving..."
                    : editingId
                    ? "Update"
                    : "Add University"}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

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
              onClick={() => setShowAddForm(!showAddForm)}
              disabled={editingId !== null}
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
                placeholder="Search by name, location, or email..."
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
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredUniversities.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
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
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {uni.location}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {uni.email ? (
                          <a
                            href={`mailto:${uni.email}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          >
                            <Mail className="w-4 h-4" />
                            {uni.email}
                          </a>
                        ) : (
                          <span className="text-slate-400">N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(uni)}
                            disabled={editingId !== null && editingId !== uni.id}
                            className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded transition-colors disabled:opacity-50"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(uni.id, uni.name)}
                            disabled={editingId !== null}
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
    </div>
  );
};

export default UniversitiesTab;
