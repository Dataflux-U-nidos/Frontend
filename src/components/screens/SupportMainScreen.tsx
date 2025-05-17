import { useEffect, useState, useCallback } from "react";
import { SearchBar } from "../molecules/SearchBar";
import { UserList } from "../organisms/UserList";
import { User } from "@/types/userType";
import { useGetSupportHook } from "@/hooks";

export default function SupportPage() {
  const { mutateAsync: getUsers } = useGetSupportHook();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(
    async (search = "") => {
      setLoading(true);
      try {
        const response = await getUsers();
        if (search) {
          const filteredUsers = response.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
          );
          setUsers(filteredUsers);
        } else {
          setUsers(response);
        }
      } finally {
        setLoading(false);
      }
    },
    [getUsers]
  );

  // initial load
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Support</h1>

      <SearchBar onSearch={fetchUsers} />

      {loading ? <p>Loading…</p> : <UserList users={users} />}
    </div>
  );
}
