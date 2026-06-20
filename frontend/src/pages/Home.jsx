import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="min-h-[calc(100vh-77px)] flex flex-col justify-center items-center bg-slate-950 px-4">

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 text-center">
                Task Management App
            </h1>

            <p className="text-base sm:text-lg text-slate-400 mb-8 text-center max-w-lg">
                Organize, track and manage your tasks efficiently with a modern task management system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

                <Link
                    to="/register"
                    className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
                >
                    Register
                </Link>

                <Link
                    to="/login"
                    className="w-full sm:w-auto text-center bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
                >
                    Login
                </Link>

            </div>

        </div>
    )
}

export default Home