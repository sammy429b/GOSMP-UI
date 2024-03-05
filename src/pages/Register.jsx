import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register= () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    e.preventDefault();
    const formData = {
      username: username,
      email: email,
      password: password,
    };
    if (password !== confirmpassword) {
      toast("Password do not match ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (email === "" || password === "") {
      toast("Enter details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
        // Redirect or handle success as needed
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full h-[90dvh] flex flex-col items-center justify-center ">
        <form
          onSubmit={handleRegister}
          className="flex flex-col justify-center items-center gap-y-4 rounded-md shadow-lg border w-[90%] md:w-2/5 h-[26rem]"
        >
          <h1 className="text-3xl font-medium my-2">Register</h1>
          <input
            type="text"
            className="input input-bordered w-full max-w-md"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            className="input input-bordered w-full max-w-md"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            className="input input-bordered w-full max-w-md"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="password"
            className="input input-bordered w-full max-w-md"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <input
            type="submit"
            className="btn btn-active btn-neutral w-full max-w-md"
            value="Sign up"
          />
          <a href="/login" className="text-blue-600 my-2">
            login Instead?
          </a>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;