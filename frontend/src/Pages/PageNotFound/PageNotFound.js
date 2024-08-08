import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Error{" "}
        <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
          404
        </mark>{" "}
        Page Not Found
      </h1>
      <p className="text-lg font-normal text-center text-gray-500 lg:text-xl dark:text-gray-400">
        It seems that the page you're looking for doesn't exist. Please check
        the URL or try a different one.
        <br />
        <br />
        If you believe this to be an error, please contact support.{" "}
        <Link to="/" className="text-blue-600 dark:text-blue-500">
          Contact Support
        </Link>{" "}
        for further assistance. <br />
        <br />
        Return to the{" "}
        <Link to="/" className="text-blue-600 dark:text-blue-500">
          Homepage
        </Link>{" "}
        for Link fresh start. <br />
        <br />
      </p>
    </div>
  );
}

export default PageNotFound;
