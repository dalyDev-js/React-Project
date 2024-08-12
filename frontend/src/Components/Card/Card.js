import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Hooks/Redux/Slices/CartSlice";
import axios from "axios";
import { addToFavorites, removeFromFavorites } from "../../Hooks/Redux/Slices/WishlistSlice";

function Card({ product }) {
  const wishlist = useSelector(state=>state.wishlist.fav)
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedToFavorites, setAddedToFavorites] = useState(wishlist.some((item) => item.id === product.id));
  
  
  
useEffect(() => {
    setAddedToFavorites(wishlist.some((item) => item.id === product.id));
  }, [wishlist, product.id]);

  function handleFav() {
    if (addedToFavorites) {
      dispatch(removeFromFavorites(product));
    } else {
      dispatch(addToFavorites(product));
    }
    setAddedToFavorites(!addedToFavorites);
  }
  




  const handleAddCart = async () => {
    const token = localStorage.getItem("token");
    const totalPrice = product.price * 1;

    const newProduct = {
      title: product.title,
      product: product._id,
      quantity: 1,
      images: product.images,
      price: product.price,
      totalPrice: totalPrice,
      discountPercentage: product.discountPercentage,
    };
    console.log(newProduct, "newProduct");
    if (token) {
      try {
        await axios.post("http://localhost:3001/cart/", newProduct, {
          headers: {
            token: token,
          },
        });

        dispatch(addToCart(newProduct));

        setAdded(true);
        console.log("Product added to cart and server updated.");
      } catch (error) {
        console.error("Failed to add product to cart:", error);
      }
    } else {
      console.log("please log in first");
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-56 w-full">
        <Link to="#">
          <img
            className="mx-auto h-full dark:hidden"
            src={product.images[0]}
            alt={product.title}
          />
        </Link>
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="me-2 rounded bg-blue-400 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
            Up to {product.discountPercentage}% off
          </span>

          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              data-tooltip-target="tooltip-quick-look"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Quick look</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
            <div
              id="tooltip-quick-look"
              role="tooltip"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              data-popper-placement="top">
              Quick look
              <div className="tooltip-arrow" data-popper-arrow=""></div>
            </div>

            <button
              type="button"
              data-tooltip-target="tooltip-add-to-favorites"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Add to Favorites</span>
              <svg
              onClick={()=>handleFav()}
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill={addedToFavorites ? 'red' : 'none'}
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>
            </button>
            <div
              id="tooltip-add-to-favorites"
              role="tooltip"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              data-popper-placement="top">
              Add to favorites
              <div className="tooltip-arrow" data-popper-arrow=""></div>
            </div>
          </div>
        </div>

        <Link
          to="#"
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
          {product.title}
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {/* Add SVG icons */}
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>
            ))}
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {product.rating}
          </p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            (455)
          </p>
        </div>

        <ul className="mt-2 flex items-center gap-4">
          <li className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fast Delivery
            </p>
          </li>

          <li className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              2-year warranty
            </p>
          </li>
        </ul>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </p>

          <button
            onClick={handleAddCart}
            disabled={added}
            className={`rounded-lg py-2 px-4 text-white ${
              added ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}>
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
