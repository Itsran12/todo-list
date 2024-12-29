import React from "react"
import { Button } from "../elements/Button"
import { Input } from "../elements/Input"

type RegisterProps = {
    username: string
    setUsername: (username: string) => void
    email: string
    setEmail: (email: string) => void
    password: string
    setPassword: (password: string) => void
    onSubmit: (e: React.FormEvent) => void
}

export const RegisterForm: React.FC<RegisterProps> = ({ username, setUsername, email, setEmail, password, setPassword, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <Input
            label="Username"
            id="username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="example"
            required
            className=""
            />
            <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            required
            className=""
            />
            <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="**********"
            required
            className=""
            />
            <Button
            type="submit"
            className="w-full p-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                Sign up
            </Button>  
        </form>
    )
}