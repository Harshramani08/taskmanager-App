import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

const Navbar = () => {
    const { user, setUser, loading } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    if (loading) return null

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout')

            setUser(null)

            toast.success("Logout successfully", {
                position: "bottom-right",
                theme: "dark"
            })

            navigate('/')

        } catch (e) {
            toast.error(
                e.response?.data?.message || "Logout failed",
                {
                    position: "bottom-right",
                    theme: "dark"
                }
            )
        }
    }

    return (
        <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50 shadow-lg">

            <div className="max-w-7xl mx-auto px-6 py-4">

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Logo */}
                    <Link
                        to={user ? "/dashboard" : "/"}
                        className="flex items-center gap-3 group"
                    >
                        <div className="bg-blue-600 p-2 rounded-xl shadow-md group-hover:scale-110 transition-all duration-300">
                            <span className="text-xl">📋</span>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide group-hover:text-blue-400 transition">
                            Task Manager
                        </h1>
                    </Link>

                    <div className="flex items-center gap-3 flex-wrap justify-center">

                        {user ? (
                            <>
                                <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">

                                    <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                                        {user.name
                                            ?.split(" ")
                                            .map(word => word.charAt(0))
                                            .join("")
                                            .toUpperCase()}
                                    </div>

                                    <span className="text-white font-medium">
                                        Hi, {user.name}
                                    </span>
                                </div>

                                <Link
                                    to="/dashboard"
                                    className={`px-5 py-2 rounded-xl text-white shadow transition-all duration-300 hover:scale-105
                                    ${location.pathname === "/dashboard"
                                            ? "bg-blue-700"
                                            : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 hover:scale-105 text-white px-5 py-2 rounded-xl shadow transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`px-5 py-2 rounded-xl text-white shadow transition-all duration-300 hover:scale-105
                                    ${location.pathname === "/login"
                                            ? "bg-green-700"
                                            : "bg-green-600 hover:bg-green-700"
                                        }`}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className={`px-5 py-2 rounded-xl text-white shadow transition-all duration-300 hover:scale-105
                                    ${location.pathname === "/register"
                                            ? "bg-yellow-600"
                                            : "bg-yellow-500 hover:bg-yellow-600"
                                        }`}
                                >
                                    Register
                                </Link>
                            </>
                        )}

                    </div>

                </div>

            </div>

        </nav>
    )
}

export default Navbar