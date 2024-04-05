'use client';

import { useState } from 'react';

interface email {
    onNext: () => void; // 
}

const SignUpEmail: React.FC<email> = ({ onNext }) => {
    const [email, setEmail] = useState("");

    const handleNext = () => {
        console.log("Email:", email);
        onNext();
    }

    return (
        <div className="flex flex-col justify-center h-full items-center">
            <h2>Sign Up</h2>
            <label>
                <span>Email:</span>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default SignUpEmail;
