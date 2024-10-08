import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../Components/Card/Card";
import { Link } from "react-router-dom";
import { removeFromFavorites } from "../../Hooks/Redux/Slices/WishlistSlice";

function Wishlist() {
  const translate = useSelector((state) => state.language.translation);

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.fav);
  console.log(wishlist);

  function handleDelete(product) {
    dispatch(removeFromFavorites(product));
  }

  return (
    <div className="flex justify-center items-center gap-5 flex-wrap min-h-screen">
      {" "}
      {wishlist.map((product) => (
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link className="flex justify-center" to="#">
            <img class="rounded-t-lg h-52" src={product.images} alt="" />
          </Link>
          <div class="p-5">
            <Link to="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.title}
              </h5>
            </Link>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {product.description}
            </p>
            <Link
              to={`/details/${product._id}`}
              class="inline-flex me-7 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {" "}
              {translate.Read}
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
            <button
              onClick={() => handleDelete(product.id)}
              type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Remove from wislist!
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
