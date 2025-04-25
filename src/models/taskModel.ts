export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
  }
  
  export const tasks: Task[] = [];
  