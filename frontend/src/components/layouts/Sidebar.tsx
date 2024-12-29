import { Todo } from "../../types/interfaces"
import { TodoItem } from "../elements/TodoItem"

interface SidebarProps {
    isOpen: boolean
    todos: Todo[]
    selectedTodoId: number | null
    editId: number | null
    onSelect: (todo: Todo) => void
    onToggleComplete: (id: number) => void
    onEdit: (todo: Todo) => void
    onDelete: (id: number) => void
}

export const Sidebar = ({
    isOpen,
    todos,
    selectedTodoId,
    editId,
    onSelect,
    onToggleComplete,
    onEdit,
    onDelete
}: SidebarProps) => {
    return (
        <div 
        className={`
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            fixed md:relative
            w-full md:w-1/4 
            h-full 
            bg-gradient-to-b from-gray-50 to-gray-100 
            overflow-auto 
            transition-transform duration-300 ease-in-out
            z-10
            [&::-webkit-scrollbar]:w-2 
            [&::-webkit-scrollbar-track]:bg-transparent 
            [&::-webkit-scrollbar-thumb]:bg-gray-300 
            [&::-webkit-scrollbar-thumb]:rounded-full 
            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
        `}
        >
        <div className="p-6 pt-16 md:pt-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">My Tasks</h2>
            <div className="space-y-4">
            {todos.length === 0 ? (
                <div className="text-center py-8 text-gray-400 italic">
                No tasks yet. Start planning your day!
                </div>
            ) : (
                todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    selectedTodoId={selectedTodoId}
                    editId={editId}
                    onSelect={onSelect}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
                ))
            )}
            </div>
        </div>
        </div>
    )
}