import { useState } from "react"
import { Trash2, Edit2, Plus, Check, LogOut, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/elements/Button"
import { Input } from "../components/elements/Input"

interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
}

interface UserProfile {
  name: string
  avatar: string
}

export const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  
  const [user] = useState<UserProfile>({
    name: "John Doe",
    avatar: "/images/profile.jpg"
  })

  const addTodo = () => {
    if (newTitle.trim() && newDescription.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: newTitle,
          description: newDescription,
          completed: false,
        },
      ])
      setNewTitle("")
      setNewDescription("")
      setShowAddForm(false)
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    if (selectedTodo?.id === id) setSelectedTodo(null)
    if (editId === id) setEditId(null)
  }

  const startEdit = (todo: Todo) => {
    setEditId(todo.id)
    setEditTitle(todo.title)
    setEditDescription(todo.description)
    setSelectedTodo(null)
  }

  const saveEdit = () => {
    if (editTitle.trim() && editDescription.trim() && editId) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editId
          ? { ...todo, title: editTitle, description: editDescription }
          : todo
      )
      setTodos(updatedTodos)
      setEditId(null)
    }
  }

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const truncateText = (text: string) => {
    if (text.length > 200) {
      return text.substring(0, 200) + "..."
    }
    return text
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* User Profile */}
    <div className="absolute top-4 right-4 z-10">
    <div className="relative">
      {/* Profile Button */}
      <Button
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className="flex items-center space-x-3 p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:shadow-xl transition-all"
      >
        <img
          src={user.avatar}
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-white shadow"
        />
        <span className="hidden md:block text-white font-semibold">
          Itsran
        </span>
      </Button>

    {/* Profile Dropdown Menu */}
    {showProfileMenu && (
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <p className="font-bold text-sm">Your Name</p>
          <p className="text-xs">your.email@example.com</p>
        </div>
        <div className="py-2 px-2">
          <Link to="/settings" className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all">
            <Settings className="w-4 h-4 mr-2 text-gray-600" />
            Edit Profile
          </Link>
          <Link to="/" className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 transition-all">
            <LogOut className="w-4 h-4 mr-2 text-red-500" />
            Logout
          </Link>
        </div>
      </div>
    )}
  </div>
</div>


      {/* Left Panel - Todo List */}
      <div className="w-1/4 bg-gradient-to-b from-gray-50 to-gray-100 overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">My Tasks</h2>
          <div className="space-y-4">
            {todos.length === 0 ? (
              <div className="text-center py-8 text-gray-400 italic">
                No tasks yet. Start planning your day!
              </div>
            ) : (
              todos.map((todo) => (
                <div
                key={todo.id}
                className={`group cursor-pointer transition-all duration-200 ${
                  selectedTodo?.id === todo.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                } ${
                  todo.completed ? 'bg-green-50 border-l-4 border-green-500' : ''
                } rounded-lg p-3`}
                onClick={() => editId !== todo.id && setSelectedTodo(todo)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-sm font-medium ${
                    todo.completed ? 'text-green-700 line-through' : 'text-gray-800'
                  }`}>
                    {todo.title}
                  </h3>
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleComplete(todo.id)
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
                        startEdit(todo)
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteTodo(todo.id)
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className={`text-xs ${
                  todo.completed ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {truncateText(todo.description)}
                </p>
              </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Edit/View/Add Form */}
<div className="flex-1 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
  <div className="h-full px-10">
    {editId !== null ? (
      // Edit Form
      <div className="py-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Edit Task
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Input
              id=""
              label=""
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-2 text-sm border bg-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Task title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-4 py-2 text-sm border bg-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-justify"
              placeholder="Task details"
              rows={16}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={saveEdit}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Save Changes
            </Button>
            <Button
              onClick={() => setEditId(null)}
              className="px-4 py-2 text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    ) : selectedTodo ? (
      // View Todo Details
      <div className="py-8">
        <div className="mb-6">
          <h2
            className={`text-2xl font-bold mb-4 ${
              selectedTodo.completed
                ? 'bg-gradient-to-r from-green-600 to-teal-600'
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}
          >
            {selectedTodo.title}
          </h2>
          <div
            className={`text-justify whitespace-pre-line leading-relaxed ${
              selectedTodo.completed ? 'text-green-700' : 'text-gray-600'
            }`}
          >
            {selectedTodo.description}
          </div>
        </div>
        <Button
          onClick={() => setSelectedTodo(null)}
          className="text-sm text-purple-600 hover:text-purple-800 font-medium"
        >
          Close
        </Button>
      </div>
    ) : showAddForm ? (
      // Add Todo Form
      <div className="py-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          New Task
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Input
              id=""
              label=""
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2 text-sm border bg-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="What needs to be done?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-4 py-2 text-sm border bg-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-justify"
              placeholder="Add some details..."
              rows={16}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={addTodo}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Add Task
            </Button>
            <Button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    ) : (
      // Default Message
      <div className="flex flex-col items-center justify-center h-full -mt-28">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-fade-in">
          Welcome, Itsran!
        </h1>
        <p className="mt-4 text-lg text-gray-500 animate-slide-up">
          Today is a great day to achieve something amazing. What would you like to accomplish or explore? Let’s make it happen together!
        </p>
      </div>
    )}
  </div>

  {!selectedTodo && !showAddForm && !editId && (
    <Button
      onClick={() => setShowAddForm(true)}
      className="fixed bottom-6 right-6 p-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all"
    >
      <Plus className="w-5 h-5" />
    </Button>
  )}
</div>

    </div>
  )
}