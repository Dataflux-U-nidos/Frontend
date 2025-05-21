export interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  age?: number;
  userType: string; // "STUDENT" | "VIEWER" | "ADMIN"
  locality?: string;
  school?: string;
  preferences?: Record<string, unknown>;
  avatar?: string;
  testCompleted?: boolean;
  le?: number;
  ma?: number;
  ci?: number;
  cc?: number;
  idi?: number;
  ar?: number;
  universityId?: string;
  phone?: string;
  address?: string;
  zone?: string;
  price_range?: string;  
  aceptation_difficulty?: string;  
  description?: string;  
  link?: string;  

  // Campos adicionales
  createdAt?: string;
  updatedAt?: string;
  _id?: string;

}

//excludes id when creating a new user
export type CreateUserInput = Omit<User, "id">;

//  when updating a user we can update any field except the id
export type UpdateUserInput = Partial<Omit<User, "id">>;
