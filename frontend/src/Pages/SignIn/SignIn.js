import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3001/signin", {
        email,
        password,
      });

      console.log(response.data);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box w-full max-w-2xl bg-white border m-10 p-5 border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
            Sign in to CairoCrafts
          </h1>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={email}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={password}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-black dark:text-gray-300">
                Remember me
              </label>
            </div>
            <Link
              href="#"
              className="ms-auto text-sm text-blue-800 font-bold hover:underline dark:text-blue-500">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {loading ? "Logging in..." : "Login to your account"}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="text-sm font-medium text-black dark:text-gray-300">
            Not registered?{" "}
            <Link
              href="#"
              className="text-blue-800 hover:underline dark:text-blue-500">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
