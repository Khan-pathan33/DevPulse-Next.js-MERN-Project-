import { dbService } from "@/lib/db-service";
import { getCurrentUser } from "@/lib/auth";
import { AdminUserTable } from "@/components/admin-user-table";
import { Users, UserPlus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const [users, currentUser] = await Promise.all([
    dbService.getUsers(),
    getCurrentUser(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7eb898] mb-1">
            <Users className="w-4 h-4" /> Identity & Access Management (IAM)
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            User Accounts & Role Delegation
          </h1>
          <p className="text-xs text-rose-200/70 mt-1">
            Delegate Staff Admin or Developer roles, monitor accounts, and enforce platform governance.
          </p>
        </div>

        <Link
          href="/register"
          className="btn-bouncy px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#c06c84] to-[#d8829d] flex items-center gap-1.5 self-start sm:self-auto"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add User</span>
        </Link>
      </div>

      {/* Users Table Component */}
      <AdminUserTable
        initialUsers={users}
        currentAdminEmail={currentUser?.email || ""}
      />
    </div>
  );
}
