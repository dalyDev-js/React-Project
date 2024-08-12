// Users.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
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
        await axios.put(`/api/users/${editingUser._id}`, form);
        setUsers(
          users.map((user) =>
            user._id === editingUser._id ? { ...user, ...form } : user
          )
        );
        setEditingUser(null);
      } else {
        const response = await axios.post("/api/users", form);
        setUsers([...users, response.data]);
      }
      setForm({ name: "", email: "", role: "" });
    } catch (error) {
      console.error("Error submitting user", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>

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
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingUser ? "Update User" : "Create User"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button
              onClick={() => handleEdit(user)}
              className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 mr-2">
              Edit
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
