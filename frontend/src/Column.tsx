import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import { type Column as ColumnType, type Task } from './types';

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  refresh: () => void;
};

export function Column({ column, tasks, refresh}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id : column.id,
  });

  return (
    <div className="todo">
      <h2 className="todo-title">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} refresh={refresh}/>;
        })}
      </div>
    </div>
  );
} 