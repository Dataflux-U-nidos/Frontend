// src/types/pagination.ts
import { User } from "@/types/userType";

export interface PaginatedUsers {
  items: User[];
  total: number;
  page: number;
  limit: number;
}
