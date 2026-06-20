import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { toast } from 'react-toastify'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords do not match", {
                position: "bottom-right",
                theme: "dark"
            })
            return
        }

        try {
            setLoading(true)

            await api.post('/auth/register', {
                name,
                email,
                password
            })

            toast.success("Registered successfully", {
                position: "bottom-right",
                theme: "dark"
            })

            navigate('/login')

        } catch (e) {
            toast.error(
                e.response?.data?.message || "Register failed",
                {
                    position: "bottom-right",
                    theme: "dark"
                }
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-77px)] bg-slate-950 flex items-center justify-center px-4 py-6">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-8"
            >
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-sm sm:text-base text-slate-400 mt-2">
                        Register to manage your tasks
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                        <label className="block text-slate-300 font-medium mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your name"
                            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 font-medium mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 font-medium mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter password"
                            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 font-medium mb-2">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm password"
                            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
                >
                    {loading
                        ? "Creating Account..."
                        : "Create Account"}
                </button>

                <div className="mt-6 text-center">
                    <p className="text-sm sm:text-base text-slate-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-400 font-semibold hover:text-blue-300"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </form>

        </div>
    )
}

export default Register