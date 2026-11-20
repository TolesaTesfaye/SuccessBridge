import React, { useState, useEffect, useCallback } from "react";
import { adminService, Announcement } from "@services/adminService";
import { Plus, Megaphone, Loader2 } from "lucide-react";
import { AnnouncementCard, LEVEL_OPTIONS } from "@components/communication/AnnouncementCard";
import {
  StyledInput,
  StyledSelect,
  StyledBtn,
  StyledModal,
} from "./StyledComponents";

export const AnnouncementsTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [list, setList] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "info",
    targetRoles: [] as string[],
    targetEducationLevels: [] as string[],
    targetPaymentStatus: "" as "" | "paid" | "unpaid",
  });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await adminService.getAnnouncements({ limit: 50 });
      setList(result.announcements);
    } catch {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const create = async () => {
    if (!form.title || !form.content) {
      toast.error("Title and content required");
      return;
    }
    try {
      const { managementService } = await import("@services/managementService");
      await managementService.createAnnouncement({
        ...form,
        targetPaymentStatus: form.targetPaymentStatus || null,
      });
      toast.success("Created");
      setShowCreate(false);
      fetch();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Platform Announcements
        </h3>
        <StyledBtn variant="primary" onClick={() => setShowCreate(true)}>
          <Plus size={16} className="mr-1" /> New
        </StyledBtn>
      </div>
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
        </div>
      ) : list.length === 0 ? (
        <div className="bg-white dark:bg-slate-800/60 rounded-xl border p-12 text-center text-gray-400">
          <Megaphone size={48} className="mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">No announcements</p>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} />
          ))}
        </div>
      )}
      <StyledModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create Announcement"
      >
        <div className="space-y-4">
          <StyledInput
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Announcement title"
          />
          <StyledSelect
            label="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            options={[
              { value: "info", label: "Info" },
              { value: "warning", label: "Warning" },
              { value: "success", label: "Success" },
              { value: "update", label: "Update" },
            ]}
          />
          <StyledSelect
            label="Student payment status"
            value={form.targetPaymentStatus}
            onChange={(e) =>
              setForm({
                ...form,
                targetPaymentStatus: e.target.value as "" | "paid" | "unpaid",
              })
            }
            options={[
              { value: "", label: "Everyone" },
              { value: "paid", label: "Paid students" },
              { value: "unpaid", label: "Unpaid students" },
            ]}
          />
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-slate-300">
              Grade / level (optional)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {LEVEL_OPTIONS.map((option) => {
                const selected = form.targetEducationLevels.includes(
                  option.value,
                );
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        targetEducationLevels: selected
                          ? form.targetEducationLevels.filter(
                              (value) => value !== option.value,
                            )
                          : [...form.targetEducationLevels, option.value],
                      })
                    }
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                      selected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-slate-300">
              Content
            </label>
            <textarea
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
              rows={5}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Announcement content..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <StyledBtn variant="secondary" onClick={() => setShowCreate(false)}>
              Cancel
            </StyledBtn>
            <StyledBtn variant="primary" onClick={create}>
              Create
            </StyledBtn>
          </div>
        </div>
      </StyledModal>
    </div>
  );
};
