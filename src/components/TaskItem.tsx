interface TaskItemProps {
    name: string;
    description?: string;
    date: Date;
    isOverdue?: boolean;
    isCompleted?: boolean;
    onToggle: () => void;
}

const red = "text-xs ml-4 text-red-500"
const grey = "text-xs ml-4 text-gray-500"

export function TaskItem({ name, description, date, isCompleted = false, isOverdue = false, onToggle}: TaskItemProps) {
    return (
        <li className="pb-4 mb-4 last:pb-0 last:mb-0 flex items-start gap-3">
            <input
                type="checkbox"
                checked={isCompleted}
                className="mt-1 h-4 w-4 rounded border custom-checkbox focus:ring-1 focus:ring-purple-600 cursor-pointer"
                style={{
                    backgroundColor: isCompleted ? '#e9d5ff' : 'transparent',
                    borderColor: isCompleted ? '#8032bd' : '#d1d5db'
                }}
                onChange={onToggle}
            />
            <div className="flex-1">
                <div className="font-medium">
                    {name}
                </div>
                {description && (
                    <p className="text-sm text-gray-600">
                        {description}
                    </p>
                )}
            </div>
            <p className={isOverdue && !isCompleted ? red : grey}>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </li>
    )
}