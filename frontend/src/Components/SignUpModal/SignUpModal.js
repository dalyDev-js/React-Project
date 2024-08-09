import React, { useEffect, useState } from "react";

function SignUpModal({ error, onClose }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newMessages = [];
    if (error.name) newMessages.push(error.name);
    if (error.email) newMessages.push(error.email);
    if (error.password) newMessages.push(error.password);
    if (error.repeatPassword) newMessages.push(error.repeatPassword);
    if (error.terms) newMessages.push(error.terms);
    setMessages(newMessages);
  }, [error]);
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
      <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={onClose}>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Please address the following issues:
          </h3>

          <ul className="text-left mb-5 list-disc text-sm text-red-600 dark:text-red-500">
            {messages.map((msg, index) => (
              <li key={index} className="mb-1">
                {msg}
              </li>
            ))}
          </ul>

          <button
            onClick={onClose}
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
