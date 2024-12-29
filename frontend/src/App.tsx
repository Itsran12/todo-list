import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ErrorPage } from "./pages/ErrorPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { Settings } from "./pages/SettingsPage"
import { TodoPage1 } from "./pages/TodoPage1"
import { PrivateRoute } from "./components/elements/PrivateRoute"
import { AuthProvider } from "./components/elements/AuthContex" // Impor AuthProvider

const apiRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/todo",
    element: (
      <PrivateRoute>
        <TodoPage1 />
      </PrivateRoute>
    ),
  },
  {
    path: "settings",
    element: (
      <PrivateRoute>
        <Settings />
      </PrivateRoute>
    ),
  },
])

const App = () => {
  return (
    <AuthProvider> {/* Membungkus aplikasi dengan AuthProvider */}
      <RouterProvider router={apiRouter} />
    </AuthProvider>
  )
}

export default App
