'use client';

import { useState } from 'react';

interface name {
    onNext: () => void; // 
}

const SignUpName: React.FC<name> = ({ onNext }) => {
    const [name, setName] = useState("");

    const handleNext = () => {
        // Save email in memory or context (for prototype)
        // For now just logging.... :D 
        console.log("Name:", name);
        onNext(); // Call onNext function passed as prop
    }

    return (
        <div className="flex flex-col justify-center h-full items-center">
        <label>
            <span>Name:</span>
            <input name="name" onChange={(e) => setName(e.target.value)} />
        </label>
        <button onClick={handleNext}>Next</button>
    </div>
    );
};

export default SignUpName;
