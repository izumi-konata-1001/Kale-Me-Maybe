import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import ThirdPartyLink from "./thirdparty/ThirdPartyLink";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function Signup(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password !== e.target.value) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password}),
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) { 
                navigate('/log-in'); 
            } else {
                setErrorMessage(data.message || 'An unexpected error occurred.');
            }

        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message || 'An error occurred while trying to sign up.'); 
        }
    };

    return (
    // backgroung image setting
    <div className="singInUp-background relative min-h-screen bg-cover bg-center flex justify-center items-center">
        <div className="absolute inset-0 bg-green-200 opacity-50" style={{ background: 'radial-gradient(closest-side at center, rgba(201, 240, 156, 1), transparent)' }}></div>
        {/* sign up form */}
        <div className="py-2 
        px-12 sm:px-28 md:px-36 xl:px-40 
        max-w-xs sm:max-w-md md:max-w-lg xl:max-w-xl 
        w-full bg-white rounded-lg shadow-2xl z-10 relative">
            <Link to={"/"}><img src="/logo.png" className="max-w-xs absolute left-1/2 top-6 transform -translate-x-1/2 -translate-y-2/3"></img></Link>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <h2 className="text-lg font-bold mb-2 pt-24">Create Your Account</h2>
                <input type="email" placeholder="Email *" className="w-full px-4 py-2 bg-gray-100 border-2 rounded-md mt-4" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password *" className="w-full px-4 py-2 bg-gray-100 border-2 rounded-md mt-2" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm Password *" className="w-full px-4 py-2 bg-gray-100 border-2 rounded-md mt-2" required value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                {passwordError && <p className="text-red-500 text-left self-start w-full px-4">{passwordError}</p>}
                {errorMessage && <p className="text-red-500 text-left self-start w-full px-4">{errorMessage}</p>}
                <button type="submit" className="mt-4 w-full bg-green-dark text-white px-4 py-2 rounded-md">Sign Up</button>
            </form>
            {/* log in link */}
            <p className="py-2 text-sm">Already have an account? <Link to={"/log-in"} className="text-green-dark">Log in</Link></p>
            {/* boundry */}
            <div className="flex items-center justify-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 uppercase text-xs">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* third-party log in */}
            <ThirdPartyLink />
        </div>
    </div>       
    );
}