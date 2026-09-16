"use client";

import { useState, useTransition } from "react";
import { UserData } from "@/lib/seed-data";
import { updateUserRoleAction, deleteUserAction } from "@/lib/actions/auth-actions";
import {
  ShieldCheck,
  User,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Search,
  Shield,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface AdminUserTableProps {
  initialUsers: UserData[];
  currentAdminEmail: string;
}

export function AdminUserTable({ initialUsers, currentAdminEmail }: AdminUserTableProps) {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleRole = (userId: string, currentRole: "user" | "admin") => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    startTransition(async () => {
      const res = await updateUserRoleAction(userId, newRole);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
        setStatusMessage({ type: "success", text: res.message });
      } else {
        setStatusMessage({ type: "error", text: res.message });
      }
      setTimeout(() => setStatusMessage(null), 3000);
    });
  };

  const handleDeleteUser = (userId: string, email: string) => {
    if (!confirm(`Are you sure you want to delete user ${email}? This action cannot be undone.`)) {
      return;
    }

    startTransition(async () => {
      const res = await deleteUserAction(userId);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        setStatusMessage({ type: "success", text: res.message });
      } else {
        setStatusMessage({ type: "error", text: res.message });
      }
      setTimeout(() => setStatusMessage(null), 3000);
    });
  };

  return (
    <div className="space-y-4">
      {/* Action Notification */}
      {statusMessage && (
        <div
          className={`p-3 rounded-2xl border text-xs flex items-center gap-2 animate-in fade-in duration-200 ${
            statusMessage.type === "success"
              ? "bg-[#7eb898]/15 text-[#9ad4b4] border-[#7eb898]/30"
              : "bg-rose-500/15 text-rose-200 border-rose-400/30"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-[#7eb898]" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300/60" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#1b131d]/90 border border-rose-400/20 text-xs text-rose-100 placeholder-rose-300/40 focus:outline-none focus:border-[#d8829d] transition-all"
          />
        </div>

        <div className="text-xs text-rose-300/70 font-mono">
          Showing <span className="text-white font-bold">{filteredUsers.length}</span> of {users.length} users
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-panel rounded-3xl border border-rose-900/30 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1a101b]/90 border-b border-rose-900/30 text-rose-300/70 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Developer</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Current Role</th>
                <th className="px-6 py-3.5">Registered</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-950/40 text-rose-100/90">
              {filteredUsers.map((u) => {
                const isAdmin = u.role === "admin";
                const isCurrentAdmin = u.email.toLowerCase() === currentAdminEmail.toLowerCase();

                return (
                  <tr key={u._id} className="hover:bg-rose-500/5 transition-colors">
                    {/* Name & Avatar */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c06c84] to-[#e2a76f] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{u.name}</span>
                            {isCurrentAdmin && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-[#f3c1cf]">
                                (You)
                              </span>
                            )}
                          </div>
                          {u.bio && (
                            <p className="text-[11px] text-rose-300/50 line-clamp-1 max-w-xs">
                              {u.bio}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 font-mono text-rose-200/80">
                      {u.email}
                    </td>

                    {/* Role Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                          isAdmin
                            ? "bg-[#e2a76f]/15 text-[#f3c99f] border-[#e2a76f]/40"
                            : "bg-[#7eb898]/15 text-[#9ad4b4] border-[#7eb898]/30"
                        }`}
                      >
                        {isAdmin ? (
                          <>
                            <ShieldCheck className="w-3 h-3 text-[#e2a76f]" /> Staff Admin
                          </>
                        ) : (
                          <>
                            <User className="w-3 h-3 text-[#7eb898]" /> Developer
                          </>
                        )}
                      </span>
                    </td>

                    {/* Join Date */}
                    <td className="px-6 py-4 text-rose-300/60 font-mono text-[11px]">
                      {formatDate(u.createdAt)}
                    </td>

                    {/* Action Controls */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle Role Button */}
                        <button
                          disabled={isPending || isCurrentAdmin}
                          onClick={() => handleToggleRole(u._id, u.role)}
                          className={`btn-bouncy-subtle px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer disabled:opacity-40 ${
                            isAdmin
                              ? "bg-rose-500/10 text-rose-300 border-rose-400/20 hover:bg-rose-500/20"
                              : "bg-[#e2a76f]/15 text-[#f3c99f] border-[#e2a76f]/30 hover:bg-[#e2a76f]/25"
                          }`}
                          title={isCurrentAdmin ? "Cannot demote yourself" : `Switch role to ${isAdmin ? "user" : "admin"}`}
                        >
                          {isAdmin ? "Demote to User" : "Promote to Admin"}
                        </button>

                        {/* Delete User Button */}
                        {!isCurrentAdmin && (
                          <button
                            disabled={isPending}
                            onClick={() => handleDeleteUser(u._id, u.email)}
                            className="p-1.5 rounded-lg text-rose-400/80 hover:text-rose-200 hover:bg-rose-500/15 transition-colors cursor-pointer"
                            title="Delete user account"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
