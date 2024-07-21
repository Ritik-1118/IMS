import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import UploadImage from "../components/UploadImage";

function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        // imageUrl: "",
    });

    const [show, setShow] = useState(false);
    const [error, setError] = useState({ email: "", password: "", username: "" });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let isValid = true;
        const errors = { email: "", password: "", username: "", };

        if (!form.username) {
            errors.username = "Please enter your username";
            isValid = false;
        }
        if (!form.email) {
            errors.email = "Please enter your email";
            isValid = false;
        }
        if (!form.password) {
            errors.password = "Please enter your password";
            isValid = false;
        }

        setError(errors);
        return isValid;
    };

    const registerUser = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const response = await fetch("https://ims-ameg.onrender.com/api/user/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                const userData = await response.json()
                console.log(userData)
                toast.success("Successfully Registered, Now Login with your details");
                navigate('/login');
            } else {
                const result = await response.json();
                if (result.error) {
                    setError({ ...error, email: result.error });
                } else {
                    setError({ ...error, password: "Registration failed. Please try again." });
                }
            }
        } catch (err) {
            console.error("Error registering:", err);
            setError({ ...error, password: "Error registering. Please try again later." });
        }
    };

    // const uploadImage = async (image) => {
    //     const data = new FormData();
    //     data.append("file", image);
    //     data.append("upload_preset", "inventoryapp");

    //     try {
    //         const res = await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
    //             method: "POST",
    //             body: data,
    //         });
    //         const result = await res.json();
    //         setForm({ ...form, imageUrl: result.url });
    //         toast.success("Image Successfully Uploaded");
    //     } catch (error) {
    //         console.error("Error uploading image:", error);
    //         toast.error("Error uploading image. Please try again.");
    //     }
    // };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center">
            <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="./assets/logo.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Register your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={registerUser}>
                    <div className="flex flex-col gap-4 -space-y-px rounded-md shadow-sm">
                        <div className="flex gap-4">
                            <input
                                name="username"
                                type="text"
                                required
                                className={`relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${error.username ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="username"
                                value={form.username}
                                onChange={handleInputChange}
                            />
                            {error.username && (
                                <span className="text-red-500 mb-2">
                                    {error.username}
                                </span>
                            )}
                        </div>
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={`relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${error.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Email address"
                                value={form.email}
                                onChange={handleInputChange}
                            />
                            {error.email && (
                                <span className="text-red-500 mb-2">
                                    {error.email}
                                </span>
                            )}
                        </div>
                        <div className="relative mb-4">
                            <input
                                id="password"
                                name="password"
                                type={show ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className={`relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${error.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Password"
                                value={form.password}
                                onChange={handleInputChange}
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
                        {/* <UploadImage uploadImage={uploadImage} /> */}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                required
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                I Agree Terms & Conditions
                            </label>
                        </div>

                        <div className="text-sm">
                            <span
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot your password?
                            </span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                {/* <LockClosedIcon
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true"
                                /> */}
                            </span>
                            Sign up
                        </button>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{" "}
                            <span
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Already Have an Account, Please
                                <Link to="/login"> Sign in now </Link>
                            </span>
                        </p>
                    </div>
                </form>
            </div>
            <div className="flex justify-center order-first sm:order-last">
                <img src="./assets/Login.png" alt="Login" />
            </div>
        </div>
    );
}

export default Register;
