// src/components/pages/SupportPage.tsx
import { useEffect, useState, useCallback } from "react";
import { SearchBar } from "../molecules/SearchBar";
import { UserList } from "../organisms/UserList";
import { User } from "@/types/userType";
import { useGetSupportHook, useSpoofHook } from "@/hooks";
import { PaginatedUsers } from "@/types/pagination";
import { Button } from "@/components/atoms/ui/button";

export default function SupportPage() {
  const { mutateAsync: getUsers } = useGetSupportHook();
  const { mutateAsync: spoofAccount } = useSpoofHook();

  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [userType, setUserType] = useState("");

  const fetchUsers = useCallback(
    async (search = "", type = "", pageNum = 1) => {
      setLoading(true);
      try {
        const result: PaginatedUsers = await getUsers({
          search,
          userType: type,
          page: pageNum,
          limit: pageSize,
        });
        setUsers(result.items);
        setTotal(result.total);
        setPage(result.page);
      } finally {
        setLoading(false);
      }
    },
    [getUsers, pageSize]
  );

  // whenever searchTerm, userType, or pageSize changes, reset to page 1
  useEffect(() => {
    fetchUsers(searchTerm, userType, 1);
  }, [fetchUsers, searchTerm, userType]);

  const handleSpoof = async (user: User) => {
    if (!confirm(`Impersonate ${user.email}?`)) return;
    setLoading(true);
    try {
      await spoofAccount(user.id);
      // your spoof hook likely handles redirect/token storage
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Support</h1>

      {/* Filters + pageSize */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <SearchBar
            onSearch={(term) => setSearchTerm(term)}
            initialValue={searchTerm}
          />
        </div>

        <select
          className="border rounded px-2 py-1"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
          <option value="MARKETING">Marketing</option>
          <option value="SUPPORT">Support</option>
          <option value="FINANCES">Finances</option>
          <option value="UNIVERSITY">Universidad</option>
          <option value="INFOMANAGER">Info Manager</option>
        </select>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <UserList users={users} onSpoof={handleSpoof} />

          {/* Pagination controls */}
          <div className="flex justify-between items-center py-2">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => fetchUsers(searchTerm, userType, page - 1)}
            >
              Previous
            </Button>

            <span>
              Page {page} of {totalPages} ({total} users)
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => fetchUsers(searchTerm, userType, page + 1)}
              >
                Next
              </Button>

              <select
                className="border rounded px-2 py-1"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
