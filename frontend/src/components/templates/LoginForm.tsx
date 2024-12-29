import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../elements/Button"
import { Input } from "../elements/Input"

type LoginProps = {
    email: string
    setEmail: (email: string) => void
    password: string
    setPassword: (password: string) => void
    onSubmit: (e: React.FormEvent) => void
}

export const LoginForm: React.FC<LoginProps> = ({ email, setEmail, password, setPassword, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
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

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500"/>

                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                        Ingatkan saya
                    </label>
                </div>
                <Link to={"#"} className="text-sm text-purple-600 hover:text-purple-500 font-medium">
                    Lupa password?
                </Link>
            </div>
            <Button
            type="submit"
            className="w-full p-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                Masuk
            </Button>  
        </form>
    )
}