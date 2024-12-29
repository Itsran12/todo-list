import React, { useState } from 'react'
import { User, Lock, Save, Edit, Eye, EyeOff } from 'lucide-react'
import { Button } from '../components/elements/Button'
import axios from 'axios'

interface UpdateProfileForm {
    username: string
    newPassword: string
    confirmPassword: string
}

export const Settings: React.FC = () => {
    const [formData, setFormData] = useState<UpdateProfileForm>({
        username: '',
        newPassword: '',
        confirmPassword: '',
    })

    const [passwordVisibility, setPasswordVisibility] = useState({
        newPassword: false,
        confirmPassword: false,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }))
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.newPassword !== formData.confirmPassword) {
            alert("Password tidak cocok!")
            return
        }

        const updatedData = {
            username: formData.username,
            password: formData.newPassword
        }

        try {
            const response = await axios.patch('/api/users', updatedData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            // Tanggapan berhasil
            if (response.status === 200) {
                alert("Profile updated successfully!")
            }
        } catch (error) {
            console.error("Error updating profile:", error)
            alert("Failed to update profile")
        }
    }

    return (
        <div className="max-w-3xl mx-auto mt-20">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Profile Settings
                </h1>

                <div className="flex flex-col sm:flex-row gap-12">
                    {/* Left Side - Profile Image Placeholder */}
                    <div className="flex flex-col items-center">
                        <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden mb-4 shadow-inner">
                            <div className="flex items-center justify-center h-full">
                                <User size={60} className="text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="flex-1">
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
                                    <User size={20} className="text-gray-400 mr-3" />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent focus:outline-none text-gray-700"
                                        placeholder="Enter your username"
                                    />
                                </div>
                            </div>

                            {['newPassword', 'confirmPassword'].map((field) => (
                                <div key={field} className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {field
                                            .replace(/([A-Z])/g, ' $1')
                                            .replace(/^./, (str) => str.toUpperCase())}
                                    </label>
                                    <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
                                        <Lock size={20} className="text-gray-400 mr-3" />
                                        <input
                                            type={
                                                passwordVisibility[field as keyof typeof passwordVisibility]
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            name={field}
                                            value={formData[field as keyof UpdateProfileForm]}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent focus:outline-none text-gray-700"
                                            placeholder={`Enter your ${field}`}
                                        />
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                togglePasswordVisibility(field as keyof typeof passwordVisibility)
                                            }
                                            className="text-gray-400 focus:outline-none"
                                        >
                                            {passwordVisibility[field as keyof typeof passwordVisibility] ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-end gap-4 pt-4">
                                <Button
                                    type="button"
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm hover:bg-gray-200 flex items-center gap-2"
                                >
                                    <Edit size={16} />
                                    Update
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 flex items-center gap-2"
                                >
                                    <Save size={16} />
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
