import React, { FormEvent } from "react";
import Loader from "../components/Loader";
import Apiconfig from "../util/Apiconfig";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            email,
            password,
        };

        try {
            const response = await fetch(Apiconfig.login, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem("token", data.token);
                navigate("/chat"); // Redirect immediately after setting the token
                console.log(data);
                setEmail("");
                setPassword("");
                console.log(isUser);
            } else {
                console.error("Server response not OK:", response.status, response.statusText);
                const errorData = await response.json();
                console.error("Error details:", errorData);
            }

        } catch (error) {
            console.error("An error message", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full h-[90dvh]">
                <form
                    onSubmit={handleLogin}
                    action=""
                    className="flex flex-col justify-center items-center w-[90%] md:w-2/5 h-[50dvh] border gap-y-4 p-4 rounded-md shadow-md"
                >
                    <h1 className="text-3xl font-medium my-2">Login</h1>
                    <div className="flex items-center input input-bordered w-[90%]">
                        <input
                            type="email"
                            value={email}
                            placeholder="Email"
                            className="outline-none w-full max-w-md"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center w-[90%] input input-bordered">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            placeholder="Password"
                            className="w-full outline-none max-w-full"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPassword ? (
                            <i className="fa-solid fa-eye" onClick={handleShowPassword}></i>
                        ) : (
                            <i
                                className="fa-solid fa-eye-slash"
                                onClick={handleShowPassword}
                            ></i>
                        )}
                    </div>

                    <div className="w-[90%] flex justify-center items-center input input-bordered bg-accent-content text-white">
                        <input type="submit" value="Login" className=" w-full  max-w-md" />
                    </div>
                    <Link
                        to="/register"
                        className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-2 transition-all duration-300"
                    >
                        create new account
                    </Link>
                </form>
                {email}
                <br />
                {password}
            </div>
        </>
    );
};

export default Login;