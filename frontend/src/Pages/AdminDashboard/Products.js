import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "../../Components/Modal/Modal";

const Products = () => {
  const [modal, setModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: "",
    rating: "",
    stock: "",
    discountPercentage: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:3001/products/${editingProduct._id}`,
          form
        );
        setProducts(
          products.map((product) =>
            product._id === editingProduct._id
              ? { ...product, ...form }
              : product
          )
        );
        setEditingProduct(null);
      } else {
        const response = await axios.post(
          "http://localhost:3001/products",
          form
        );
        setProducts([...products, response.data.product]);
      }
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        images: "",
        rating: "",
        stock: "",
        discountPercentage: "",
      });
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error submitting product", error);
    }
  };

  const handleEdit = (product) => {
    console.log(product);
    setEditingProduct(product);
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      images: product.images,
      rating: product.rating,
      stock: product.stock,
      discountPercentage: product.discountPercentage,
    });
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/products/${deletedItem}`);
      setProducts(products.filter((product) => product._id !== deletedItem));
      setModal(false);
      setDeletedItem(null);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const confirmDelete = (productId) => {
    setDeletedItem(productId);
    setModal(true);
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>

      <button
        onClick={toggleFormVisibility}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        {isFormVisible ? "Hide Form" : "Add Product"}
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
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 mb-2 w-full"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="images"
            value={form.images}
            onChange={handleChange}
            placeholder="Images (comma separated)"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="discountPercentage"
            value={form.discountPercentage}
            onChange={handleChange}
            placeholder="Discount Percentage"
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingProduct ? "Update Product" : "Create Product"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to="#" className="flex items-center justify-center">
              <img
                className="rounded-t-lg h-48 w-48 "
                src={product.images[0]}
                alt={product.title}
              />
            </Link>
            <div className="p-5 flex-1">
              <Link to="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.title}
                </h5>
              </Link>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {product.description}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Price: ${product.price}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Category: {product.category}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Rating: {product.rating}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Stock: {product.stock}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Discount: {product.discountPercentage}%
              </p>
            </div>
            <div className="flex justify-center space-x-2 p-4">
              <button
                onClick={() => handleEdit(product._id)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                Edit
              </button>
              <button
                onClick={() => confirmDelete(product._id)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <Modal
          onClose={() => setModal(false)}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this product?"
        />
      )}
    </div>
  );
};

export default Products;
