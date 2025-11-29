export type TaskStatus =  'not started' | 'todo' | 'in progress' | 'done';

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
  due_time : string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};