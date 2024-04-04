'use client'

import { useState } from 'react';
import { useAuthContext } from "../../src/context/AuthContext";

const LogIn = () => {
    const { login } = useAuthContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = () => {
        return login(username, password)
            .then(() => console.log("You are logged in!"))
            .catch((error) => console.log(error));
    };

    return (
        <div className="flex justify-center h-full">
            <h2>Login</h2>
            <label>
                <span>Username:</span>
                <input name="username" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                <span>Password:</span>
                <input name="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={handleLogIn}>Submit</button>
        </div>
    )
}

export default LogIn;