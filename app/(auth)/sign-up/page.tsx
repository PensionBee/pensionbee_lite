'use client';

import { useState } from 'react';
import SignUpName from './components/name';
import SignUpEmail from './components/email';
import SignUpPassword from './components/password';
import SignUpMobile from './components/mobile';
import SignUpSuccess from './components/success';

const SignUpPage: React.FC = () => {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    }

    const handleBack = () => {
        setStep(step - 1);
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <SignUpName onNext={handleNext} />;
            case 2:
                return <SignUpEmail onNext={handleNext} />;
            case 3:
                return <SignUpPassword onNext={handleNext} />;
            case 4:
                return <SignUpMobile onNext={handleNext} />;
            case 5:
                return <SignUpSuccess />;
            default:
                return null;
        }
    }

    return (
        <div className='flex justify-center h-full'>
            {step > 1 && <button onClick={handleBack}>Back</button>}
            {renderStep()}
        </div>
    );
};

export default SignUpPage;






// 'use client'

// import { useState } from 'react';
// import { useAuthContext } from "../../src/context/AuthContext";

// const SignUp = () => {
//     const { signUp } = useAuthContext();
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSignUp = () => {
//         return signUp(username, password)
//             .then(() => console.log("You have signed up!"))
//             .catch((error) => console.log(error));
//     }

//     return (
//         <div className="flex flex-col justify-center h-full items-center">
//             <h2>Sign Up</h2>
//             <label>
//                 <span>Username:</span>
//                 <input name="username" onChange={(e) => setUsername(e.target.value)} />
//             </label>
//             <label>
//                 <span>Password:</span>
//                 <input name="password" onChange={(e) => setPassword(e.target.value) }/>
//             </label>
//             <button onClick={handleSignUp}>Submit</button>
//         </div>
//     );
// };

// export default SignUp;