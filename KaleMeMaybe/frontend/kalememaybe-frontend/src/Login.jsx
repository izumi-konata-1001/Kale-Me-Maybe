import { Link } from "react-router-dom";

export default function Login(){
    return (
    // backgroung image setting
    <div className="singInUp-background relative min-h-screen bg-cover bg-center flex justify-center items-center">
        <div className="absolute inset-0 bg-green-200 opacity-50" style={{ background: 'radial-gradient(closest-side at center, rgba(201, 240, 156, 1), transparent)' }}></div>
        {/* sign up form */}
        <div className="py-2 px-40 max-w-xl w-full bg-white rounded-lg shadow-2xl z-10 relative">
            <Link to={"/"}><img src="/logo.png" className="max-w-xs absolute left-1/2 top-6 transform -translate-x-1/2 -translate-y-2/3"></img></Link>
            <form className="flex flex-col items-center">
                <h2 className="text-lg font-bold mb-2 pt-24">Welcome Back</h2>
                <input type="email" placeholder="Email *" className="w-full px-4 py-2 bg-gray-100 border-2 rounded-md mt-4" required />
                <input type="password" placeholder="Password *" className="w-full px-4 py-2 bg-gray-100 border-2 rounded-md mt-2" required />
                <button type="submit" className="mt-4 w-full bg-green-dark text-white px-4 py-2 rounded-md">Sign Up</button>
            </form>
            {/* log in link */}
            <p className="py-2 text-sm">Don't have an account? <Link to={"/sign-up"} className="text-green-dark">Sign Up</Link></p>
            {/* boundry */}
            <div className="flex items-center justify-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 uppercase text-xs">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* third-party log in */}
            <div className="grid grid-cols-3">
                <img src="/google.png" className="px-6 py-4"></img>
                <img src="/facebook.png" className="px-6 py-4"></img>
                <img src="apple-logo.png" className="px-6 py-4"></img>
            </div>
        </div>
    </div>       
    );
}