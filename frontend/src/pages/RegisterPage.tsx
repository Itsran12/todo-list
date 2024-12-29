import React, { useState } from 'react'
import axios from 'axios'
import { CheckCircle } from 'lucide-react'
import { AuthLayout } from '../components/layouts/AuthLayout'
import { RegisterForm } from '../components/templates/RegisterForm'
import { Link } from 'react-router-dom'

export const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false) 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true) 

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                username,
                email,
                password,
            })

            console.log('Registration successful:', response.data)
            alert('Registration successful!')
            setUsername('')
            setEmail('')
            setPassword('')
        } catch (error: any) {
            console.error('Error:', error.response?.data?.message || error.message)
            alert(error.response?.data?.message || 'An error occurred')
        } finally {
            setIsLoading(false) 
        }
    }

    const illustration = (
        <div className="text-center">
            <CheckCircle className="w-20 h-20 mb-4" />
            <h2 className="text-3xl font-bold mb-4">TaskMaster</h2>
            <p className="text-purple-100 mb-6">
                Kelola tugas Anda dengan lebih efisien dan tetap produktif setiap hari
            </p>
            <div className="space-y-2 text-sm">
                <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Mudah digunakan</span>
                </div>
                <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Sinkronisasi realtime</span>
                </div>
                <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Gratis selamanya</span>
                </div>
            </div>
        </div>
    )

    return (
        <AuthLayout illustration={illustration}>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Selamat Datang!</h3>
            <p className="text-gray-600 mb-8">Silakan masukan data Anda</p>
            <RegisterForm
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onSubmit={handleSubmit}
            />
            {isLoading && <p className="text-center text-sm text-gray-600 mt-4">Registering...</p>}
            <div className="mt-8 text-center text-sm text-gray-600">
                Sudah punya akun?{' '}
                <Link to="/" className="text-purple-600 hover:text-purple-500 font-medium">
                    Login sekarang
                </Link>
            </div>
        </AuthLayout>
    )
}
