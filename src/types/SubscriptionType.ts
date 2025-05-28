
export interface Subscription {
    id: string;
    name: string;
    type: 'BASIC' | 'STANDARD' | 'PREMIUM';
    description?: string;
    cost: number;
    benefits: string[];

  }
  

  export interface UpdateSubscriptionInput {
 
    cost?: number;
    benefits?: string[];
  }
  