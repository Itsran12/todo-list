import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AuthContextType {
  isLoggedIn: boolean
  userId: string | null
  login: (token: string, userId: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | null>(null)

  // Sinkronisasi state dengan localStorage
  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUserId = localStorage.getItem("userId")
    setIsLoggedIn(!!token)
    setUserId(storedUserId)
    console.log("AuthProvider - Initial isLoggedIn:", !!token) // Debugging
  }, [])

  const login = (token: string, userId: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("userId", userId)
    setIsLoggedIn(true)
    setUserId(userId)
    console.log("AuthProvider - Login successful") // Debugging
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    setIsLoggedIn(false)
    setUserId(null)
    console.log("AuthProvider - Logout successful") // Debugging
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
