import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      console.log(response.data.users);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editingUser) {
        await axios.put(`http://localhost:3001/users/${editingUser._id}`, form);
        setUsers(
          users.map((user) =>
            user._id === editingUser._id ? { ...user, ...form } : user
          )
        );
        setEditingUser(null);
      } else {
        const response = await axios.post("http://localhost:3001/users", form);
        setUsers([...users, response.data.user]);
      }
      setForm({ name: "", email: "", role: "", password: "" });
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error submitting user", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    });
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      <button
        onClick={toggleFormVisibility}
        className={` text-white px-4 py-2 rounded mb-4 ${
          isFormVisible ? "bg-red-600" : "bg-green-500"
        }`}>
        {isFormVisible ? "Cancel" : "Add User"}
      </button>

      <div
        className={`transition-all duration-500 ease-in-out ${
          isFormVisible
            ? "max-h-screen overflow-visible"
            : "max-h-0 overflow-hidden"
        }`}>
        <div className="mb-6">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingUser ? "Update User" : "Create User"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5 flex-1">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {user.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Email: {user.email}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Role: {user.role}
              </p>
            </div>
            <div className="flex justify-center space-x-2 p-4">
              <button
                onClick={() => handleEdit(user)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
