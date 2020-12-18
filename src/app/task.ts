export interface Task {
  id: number;
  description: string;
}

export type TaskWriteDto = Omit<Task, "id">
