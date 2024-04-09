import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from 'react';
import '../../services/firebase';

type DefaultAuthState = {
    currentUser: User | null,
    signUp: typeof signUp,
    login: typeof login,
    logout: typeof logout,
    resetPassword: typeof resetPassword
}

type AuthProviderProps = {
    children: React.ReactNode
}

const auth = getAuth();

const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

const logout = () => signOut(auth);

const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

const AuthContext = createContext<DefaultAuthState>({
    signUp,
    login,
    logout,
    resetPassword,
    currentUser: null,
})

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setIsLoading(false)
        })
        return () => unsubscribeAuth()
    }, [])

    const value = {
        signUp,
        login,
        logout,
        resetPassword,
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {isLoading && "Loading..."}
            {currentUser && JSON.stringify(currentUser)}
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider