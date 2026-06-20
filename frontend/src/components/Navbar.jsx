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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">

                    <Link
                        to={user ? "/dashboard" : "/"}
                        className="flex items-center justify-center sm:justify-start gap-2"
                    >
                        <div className="bg-blue-600 p-2 rounded-xl shadow-md">
                            <span className="text-lg">📋</span>
                        </div>

                        <h1 className="text-xl sm:text-2xl font-bold text-white">
                            Task Manager
                        </h1>
                    </Link>

                    <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">

                        {user ? (
                            <>
                                <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-full border border-slate-700">

                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                        {user.name
                                            ?.split(" ")
                                            .map(word => word.charAt(0))
                                            .join("")
                                            .toUpperCase()}
                                    </div>

                                    <span className="text-white text-sm font-medium">
                                        Hi, {user.name}
                                    </span>

                                </div>

                                <Link
                                    to="/dashboard"
                                    className={`px-4 py-2 rounded-lg text-white text-sm transition
                                ${location.pathname === "/dashboard"
                                            ? "bg-blue-700"
                                            : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`px-4 py-2 rounded-lg text-white text-sm transition
                                ${location.pathname === "/login"
                                            ? "bg-green-700"
                                            : "bg-green-600 hover:bg-green-700"
                                        }`}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className={`px-4 py-2 rounded-lg text-white text-sm transition
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