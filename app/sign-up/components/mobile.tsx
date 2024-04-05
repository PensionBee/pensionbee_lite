'use client';

import { useState } from 'react';

interface SignUpMobileProps {
    onNext: () => void;
}

const SignUpMobile: React.FC<SignUpMobileProps> = ({ onNext }) => {
    const [mobile, setMobile] = useState("");

    const handleNext = () => {
        console.log("Mobile Number:", mobile);
        onNext();
    }

    return (
        <div className="flex flex-col justify-center h-full items-center">
           
            <label>
                <span>Mobile Number:</span>
                <input type="tel" onChange={(e) => setMobile(e.target.value)} />
            </label>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default SignUpMobile;
