import React, { useState, useEffect, useCallback } from "react";
import { adminService, Permission } from "@services/adminService";
import { ShieldCheck, Loader2 } from "lucide-react";
import { StyledCard, StyledSelect } from "./StyledComponents";

export const PermissionsTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<
    Record<string, string[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("student");

  const fetch = useCallback(async () => {
    try {
      const result = await adminService.getPermissions();
      setPermissions(result.permissions);
      setRolePermissions(result.rolePermissions);
    } catch {
      toast.error("Failed to load permissions");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const togglePermission = async (permId: string) => {
    const current = rolePermissions[selectedRole] || [];
    const updated = current.includes(permId)
      ? current.filter((p) => p !== permId)
      : [...current, permId];
    try {
      await adminService.updateRolePermissions(selectedRole, updated);
      setRolePermissions({ ...rolePermissions, [selectedRole]: updated });
      toast.success("Updated");
    } catch {
      toast.error("Failed");
    }
  };

  if (loading)
    return (
      <div className="py-12 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
      </div>
    );

  const grouped = permissions.reduce(
    (acc, p) => {
      if (!acc[p.category]) acc[p.category] = [];
      acc[p.category].push(p);
      return acc;
    },
    {} as Record<string, Permission[]>,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Role Permissions
        </h3>
        <StyledSelect
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          options={[
            { value: "student", label: "Student" },
            { value: "admin", label: "Admin" },
            { value: "super_admin", label: "Super Admin" },
          ]}
        />
      </div>
      <div className="space-y-4">
        {Object.entries(grouped).map(([category, perms]) => (
          <StyledCard
            key={category}
            title={category.replace(/_/g, " ")}
            icon={<ShieldCheck size={18} />}
          >
            <div className="space-y-2">
              {perms.map((perm) => {
                const has = (rolePermissions[selectedRole] || []).includes(
                  perm.id,
                );
                return (
                  <div
                    key={perm.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/20"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {perm.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {perm.description}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePermission(perm.id)}
                      className={`w-12 h-6 rounded-full transition-colors ${has ? "bg-green-500" : "bg-gray-300 dark:bg-slate-600"}`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${has ? "translate-x-6" : "translate-x-0.5"}`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </StyledCard>
        ))}
      </div>
    </div>
  );
};
