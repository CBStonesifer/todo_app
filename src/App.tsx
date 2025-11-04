import {useState} from 'react';
import {TaskList} from './components/TaskList';
import {TaskMaker} from './components/TaskMaker';
import {TodoItem, TodoSection} from './models/models';


function App() {
    const [overdueItems, setOverdueItems] = useState<TodoItem[]>([]);
    const [oustandingItems, setOutstandingItems] = useState<TodoItem[]>([]);
    const [completedItems, setCompletedItems] = useState<TodoItem[]>([]);

    // Checks if a task's due date is before today
    function isTaskOverdue(date: Date): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskDate = new Date(date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate < today;
    }

    // Creates a new todoItem and adds it to the appropriate list based on due date
    function addTodoItem(name: string, description: string, date: Date) {
        const newItem: TodoItem = {
            id: Math.floor(Math.random() * 1000000),
            name: name,
            description: description,
            date: date,
            isOverdue: isTaskOverdue(date),
            isComplete: false
        };

        if (newItem.isOverdue) {
            setOverdueItems([...overdueItems, newItem]);
        }
        else {
            setOutstandingItems([...oustandingItems, newItem]);
        }
    }

    // Moves tasks between lists when checkbox is toggled
    function toggleTaskCompletion(itemId: number, currentSection: TodoSection) {
        let item: TodoItem | undefined;

        if (currentSection === 'overdue') {
            item = overdueItems.find(i => i.id === itemId);
            if (item) {
                setOverdueItems(overdueItems.filter(i => i.id !== itemId));
                setCompletedItems([...completedItems, { ...item, isComplete: true }]);
            }
        } else if (currentSection === 'outstanding') {
            item = oustandingItems.find(i => i.id === itemId);
            if (item) {
                setOutstandingItems(oustandingItems.filter(i => i.id !== itemId));
                setCompletedItems([...completedItems, { ...item, isComplete: true }]);
            }
        } else if (currentSection === 'completed') {
            item = completedItems.find(i => i.id === itemId);
            if (item) {
                setCompletedItems(completedItems.filter(i => i.id !== itemId));
                const updatedItem = { ...item, isComplete: false };

                if (isTaskOverdue(updatedItem.date)) {
                    setOverdueItems([...overdueItems, updatedItem]);
                } else {
                    setOutstandingItems([...oustandingItems, updatedItem]);
                }
            }
        }
    }

    return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl rounded-lg p-6">


          <div className="flex items-center gap-2 mb-6">
              <h1 className="text-4xl font-semibold">To Do</h1>
              <span className="text-3xl text-gray-400">{overdueItems.length + oustandingItems.length + completedItems.length}</span>
          </div>

          <TaskMaker onAddTask={addTodoItem} />

          <div className="space-y-6">
              <TaskList
                  title="Overdue"
                  items={overdueItems}
                  section="overdue"
                  onToggle={(id: number) => toggleTaskCompletion(id, 'overdue')}
              />

              <TaskList
                  title="Outstanding"
                  items={oustandingItems}
                  section="outstanding"
                  onToggle={(id: number) => toggleTaskCompletion(id, 'outstanding')}
              />

              <TaskList
                  title="Completed"
                  items={completedItems}
                  section="completed"
                  onToggle={(id: number) => toggleTaskCompletion(id, 'completed')}
              />
          </div>

      </div>
    </div>
  );
}

export default App;
