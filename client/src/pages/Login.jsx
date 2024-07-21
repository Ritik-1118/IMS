import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { login } from "../redux/slice/authSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState({ username: "", password: "" });

    const validate = () => {
        let isValid = true;
        const errors = { username: "", password: "" };

        if (!username) {
            errors.username = "Please enter your username";
            isValid = false;
        }

        if (!password) {
            errors.password = "Please enter your password";
            isValid = false;
        }

        setError(errors);
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const response = await fetch(`https://ims-ameg.onrender.com/api/user/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
                credentials: "include",
            });

            if (response.ok) {
                const userData = await response.json();
                dispatch( login( { user: userData, token: userData.token } ) );
                toast.success("Login Successfully!");
                navigate('/');
                // window.location.reload();
            } else {
                setError({ ...error, password: "Invalid username or password" });
            }
        } catch (err) {
            console.error("Error logging in:", err);
            setError({ ...error, password: "Error logging in. Please try again later." });
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center">
            <div className="flex justify-center">
                <img src="/assets/signup.jpg" alt="" />
            </div>
            <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="./assets/logo.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="username" className="text-lg mb-2">
                                Enter your Username
                            </label><br />
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`p-2 mb-2 border rounded ${error.username ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {error.username && (
                                <span className="text-red-500 mb-2">
                                    {error.username}
                                </span>
                            )}
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="text-lg mb-2">
                                Enter your Password
                            </label>
                            <input
                                type={show ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="abc#@!123..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`p-2 border rounded w-full ${error.password ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {!show ? (
                                <AiOutlineEyeInvisible
                                    className="absolute bottom-3 right-2 cursor-pointer"
                                    size={20}
                                    onClick={() => setShow(true)}
                                />
                            ) : (
                                <AiOutlineEye
                                    className="absolute bottom-3 right-2 cursor-pointer"
                                    size={20}
                                    onClick={() => setShow(false)}
                                />
                            )}
                        </div>
                        {error.password && (
                            <span className="text-red-500 mb-2">
                                {error.password}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link
                                to="/forgot-password"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{" "}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Don&apos;t have an account? Register now
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
