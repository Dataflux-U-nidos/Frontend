export interface User {
    id: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    age: number;
    locality?: string;
    school?: string;
    preferences?: Record<string, unknown>;
  }
  
  //excludes id when creating a new user
  export type CreateUserInput = Omit<User, 'id'>;
  
  //  when updating a user we can update any field except the id
  export type UpdateUserInput = Partial<Omit<User, 'id'>>;
  