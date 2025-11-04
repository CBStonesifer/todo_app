export interface TodoItem {
  id: number;
  name: string;
  description?: string;
  date: Date;
  isOverdue: boolean;
  isComplete: boolean;
}

export type TodoSection = 'overdue' | 'outstanding' | 'completed';
