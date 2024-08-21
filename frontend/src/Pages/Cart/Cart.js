import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getCartItems,
  removeFromCart,
  updateCartItem,
} from "../../Hooks/Redux/Slices/CartSlice";
import { Link } from "react-router-dom";
import Modal from "../../Components/Modal/Modal";

function Cart() {
  const translate = useSelector((state) => state.language.translation);
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [modal, setModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);
  console.log(cartItems);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/cart/", {
          headers: {
            token: token,
          },
        });

        const products = response.data.cart.products;
        console.log(response.data);

        dispatch(getCartItems(products));
      } catch (error) {
        console.error("Failed to fetch cart items:", error.message);
      }
    };

    if (token) {
      fetchCartItems();
    }
  }, [dispatch, token]);

  const handleQuantityChange = async (itemId, change) => {
    try {
      const item = cartItems.find((item) => item._id === itemId);
      if (!item) return;

      const newQuantity = item.quantity + change;
      if (newQuantity < 0) return;

      await axios.put(
        `http://localhost:3001/cart/${itemId}`,

        { itemId: itemId, quantity: newQuantity },
        {
          headers: {
            token: token,
          },
        }
      );
      dispatch(updateCartItem({ itemId, quantity: newQuantity }));
    } catch (error) {
      console.error("Failed to update quantity:", error.message);
    }
  };
  const handleDeleteCartItem = async () => {
    if (!deletedItem) return;

    try {
      await axios.delete(`http://localhost:3001/cart/${deletedItem}`, {
        headers: { token },
      });
      dispatch(removeFromCart(deletedItem));
      setModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const calculateTotalSavings = () => {
    return cartItems.reduce((totalSavings, item) => {
      if (item.discountPercentage) {
        const originalPrice = item.price / (1 - item.discountPercentage / 100);
        const savingsPerItem = (originalPrice - item.price) * item.quantity;
        return totalSavings + savingsPerItem;
      }
      return totalSavings;
    }, 0);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  const totalPrice = calculateTotalPrice();
  const totalSavings = calculateTotalSavings();
  console.log(totalSavings);

  const confirmDelete = (productId) => {
    setDeletedItem(productId);
    setModal(true);
  };
  return (
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          {translate.Cart}
        </h2>

        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div class="space-y-6">
              {cartItems.length > 0 &&
                cartItems.map((item) => (
                  /* card */

                  <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <Link to="#" class="shrink-0 md:order-1">
                        <img
                          class="h-20 w-20 dark:hidden"
                          src={item.images}
                          alt="imac  "
                        />
                      </Link>

                      <label for="counter-input" class="sr-only">
                        {translate.Quantity}
                      </label>
                      <div class="flex items-center justify-between md:order-3 md:justify-end">
                        <div class="flex items-center">
                          <button
                            type="button"
                            id="decrement-button"
                            onClick={() => handleQuantityChange(item._id, -1)}
                            data-input-counter-decrement="counter-input"
                            class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg
                              class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2">
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <input
                            type="text"
                            id="counter-input"
                            data-input-counter
                            class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                            placeholder=""
                            value={item.quantity}
                            required
                          />
                          <button
                            type="button"
                            id="increment-button"
                            onClick={() => handleQuantityChange(item._id, 1)}
                            data-input-counter-increment="counter-input"
                            class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg
                              class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18">
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                        <div class="text-end md:order-4 md:w-32">
                          <p class="text-base font-bold text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <Link
                          to="#"
                          class="text-base font-medium text-gray-900 hover:underline dark:text-white">
                          {item.title}
                        </Link>

                        <div class="flex items-center gap-4">
                          <button
                            type="button"
                            class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                            <svg
                              class="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24">
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                              />
                            </svg>
                            {translate.Favorite}
                          </button>

                          {/* onClick={() => handleDeleteCartItem(item)} */}
                          <button
                            onClick={() => confirmDelete(item._id)}
                            type="button"
                            class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                            <svg
                              class="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24">
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            {translate.Remove}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {!cartItems.length > 0 && <h1>No items added .</h1>}
          </div>

          <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p class="text-xl font-semibold text-gray-900 dark:text-white">
                {translate.Summary}
              </p>

              <div class="space-y-4">
                <div class="space-y-2">
                  <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                      {translate.Oprice}
                    </dt>
                    <dd class="text-base font-medium text-gray-900 dark:text-white">
                      ${(totalPrice + totalSavings).toFixed(2)}
                    </dd>
                  </dl>

                  <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                      {translate.Savings}
                    </dt>
                    <dd class="text-base font-medium text-green-600">
                      -${totalSavings.toFixed(2)}
                    </dd>
                  </dl>
                </div>

                <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt class="text-base font-bold text-gray-900 dark:text-white">
                    {translate.Total}
                  </dt>
                  <dd class="text-base font-bold text-gray-900 dark:text-white">
                    ${totalPrice.toFixed(2)}
                  </dd>
                </dl>
              </div>

              <Link
                to="/checkout"
                class="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {translate.Checkout}
              </Link>

              <div class="flex items-center justify-center gap-2">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {" "}
                  {translate.or}{" "}
                </span>
                <Link
                  to="/products"
                  title=""
                  class="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline dark:text-blue-500">
                  {translate.Continue}
                  <svg
                    class="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form class="space-y-4">
                <div>
                  <label
                    for="voucher"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {" "}
                    {translate.Voucher}{" "}
                  </label>
                  <input
                    type="text"
                    id="voucher"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder=""
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {translate.code}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          onClose={() => setModal(false)}
          onConfirm={handleDeleteCartItem}
          message="Are you sure you want to delete this item from your cart?"
        />
      )}
    </section>
  );
}

export default Cart;
