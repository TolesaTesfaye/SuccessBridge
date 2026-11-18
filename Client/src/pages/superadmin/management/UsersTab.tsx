import React, { useState, useEffect, useCallback } from "react";
import { adminService, User } from "@services/adminService";
import {
  Search,
  Edit,
  Trash2,
  Eye,
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
  const [viewing, setViewing] = useState<User | null>(null);

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

  const getLevel = (user: User): string | null => {
    if (user.studentType === "university") {
      return user.universityLevel
        ? user.universityLevel.replace("_", " ")
        : null;
    }
    if (user.studentType === "high_school") {
      return user.highSchoolGrade
        ? user.highSchoolGrade.replace("grade_", "Grade ")
        : null;
    }
    return null;
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
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Level
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Role
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
                        {user.role === "student" ? (
                          <StyledBadge
                            className={
                              user.studentType === "university"
                                ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                                : user.studentType === "high_school"
                                  ? "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"
                                  : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300"
                            }
                          >
                            {user.studentType === "university"
                              ? "🎓 University"
                              : user.studentType === "high_school"
                                ? "🏫 High School"
                                : "—"}
                          </StyledBadge>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                          {user.role === "student"
                            ? getLevel(user) || "N/A"
                            : "—"}
                        </span>
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
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <StyledBtn
                            size="sm"
                            variant="ghost"
                            onClick={() => setViewing(user)}
                          >
                            <Eye size={14} />
                          </StyledBtn>
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

      {/* Details Modal */}
      <StyledModal
        isOpen={!!viewing}
        onClose={() => setViewing(null)}
        title="User Details"
        size="md"
      >
        {viewing && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-700/30 border border-gray-100 dark:border-slate-700/40">
              <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-2xl shrink-0">
                {viewing.role !== "student"
                  ? "👨‍💼"
                  : viewing.studentType === "university"
                    ? "🎓"
                    : viewing.studentType === "high_school"
                      ? "🏫"
                      : "🎓"}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {viewing.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-slate-400 truncate">
                  {viewing.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-gray-100 dark:border-slate-700/40">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Role
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white capitalize">
                  {viewing.role.replace("_", " ")}
                </p>
              </div>
              <div className="p-3 rounded-xl border border-gray-100 dark:border-slate-700/40">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Status
                </p>
                <StyledBadge
                  className={
                    viewing.approvalStatus === "approved"
                      ? "bg-green-100 text-green-700"
                      : viewing.approvalStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }
                >
                  {viewing.approvalStatus || "Unknown"}
                </StyledBadge>
              </div>
              <div className="p-3 rounded-xl border border-gray-100 dark:border-slate-700/40">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Email Verified
                </p>
                <p className="flex items-center gap-1.5 text-sm font-medium text-gray-800 dark:text-white">
                  {viewing.isEmailVerified ? (
                    <>
                      <CheckCircle size={15} className="text-green-500" />
                      Verified
                    </>
                  ) : (
                    <>
                      <XCircle size={15} className="text-gray-400" />
                      Not verified
                    </>
                  )}
                </p>
              </div>
              <div className="p-3 rounded-xl border border-gray-100 dark:border-slate-700/40">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Joined
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {new Date(viewing.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <StyledBtn variant="secondary" onClick={() => setViewing(null)}>
                Close
              </StyledBtn>
            </div>
          </div>
        )}
      </StyledModal>
    </div>
  );
};
