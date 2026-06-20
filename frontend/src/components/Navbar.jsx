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
            <div className="max-w-7xl mx-auto px-4 py-3">

                <div className="flex justify-between items-center">

                    <Link
                        to={user ? "/dashboard" : "/"}
                        className="flex items-center gap-2 group"
                    >
                        <div className="bg-blue-600 p-2 rounded-xl shadow-md">
                            <span className="text-lg">📋</span>
                        </div>

                        <h1 className="text-lg sm:text-2xl font-bold text-white tracking-wide">
                            Task Manager
                        </h1>
                    </Link>

                    <div className="flex items-center gap-2 flex-wrap justify-end">

                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`px-3 sm:px-5 py-2 rounded-xl text-white text-sm sm:text-base shadow transition-all duration-300
                                ${location.pathname === "/dashboard"
                                            ? "bg-blue-700"
                                            : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-5 py-2 rounded-xl text-sm sm:text-base shadow transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`px-3 sm:px-5 py-2 rounded-xl text-white text-sm sm:text-base shadow transition-all duration-300
                                ${location.pathname === "/login"
                                            ? "bg-green-700"
                                            : "bg-green-600 hover:bg-green-700"
                                        }`}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className={`px-3 sm:px-5 py-2 rounded-xl text-white text-sm sm:text-base shadow transition-all duration-300
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