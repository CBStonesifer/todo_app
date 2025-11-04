import {useState} from 'react';

interface TaskMakerProps {
  onAddTask: (name: string, description: string, date: Date) => void;
}

export function TaskMaker({onAddTask}: TaskMakerProps) {
  const [name, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  const handleAddTask = () => {
    if (name.trim() && date) {
      onAddTask(name, description, date);
      setTaskName('');
      setDescription('');
      setDate(null);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Task Name*"
              className="flex-1 p-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              type="date"
              className="p-2 border border-gray-300 rounded-md"
              value={date ? date.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const [year, month, day] = e.target.value.split('-').map(Number);
                setDate(new Date(year, month - 1, day));
              }}
            />
          </div>
          <textarea
            placeholder="Description (optional)"
            className="w-full p-2 border border-gray-300 rounded-md h-40 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-blue-600 self-start disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!name.trim() || !date}
          onClick={handleAddTask}
        >
          + Add
        </button>
      </div>
    </div>
  );
}