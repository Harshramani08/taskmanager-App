import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { checkUser } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            await api.post('/auth/login', {
                email,
                password
            })

            await checkUser()

            toast.success("Login successfully", {
                position: "bottom-right",
                theme: "dark"
            })

            navigate('/dashboard')

        } catch (e) {
            toast.error(
                e.response?.data?.message || "Login failed",
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
        <div className="min-h-[calc(100vh-77px)] bg-slate-950 flex justify-center items-center px-4 py-6">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-8"
            >
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white">
                        Welcome Back
                    </h1>

                    <p className="text-sm sm:text-base text-slate-400 mt-2">
                        Login to continue managing your tasks
                    </p>
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-slate-300 font-medium mb-2"
                    >
                        Email Address
                    </label>

                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-slate-300 font-medium mb-2"
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="mt-6 text-center">
                    <p className="text-sm sm:text-base text-slate-400">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-400 font-semibold hover:text-blue-300"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </form>

        </div>
    )
}

export default Login