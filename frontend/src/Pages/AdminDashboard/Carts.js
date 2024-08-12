// Carts.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Carts = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = await axios.get("/api/cart");
      setCarts(response.data.cart);
    } catch (error) {
      console.error("Error fetching carts", error);
    }
  };

  const handleDelete = async (cartId) => {
    try {
      await axios.delete(`/api/cart/${cartId}`);
      setCarts(carts.filter((cart) => cart._id !== cartId));
    } catch (error) {
      console.error("Error deleting cart", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Carts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carts.map((cart) => (
          <div key={cart._id} className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">Cart ID: {cart._id}</h3>
            <p>User ID: {cart.userId}</p>
            <div>
              {cart.products.map((product) => (
                <div key={product._id}>
                  {product.title} (Qty: {product.quantity})
                </div>
              ))}
            </div>
            <button
              onClick={() => handleDelete(cart._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carts;
