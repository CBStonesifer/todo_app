import {TaskItem} from './TaskItem';
import {TodoItem, TodoSection} from '../models/models';

interface TaskListProps {
  title: string;
  items: TodoItem[];
  section: TodoSection;
  onToggle: (itemId: number) => void;
}

export function TaskList({title, items, section, onToggle}: TaskListProps) {
  const isCompleted = section === 'completed';

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-2xl">{title}</h2>
        <span className="text-2xl text-gray-400">{items.length}</span>
      </div>
      <ul className="bg-white rounded-md py-4 pr-4 list-none">
        {items.map((item) => (
          <TaskItem
            key={item.id}
            name={item.name}
            description={item.description}
            date={item.date}
            isOverdue={section === 'overdue'}
            isCompleted={isCompleted}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}