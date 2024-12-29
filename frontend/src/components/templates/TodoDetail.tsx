import { Button } from "../elements/Button"
import { Todo } from "../../types/interfaces"

interface TodoDetailsProps {
    todo: Todo
    onClose: () => void
}

export const TodoDetails = ({ todo, onClose }: TodoDetailsProps) => {
    return (
        <div className="py-8 -mt-10">
        <div className="mb-6">
            <h2
            className={`text-2xl font-bold mb-4 ${
                todo.completed
                ? 'bg-gradient-to-r from-green-600 to-teal-600'
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}
            >
            {todo.title}
            </h2>
            <div
            className={`text-justify whitespace-pre-line leading-relaxed ${
                todo.completed ? 'text-green-700' : 'text-gray-600'
            }`}
            >
            {todo.description}
            </div>
        </div>
        <Button
            onClick={onClose}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
        >
            Close
        </Button>
        </div>
    )
}