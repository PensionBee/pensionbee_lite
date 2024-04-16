'use client'

import { useState } from 'react';
import { useAuthContext } from "../../src/context/AuthContext";

const SignUp = () => {
    const { signUp } = useAuthContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        return signUp(username, password)
            .then(() => console.log("You have signed up!"))
            .catch((error) => console.log(error));
    }

    return (
        <div className="flex flex-col items-center">
            <div className="mb-2">
                <h2>Sign Up</h2>
            </div>
            <div className="mb-2">
                <label>
                    <span>Username:</span>
                    <input
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        type="email"
                        required
                        value={username}
                        placeholder="Username"
                    />
                </label>
            </div>
            <div className="mb-2">
                <label>
                    <span>Password:</span>
                    <input
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                        value={password}
                        placeholder="Password"
                    />
                </label>
            </div>
            <button onClick={handleSignUp}>Submit</button>
        </div>
    );
};

export default SignUp;