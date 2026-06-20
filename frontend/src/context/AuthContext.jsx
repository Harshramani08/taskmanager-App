import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkUser = async () => {
        try {
            const response = await api.get('/auth/me');

            setUser(response.data.user);

        } catch (e) {
            setUser(null);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                checkUser,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;