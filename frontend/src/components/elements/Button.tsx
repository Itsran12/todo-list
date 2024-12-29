import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className, ...props }) => {
    return (
        <button
        onClick={onClick}
        className={className || "py-3 px-4 rounded-lg transition font-medium"}
        {...props}>
            {children}
        </button>
    )
}