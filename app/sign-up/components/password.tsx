'use client';


import { useState } from 'react';

interface SignUpPasswordProps {
    onNext: () => void;
}

const SignUpPassword: React.FC<SignUpPasswordProps> = ({ onNext }) => {
    const [password, setPassword] = useState("");

    const handleNext = () => {
        console.log("Password:", password);
        onNext(); 
    }

    return (
        <div className="flex flex-col justify-center h-full items-center">
            <label>
                <span>Password:</span>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default SignUpPassword;
