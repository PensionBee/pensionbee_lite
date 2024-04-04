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
        <div className="flex flex-col">
            <h2>Sign Up</h2>
            <label>
                <span>Username:</span>
                <input name="username" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                <span>Password:</span>
                <input name="password" onChange={(e) => setPassword(e.target.value) }/>
            </label>
            <button onClick={handleSignUp}>Submit</button>
        </div>
    );
};

export default SignUp;