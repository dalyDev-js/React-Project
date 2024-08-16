import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  sortProductsByRating,
  sortProductsByDiscount,
  sortProductsByPriceHL,
  sortProductsByPriceLH,
  sortDefault,
  filterCategory,
} from "../../utils/sortingAndFilter";
import { setCategory } from "../../Hooks/Redux/Slices/Category";

function ProductsHeader({ products, onSort, onFilter }) {
  const [sortDropDown, setSortDropDown] = useState(false);
  const [filterDropDown, setFilterDropDown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category") || "All Products";
    setSelectedCategory(category);
    onFilter(
      category === "All Products"
        ? products
        : products.filter((p) => p.category === category)
    );
  }, [location.search, products, onFilter]);
  // Handle Sorting
  const handleSort = (sortFunction) => {
    const sortedProducts = sortFunction(products);
    onSort(sortedProducts);
    setSortDropDown(false);
  };

  // Handle Filtering
  const handleFilter = (category) => {
    const filteredProducts = filterCategory(products, category);
    onFilter(filteredProducts);
    setSelectedCategory(category);
    dispatch(setCategory(category));
    setFilterDropDown(false);
  };

  const toggleSortDropDown = () => {
    setSortDropDown(!sortDropDown);
    setFilterDropDown(false);
  };

  const toggleFilterDropDown = () => {
    setFilterDropDown(!filterDropDown);
    setSortDropDown(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onFilter(filteredProducts);
  };
  return (
    <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
      <div>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                <svg
                  className="me-2.5 h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </Link>
            </li>

            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400 rtl:rotate-180"
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
                    d="m9 5 7 7-7 7"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                  {selectedCategory}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          {selectedCategory}
        </h2>
      </div>

      <form class="sm:w-52 lg:w-96 md:w-52 mx-auto" onSubmit={handleSearch}>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search products..."
          />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
          </button>
        </div>
      </form>

      <div className="relative flex items-center space-x-4">
        <button
          onClick={() => toggleFilterDropDown()}
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
          <svg
            className="-ms-0.5 me-2 h-4 w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.635.122-1.659-.753-1.659Z"
            />
          </svg>
          {selectedCategory}
          <svg
            className="ms-2 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {filterDropDown && (
          <div className="absolute right-0 top-8 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-white">
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <button
                  onClick={() => handleFilter("All Products")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                  All Products
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleFilter(category)}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => toggleSortDropDown()}
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
          Sort by
          <svg
            className="ms-2 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {sortDropDown && (
          <div className="absolute left-32 top-8 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-white">
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <button
                  onClick={() => handleSort(sortDefault)}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                  Default
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSort(sortProductsByPriceLH)}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                  Price (Low to High)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSort(sortProductsByPriceHL)}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                  Price (High to Low)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSort(sortProductsByRating)}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                  Rating
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSort(sortProductsByDiscount)}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                  Discount
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsHeader;
