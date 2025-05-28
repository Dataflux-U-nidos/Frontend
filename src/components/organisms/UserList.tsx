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
import { Button } from "@/components/atoms/ui/button";
import { User } from "@/types/userType";

export interface UserListProps {
  users: User[];
  onSpoof: (user: User) => void;
}

export const UserList: FC<UserListProps> = ({ users, onSpoof }) => (
  <Card className="w-full">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>User Type</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.name}</TableCell>
            <TableCell>{u.last_name}</TableCell>
            <TableCell>{u.userType}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" onClick={() => onSpoof(u)}>
                Spoof
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);
