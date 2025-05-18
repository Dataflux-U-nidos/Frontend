// src/components/pages/SupportPage.tsx
import { useEffect, useState, useCallback } from "react";
import { SearchBar } from "../molecules/SearchBar";
import { UserList } from "../organisms/UserList";
import { User } from "@/types/userType";
import { useGetSupportHook, useSpoofHook } from "@/hooks";

export default function SupportPage() {
  const { mutateAsync: getUsers } = useGetSupportHook();
  const { mutateAsync: spoofAccount } = useSpoofHook();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("");

  const fetchUsers = useCallback(
    async (search = "", type = "") => {
      setLoading(true);
      try {
        const response = await getUsers({ search, userType: type });
        setUsers(response);
      } finally {
        setLoading(false);
      }
    },
    [getUsers]
  );

  useEffect(() => {
    fetchUsers("", userType);
  }, [fetchUsers, userType]);

  const handleSpoof = async (user: User) => {
    if (!confirm(`Impersonate ${user.email}?`)) return;
    setLoading(true);
    try {
      await spoofAccount(user.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Support</h1>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          {/* now fires on every change */}
          <SearchBar onSearch={(term) => fetchUsers(term, userType)} />
        </div>
        <select
          className="border rounded px-2 py-1"
          value={userType}
          onChange={(e) => {
            setUserType(e.target.value);
            // fetchUsers will run via useEffect
          }}
        >
          <option value="">All Types</option>
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
          <option value="MARKETING">Marketing</option>
          <option value="SUPPORT">Support</option>
          <option value="FINANCES">Finances</option>
        </select>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <UserList users={users} onSpoof={handleSpoof} />
      )}
    </div>
  );
}
