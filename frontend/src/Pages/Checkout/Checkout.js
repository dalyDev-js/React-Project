import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItems } from "../../Hooks/Redux/Slices/CartSlice";
import axios from "axios";

function Checkout() {
  const translate = useSelector((state) => state.language.translation);

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
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
  return (
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div class="mx-auto max-w-5xl">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            {translate.payment}
          </h2>

          <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <form
              action="#"
              class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
              <div class="mb-6 grid grid-cols-2 gap-4">
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="full_name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {" "}
                    {translate.fullname} ({translate.asdisplay})*{" "}
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="ABDULRHMAN ELDALY"
                    required
                  />
                </div>

                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="card-number-input"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {" "}
                    {translate.card}*{" "}
                  </label>
                  <input
                    type="text"
                    id="card-number-input"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                    required
                  />
                </div>

                <div>
                  <label
                    for="card-expiration-input"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    {translate.exp}*{" "}
                  </label>
                  <div class="relative">
                    <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                      <svg
                        class="h-4 w-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          fill-rule="evenodd"
                          d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      datepicker
                      datepicker-format="mm/yy"
                      id="card-expiration-input"
                      type="text"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="12/23"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="cvv-input"
                    class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                    CVV*
                    <button
                      data-tooltip-target="cvv-desc"
                      data-tooltip-trigger="hover"
                      class="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                      <svg
                        class="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          fill-rule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="cvv-desc"
                      role="tooltip"
                      class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                      {translate.cardBack}
                      <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </label>
                  <input
                    type="number"
                    id="cvv-input"
                    aria-describedby="helper-text-explanation"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="•••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                class="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {translate.Paynow}
              </button>
            </form>

            <div class="mt-6 grow sm:mt-8 lg:mt-0">
              <div class="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
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
                    <dd class="text-base font-medium text-green-500">
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

              <div class="mt-6 flex items-center justify-center gap-8">
                <img
                  class="h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                  alt=""
                />
                <img
                  class="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                  alt=""
                />
                <img
                  class="h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                  alt=""
                />
                <img
                  class="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                  alt=""
                />
                <img
                  class="h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                  alt=""
                />
                <img
                  class="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                  alt=""
                />
              </div>
            </div>
          </div>

          <p class="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
            {translate.payproceed}{" "}
            <Link
              to="#"
              title=""
              class="font-medium text-blue-700 underline hover:no-underline dark:text-blue-500"></Link>{" "}
            <Link
              to="#"
              title=""
              class="font-medium text-blue-700 underline hover:no-underline dark:text-blue-500"></Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
