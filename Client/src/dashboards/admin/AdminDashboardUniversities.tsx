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
  Edit,
  Sparkles,
  Building2,
  Globe,
  Search,
  ExternalLink,
  ShieldCheck,
  Building,
} from "lucide-react";
import {
  DashboardHeroSkeleton,
  DashboardGridSkeleton,
} from "@components/dashboards/DashboardSkeleton";

export const AdminDashboardUniversities: React.FC = () => {
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUniversities();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim()) return;

    setSubmitting(true);
    try {
      await universityService.createUniversity(formData);
      setFormData({ name: "", location: "", email: "" });
      setShowAddForm(false);
      loadUniversities();
    } catch (err: any) {
      alert(err?.message || "Failed to create university.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUniversities = useMemo(() => {
    return universities.filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.location.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [universities, searchTerm]);

  const stats = useMemo(
    () => [
      {
        label: "Total Institutions",
        value: universities.length,
        icon: School,
        color: "blue",
      },
      {
        label: "Active Locations",
        value: new Set(universities.map((u) => u.location)).size,
        icon: MapPin,
        color: "emerald",
      },
      {
        label: "Partner Status",
        value: "Verified",
        icon: ShieldCheck,
        color: "indigo",
      },
      {
        label: "Global Presence",
        value: "National",
        icon: Globe,
        color: "violet",
      },
    ],
    [universities],
  );

  if (loading && universities.length === 0) {
    return (
      <div className="space-y-6">
        <DashboardHeroSkeleton />
        <DashboardGridSkeleton items={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {showAddForm && (
        <Card className="border-none shadow-2xl bg-white dark:bg-[#1a1b23] animate-in zoom-in-95 duration-300">
          <CardHeader className="border-b border-slate-100 dark:border-white/5 p-6">
            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
              <Plus className="w-5 h-5 text-sky-500" />
              Register New University
            </h3>
          </CardHeader>
          <CardBody className="p-8">
            <form
              onSubmit={handleCreate}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Official Name
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Addis Ababa University"
                  className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50 dark:bg-white/5 dark:border-white/10 text-sm font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Main Campus Location
                </label>
                <input
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g. Addis Ababa, Ethiopia"
                  className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50 dark:bg-white/5 dark:border-white/10 text-sm font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Contact Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="contact@university.edu.et"
                  className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50 dark:bg-white/5 dark:border-white/10 text-sm font-bold"
                />
              </div>
              <div className="md:col-span-3 flex justify-end gap-3 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddForm(false)}
                  className="rounded-xl px-8 h-12"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  loading={submitting}
                  className="rounded-xl px-12 h-12 bg-sky-600 hover:bg-sky-500"
                >
                  Register Institution
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUniversities.map((uni) => (
          <Card
            key={uni.id}
            className="border-none shadow-xl bg-white dark:bg-[#1a1b23] group hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            <CardBody className="p-0">
              <div className="h-24 bg-[#1e293b] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-indigo-500/20" />
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <School className="w-32 h-32 text-white" />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6 relative">
                <div className="absolute -top-10 left-6">
                  <div className="w-20 h-20 rounded-[2rem] bg-white dark:bg-[#1a1b23] shadow-2xl flex items-center justify-center border-4 border-white dark:border-[#1a1b23]">
                    <Building className="w-10 h-10 text-sky-500" />
                  </div>
                </div>
                <div className="mt-10">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-sky-500 transition-colors">
                    {uni.name}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-tight">
                        {uni.location}
                      </span>
                    </div>
                    {uni.email && (
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold lowercase truncate">
                          {uni.email}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1a1b23] bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black overflow-hidden"
                        >
                          <img
                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                            alt="Admin"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1a1b23] bg-sky-500 flex items-center justify-center text-[8px] font-black text-white">
                        +12
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-100 h-9"
                    >
                      View Profile
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}

        {!loading && filteredUniversities.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-5xl mb-6">
              🏛️
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              No Institutions Identified
            </h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
              Refine your search parameters or register a new university to
              begin institutional management.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
