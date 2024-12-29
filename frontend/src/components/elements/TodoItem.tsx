import { Button } from "./Button"
import { Trash2, Edit2, Check } from "lucide-react"
import { Todo } from "../../types/interfaces"

interface TodoItemProps {
    todo: Todo
    selectedTodoId?: number | null
    onSelect: (todo: Todo) => void
    onToggleComplete: (id: number) => void
    onEdit: (todo: Todo) => void
    onDelete: (id: number) => void
    editId: number | null
}

export const TodoItem = ({
    todo,
    selectedTodoId,
    onSelect,
    onToggleComplete,
    onEdit,
    onDelete,
    editId
}: TodoItemProps) => {
    const truncateText = (text: string) => {
        return text.length > 200 ? text.substring(0, 200) + "..." : text
    }

    return (
        <div
        key={todo.id}
        className={`group cursor-pointer transition-all duration-200 ${
            selectedTodoId === todo.id ? 'bg-blue-50' : 'hover:bg-gray-50'
        } ${
            todo.completed ? 'bg-green-50 border-l-4 border-green-500' : ''
        } rounded-lg p-3`}
        onClick={() => editId !== todo.id && onSelect(todo)}
        >
        <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm font-medium ${
            todo.completed ? 'text-green-700 line-through' : 'text-gray-800'
            }`}>
            {todo.title}
            </h3>
            <div className="flex items-center gap-1.5 md:opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
                onClick={(e) => {
                e.stopPropagation()
                onToggleComplete(todo.id)
                }}
                className={`p-1 rounded-full ${
                todo.completed ? "bg-green-500" : "bg-gray-200"
                }`}
            >
                <Check className="w-3 h-3 text-white" />
            </Button>
            <Button
                onClick={(e) => {
                e.stopPropagation()
                onEdit(todo)
                }}
                className="text-blue-600 hover:text-blue-700"
            >
                <Edit2 className="w-4 h-4" />
            </Button>
            <Button
                onClick={(e) => {
                e.stopPropagation()
                onDelete(todo.id)
                }}
                className="text-red-600 hover:text-red-700"
            >
                <Trash2 className="w-4 h-4" />
            </Button>
            </div>
        </div>
        <p className={`text-xs text-justify ${
            todo.completed ? 'text-green-600' : 'text-gray-600'
        }`}>
            {truncateText(todo.description)}
        </p>
        </div>
    )
}