import { useState } from "react";
import { Menu, Plus } from "lucide-react";
import { Button } from "../components/elements/Button";
import { Sidebar } from "../components/layouts/Sidebar";
import { TodoForm } from "../components/templates/TodoForm";
import { TodoDetails } from "../components/templates/TodoDetail";
import { ProfileMenu } from "../components/templates/ProfileMenu";
import { Todo, UserProfile } from "../types/interfaces";

export const TodoPage1 = () => {
  // States
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [user] = useState<UserProfile>({
    name: "John Doe",
    avatar: "/images/profile.jpg",
  });

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
      ]);
      setNewTitle("");
      setNewDescription("");
      setShowAddForm(false);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (selectedTodo?.id === id) setSelectedTodo(null);
    if (editId === id) setEditId(null);
  };

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setSelectedTodo(null);
  };

  const saveEdit = () => {
    if (editTitle.trim() && editDescription.trim() && editId) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editId
          ? { ...todo, title: editTitle, description: editDescription }
          : todo
      );
      setTodos(updatedTodos);
      setEditId(null);
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Toggle Sidebar Button - Mobile Only */}
      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </Button>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        todos={todos}
        selectedTodoId={selectedTodo?.id ?? null}
        editId={editId}
        onSelect={setSelectedTodo}
        onToggleComplete={toggleComplete}
        onEdit={startEdit}
        onDelete={deleteTodo}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 pt-16 md:pt-8 overflow-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
          <Button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="relative w-10 h-10 rounded-full overflow-hidden"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </Button>
        </div>

        {/* Profile Menu */}
        {showProfileMenu && (
          <div className="absolute top-20 right-8 z-30">
            <ProfileMenu
              user={user}
              onClose={() => setShowProfileMenu(false)}
            />
          </div>
        )}

        {/* Content Area */}
        {showAddForm ? (
          <TodoForm
            title={newTitle}
            description={newDescription}
            onTitleChange={setNewTitle}
            onDescriptionChange={setNewDescription}
            onSubmit={addTodo}
            onCancel={() => {
              setShowAddForm(false);
              setNewTitle("");
              setNewDescription("");
            }}
            mode="add"
          />
        ) : editId ? (
          <TodoForm
            title={editTitle}
            description={editDescription}
            onTitleChange={setEditTitle}
            onDescriptionChange={setEditDescription}
            onSubmit={saveEdit}
            onCancel={() => {
              setEditId(null);
              setEditTitle("");
              setEditDescription("");
            }}
            mode="edit"
          />
        ) : selectedTodo ? (
          <TodoDetails
            todo={selectedTodo}
            onClose={() => setSelectedTodo(null)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full -mt-28">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-fade-in">
              Welcome, Itsran!
            </h2>
            <p className="mt-4 text-lg text-gray-500 animate-slide-up">
              Today is a great day to achieve something amazing. What would you like to accomplish or explore? Let’s make it happen together!
            </p>
          </div>
        )}
      </main>

      {/* New Task Button */}
      <Button
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-6 right-6 z-30 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-all"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};
