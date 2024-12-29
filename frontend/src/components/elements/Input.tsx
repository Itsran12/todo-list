import React from "react"

type InputProps = {
    label       : string
    id          : string
    type?       : string
    value       : string
    className   : string
    onChange    : (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    required?   : boolean
}

export const Input: React.FC<InputProps> = ({ label, id, type, value, className, onChange, placeholder, required }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input 
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={className || "w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"}
            />
        </div>
    )
} 