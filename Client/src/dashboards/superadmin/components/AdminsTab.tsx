import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { userService } from "@services/userService";

interface AdminsTabProps {
  onViewAdmin: (admin: any) => void;
  onShowModal: () => void;
}

export const AdminsTab: React.FC<AdminsTabProps> = ({
  onViewAdmin,
  onShowModal,
}) => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers(1, 100, "admin");
      const adminsList = Array.isArray(response.data) ? response.data : [];
      setAdmins(adminsList);
    } catch (err) {
      console.error(err);
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAdmin = (admin: any) => {
    onViewAdmin({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      educationLevel: "University",
      university: admin.universityId || "N/A",
      department: admin.departmentId || "N/A",
      joinedDate: new Date(admin.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "Active",
      isAdmin: true,
    });
    onShowModal();
  };

  const handleDeleteAdmin = async (id: string) => {
    if (confirm("Are you sure you want to delete this admin?")) {
      try {
        await userService.deleteUser(id);
        setAdmins(admins.filter((a) => a.id !== id));
      } catch (err) {
        alert("Failed to delete admin");
        console.error(err);
      }
    }
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-4"></div>
            <p className="text-slate-500 font-medium tracking-wide">
              Securing administrator data...
            </p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50">
      <CardHeader className="bg-white dark:bg-slate-800/60 pb-0 border-none">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600">
                🛡️
              </span>
              Platform Administrators
            </h2>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Manage system-wide permissions and admin accounts
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search admins..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={fetchAdmins}
              className="rounded-xl"
            >
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        {/* Mobile Card View */}
        <div className="md:hidden space-y-3 p-4">
          {filteredAdmins.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-4xl mb-3">👻</span>
              <p className="text-slate-500 font-medium">
                No administrators matching your search
              </p>
            </div>
          ) : (
            filteredAdmins.map((admin) => (
              <div
                key={admin.id}
                className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800/50 dark:to-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 p-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative space-y-3">
                  {/* Header with Avatar and Status */}
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-lg">
                        {admin.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800 shadow-sm"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 dark:text-white text-base truncate">
                        {admin.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">
                        {admin.email}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-[10px] font-bold tracking-wide uppercase shadow-sm flex-shrink-0">
                      Active
                    </span>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-3 border border-slate-100 dark:border-white/5">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                        University
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm truncate">
                        {admin.universityId || "N/A"}
                      </div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-3 border border-slate-100 dark:border-white/5">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                        Department
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm truncate">
                        {admin.departmentId || "All Depts"}
                      </div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-3 border border-slate-100 dark:border-white/5 col-span-2">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                        Joined Date
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {new Date(admin.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleViewAdmin(admin)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <span>👁️</span>
                      <span>View Profile</span>
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                      title="Delete Admin"
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
              <tr className="bg-slate-50/80 dark:bg-slate-900/20 border-y border-slate-100 dark:border-white/5">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Administrator
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  University
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-3">👻</span>
                      <p className="text-slate-500 font-medium">
                        No administrators matching your search
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center font-bold text-blue-600">
                          {admin.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {admin.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {admin.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {admin.universityId || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {admin.departmentId || "All Depts"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {new Date(admin.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-bold tracking-wider uppercase">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleViewAdmin(admin)}
                          className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 rounded-lg transition-colors tooltip"
                          title="View Profile"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => handleDeleteAdmin(admin.id)}
                          className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-rose-600 rounded-lg transition-colors"
                          title="Delete Admin"
                        >
                          🗑️
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
