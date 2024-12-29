import React from "react"

type AuthProps = {
    children: React.ReactNode
    illustration: React.ReactNode
}

export const AuthLayout: React.FC<AuthProps> = ({ children, illustration }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
                <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-12 md:w-1/2 flex flex-col justify-center items-center text-white">
                    { illustration }
                </div>
                <div className="p-12 md:w-1/2 bg-white"> { children } </div>
            </div>
        </div>
    )
}