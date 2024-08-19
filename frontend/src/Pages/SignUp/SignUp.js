import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validateForm } from "../../utils/ValidateField";
import axios from "axios";
import { useSelector } from "react-redux";

function SignUp() {
  const translate = useSelector((state) => state.language.translation);

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    termsAccepted: false,
  });
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const updatedValue = name === "termsAccepted" ? checked : value;

    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: updatedValue };

      const errors = validateForm(name, updatedValue, newFormData);
      setError((prevErrors) => ({
        ...prevErrors,
        ...errors,
      }));
      return newFormData;
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameErrors = validateForm("name", formData.name, formData);
    const emailErrors = validateForm("email", formData.email, formData);
    const passwordErrors = validateForm(
      "password",
      formData.password,
      formData
    );
    const repeatPasswordErrors = validateForm(
      "repeatPassword",
      formData.repeatPassword,
      formData
    );
    const termsErrors = validateForm(
      "termsAccepted",
      formData.termsAccepted,
      formData
    );
    const allErrors = {
      ...nameErrors,
      ...emailErrors,
      ...passwordErrors,
      ...repeatPasswordErrors,
      ...termsErrors,
    };
    const hasErrors = Object.values(allErrors).some((error) => error !== "");

    if (hasErrors) {
      setError(allErrors);
      console.log(allErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/signup",
        formData
      );
      console.log("Signup successful:", response.data);
      setBanner(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
        termsAccepted: false,
      });
      setError({});
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setError({ email: error.response.data.message });
      } else {
        setError({ general: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container flex flex-col">
      {banner && (
        <div
          class="p-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert">
          <span class="font-medium">Success!</span> Please go to your email and
          verify your account.
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        class="signin-box  w-full max-w-xl p-4 bg-white border m-10  border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h1 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
          {translate.h1signup}
        </h1>
        {error.general && (
          <div className="mb-4 text-red-600 text-center">{error.general}</div>
        )}
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {translate.YourName}
          </label>
          <input
            value={formData.name}
            onChange={handleChange}
            name="name"
            type="text"
            id="name"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          {!error.name && formData.name ? (
            <p class="mt-2 text-sm text-green-600 dark:text-green-500">
              <span class="font-medium">✅</span> Name available!
            </p>
          ) : (
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {error.name}
            </p>
          )}
        </div>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {translate.Email}
          </label>
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          {!error.email && formData.email ? (
            <p class="mt-2 text-sm text-green-600 dark:text-green-500">
              <span class="font-medium">✅</span> Email is valid
            </p>
          ) : (
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {error.email}
            </p>
          )}
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {translate.Password}
          </label>
          <input
            type="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            id="password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          <p
            className={`mt-2 text-sm ${
              !error.password && formData.password
                ? "text-green-600 dark:text-green-500"
                : "text-red-600 dark:text-red-500"
            }`}>
            {error.password
              ? error.password
              : !error.password && formData.password
              ? "✅ Password is valid"
              : ""}
          </p>
        </div>
        <div class="mb-5">
          <label
            for="repeat-password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {translate.Repeat}
          </label>
          <input
            type="password"
            id="repeat-password"
            onChange={handleChange}
            name="repeatPassword"
            value={formData.repeatPassword}
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          {!error.repeatPassword && formData.repeatPassword ? (
            <p class="mt-2 text-sm text-green-600 dark:text-green-500">
              <span class="font-medium">✅</span> Password is matched
            </p>
          ) : (
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {error.repeatPassword}
            </p>
          )}
        </div>
        <div class="flex items-start mb-2 ">
          <div class="flex items-center h-5">
            <input
              id="terms-accepted"
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>

          <label
            for="terms"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            I agree with the{" "}
            <Link
              to="/terms"
              class="text-blue-600 hover:underline dark:text-blue-500">
              {translate.Terms}
            </Link>
          </label>
        </div>
        <div>
          {error.terms && (
            <p className="ml-2 mb-3 text-sm text-red-600 dark:text-red-500">
              {error.terms}
            </p>
          )}
        </div>
        <div className="flex justify-center items-center ">
          <button
            disabled={loading}
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              loading ? "inline-flex items-center" : ""
            }`}>
            {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Register new account"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
