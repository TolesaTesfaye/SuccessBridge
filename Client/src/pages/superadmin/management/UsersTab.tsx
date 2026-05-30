import React, { useState, useEffect, useCallback } from "react";
import { adminService, User } from "@services/adminService";
import {
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  StyledCard,
  StyledBadge,
  StyledInput,
  StyledSelect,
  StyledBtn,
  StyledModal,
} from "./StyledComponents";

export const UsersTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editing, setEditing] = useState<User | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await adminService.getUsers({
        search: search || undefined,
        role: roleFilter || undefined,
        status: statusFilter || undefined,
        page,
        limit: 20,
      });
      setUsers(result.users);
      setTotal(result.total);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, statusFilter, page, toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateUser = async (data: Partial<User>) => {
    if (!editing) return;
    try {
      await adminService.updateUser(editing.id, data);
      toast.success("User updated");
      setEditing(null);
      fetchUsers();
    } catch {
      toast.error("Failed to update user");
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await adminService.deleteUser(id);
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const roleColors: Record<string, string> = {
    student: "bg-blue-100 text-blue-700",
    admin: "bg-purple-100 text-purple-700",
    super_admin: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <StyledCard>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <StyledInput
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-10"
              />
            </div>
          </div>
          <StyledSelect
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            options={[
              { value: "", label: "All Roles" },
              { value: "student", label: "Students" },
              { value: "admin", label: "Admins" },
              { value: "super_admin", label: "Super Admins" },
            ]}
          />
          <StyledSelect
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            options={[
              { value: "", label: "All Status" },
              { value: "approved", label: "Approved" },
              { value: "pending", label: "Pending" },
              { value: "rejected", label: "Rejected" },
            ]}
          />
        </div>
      </StyledCard>

      {/* Users Table */}
      <StyledCard>
        {loading ? (
          <div className="py-12 text-center">
            <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Email Verified
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Joined
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700/30">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/20"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StyledBadge
                          className={
                            roleColors[user.role] || "bg-gray-100 text-gray-600"
                          }
                        >
                          {user.role.replace("_", " ")}
                        </StyledBadge>
                      </td>
                      <td className="px-4 py-3">
                        <StyledBadge
                          className={
                            user.approvalStatus === "approved"
                              ? "bg-green-100 text-green-700"
                              : user.approvalStatus === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }
                        >
                          {user.approvalStatus || "Unknown"}
                        </StyledBadge>
                      </td>
                      <td className="px-4 py-3">
                        {user.isEmailVerified ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <XCircle size={16} className="text-gray-400" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <StyledBtn
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditing(user)}
                          >
                            <Edit size={14} />
                          </StyledBtn>
                          <StyledBtn
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash2 size={14} className="text-red-500" />
                          </StyledBtn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-slate-700/30">
              <p className="text-sm text-gray-500">
                Showing {users.length} of {total} users
              </p>
              <div className="flex gap-2">
                <StyledBtn
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </StyledBtn>
                <StyledBtn
                  size="sm"
                  disabled={page >= Math.ceil(total / 20)}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </StyledBtn>
              </div>
            </div>
          </>
        )}
      </StyledCard>

      {/* Edit Modal */}
      <StyledModal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        title="Edit User"
        size="lg"
      >
        {editing && (
          <div className="space-y-4">
            <StyledInput
              label="Name"
              defaultValue={editing.name}
              id="edit-name"
            />
            <StyledInput
              label="Email"
              defaultValue={editing.email}
              id="edit-email"
              type="email"
            />
            <StyledSelect
              label="Role"
              defaultValue={editing.role}
              id="edit-role"
              options={[
                { value: "student", label: "Student" },
                { value: "admin", label: "Admin" },
                { value: "super_admin", label: "Super Admin" },
              ]}
            />
            <StyledSelect
              label="Approval Status"
              defaultValue={editing.approvalStatus || "approved"}
              id="edit-status"
              options={[
                { value: "approved", label: "Approved" },
                { value: "pending", label: "Pending" },
                { value: "rejected", label: "Rejected" },
              ]}
            />
            <div className="flex justify-end gap-3 pt-4">
              <StyledBtn variant="secondary" onClick={() => setEditing(null)}>
                Cancel
              </StyledBtn>
              <StyledBtn
                variant="primary"
                onClick={() => {
                  const name = (
                    document.getElementById("edit-name") as HTMLInputElement
                  ).value;
                  const email = (
                    document.getElementById("edit-email") as HTMLInputElement
                  ).value;
                  const role = (
                    document.getElementById("edit-role") as HTMLSelectElement
                  ).value;
                  const approvalStatus = (
                    document.getElementById("edit-status") as HTMLSelectElement
                  ).value;
                  updateUser({ name, email, role, approvalStatus });
                }}
              >
                Save Changes
              </StyledBtn>
            </div>
          </div>
        )}
      </StyledModal>
    </div>
  );
};
