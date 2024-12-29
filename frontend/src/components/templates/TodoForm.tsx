import { Input } from "../elements/Input"
import { Button } from "../elements/Button"

interface TodoFormProps {
    title: string
    description: string
    onTitleChange: (value: string) => void
    onDescriptionChange: (value: string) => void
    onSubmit: () => void
    onCancel: () => void
    mode: 'add' | 'edit'
}

export const TodoForm = ({
    title,
    description,
    onTitleChange,
    onDescriptionChange,
    onSubmit,
    onCancel,
    mode
}: TodoFormProps) => {
    return (
        <div className="py-8 -mt-10">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {mode === 'add' ? 'New Task' : 'Edit Task'}
        </h2>
        <div className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Input
                id=""
                label=""
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                className="w-full px-4 py-2 text-sm border bg-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder={mode === 'add' ? "What needs to be done?" : "Task title"}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                className="w-full px-4 py-2 text-sm border bg-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-justify"
                placeholder={mode === 'add' ? "Add some details..." : "Task details"}
                rows={window.innerWidth < 768 ? 8 : 16}
            />
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
                onClick={onSubmit}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
                {mode === 'add' ? 'Add Task' : 'Save Changes'}
            </Button>
            <Button
                onClick={onCancel}
                className="w-full sm:w-auto px-4 py-2 text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
                Cancel
            </Button>
            </div>
        </div>
        </div>
    )
}