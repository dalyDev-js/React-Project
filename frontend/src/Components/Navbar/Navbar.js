import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { setToken } from "../../Hooks/Redux/Slices/TokenSlice";
import { DarkMode } from "../DarkMode/DarkMode";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { setLanguage } from "../../Hooks/Redux/Slices/LanguageSlice";

function Header() {
  const translate = useSelector((state) => state.language.translation);
  const language = useSelector((state) => state.language.myLang);

  console.log(language);

  function changeToAR() {
    dispatch(setLanguage("ar"));
  }
  function changeToEN() {
    dispatch(setLanguage("en"));
  }

  const [name, setName] = useState("");
  const token = useSelector((state) => state.token.token);
  const [animateFavorites, setAnimateFavorites] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const dispatch = useDispatch();

  const favoritesCount = useSelector((state) => state.wishlist.fav.length);
  const cartCount = useSelector((state) => state.cart.items.length);
  const [searchTerm, setSearchTerm] = useState("");
  const categories = useSelector((state) => state.categories.categories);
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("token", token);

    dispatch(setToken(storedToken));
    if (token) {
      const decoded = jwtDecode(token);
      setName(decoded.name);
    }
  }, [dispatch, token]);
  useEffect(() => {
    if (favoritesCount > 0) {
      setAnimateFavorites(true);
      const timeout = setTimeout(() => setAnimateFavorites(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [favoritesCount]);

  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timeout = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [cartCount]);
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };
  return (
    <div>
      <nav className="fixed- bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 ">
        {" "}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to={"/"}
            className="flex justify-center items-center space-x-3 rtl:space-x-reverse">
            <img
              src="/assets/logo-no-background.png"
              className="h-12"
              alt="Flowbite Logo"
            />
          </NavLink>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown">
            <ul className="flex justify-center items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page">
                  {translate.Home}
                </NavLink>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                  {translate.Categories}
                  {""}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => handleCategoryClick(category)}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  {translate.About}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  {translate.Shop}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="wishlist"
                  className={`flex ${animateFavorites ? "pop-out" : ""}`}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                  </svg>
                  <span className="dark:text-white">{favoritesCount}</span>{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="cart"
                  className={`flex ${animateCart ? "pop-out" : ""}`}>
                  {" "}
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="dark:text-white">{cartCount}</span>
                </NavLink>
              </li>
              <div>
                {language === "ar" ? (
                  <button onClick={() => changeToEN()}>EN</button>
                ) : (
                  <button onClick={() => changeToAR()}>العربية</button>
                )}
              </div>{" "}
              <li>
                {!token ? (
                  <NavLink to="/signin">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        fill-rule="evenodd"
                        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </NavLink>
                ) : (
                  <>
                    <button
                      id="dropdownDividerButton"
                      data-dropdown-toggle="dropdownDivider"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button">
                      {translate.Welcome}, {name}
                      <svg
                        class="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6">
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div
                      id="dropdownDivider"
                      class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                      <ul
                        class="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDividerButton">
                        <li>
                          <Link
                            to="/cart"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            {translate.Cart}
                          </Link>
                        </li>
                      </ul>
                      <div class="py-2">
                        <Link
                          to={"/signout"}
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                          {translate.Signout}
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </li>
              <DarkMode />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
