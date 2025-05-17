import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/ui/table";
import { Card } from "@/components/atoms/ui/card";

export interface User {
  id: string;
  name: string;
  email: string;
  userType: string;
  universityId: string;
  last_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserListProps {
  users: User[];
}

export const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <Card className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>User Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.last_name}</TableCell>
              <TableCell>{u.userType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
