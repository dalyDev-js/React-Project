import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Card/Card";
import ProductsHeader from "../../Components/ProductsHeader/ProductsHeader";
import { useSelector } from "react-redux";

function AllProducts() {
  const translate = useSelector((state) => state.language.translation);

  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [visibleAmount, setVisibleAmount] = useState(20);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      const data = response.data.products;
      setProducts(data);
      setFilteredProducts(data);
      setVisibleProducts(data.slice(0, visibleAmount));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setVisibleProducts(filteredProducts.slice(0, visibleAmount));
  }, [filteredProducts, visibleAmount]);

  const showMoreProducts = () => {
    setVisibleAmount((prevCount) => prevCount + 10);
  };

  const handleSort = (sortedProducts) => {
    setFilteredProducts(sortedProducts);
  };

  const handleFilter = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mb-4 mx-auto max-w-screen-xl px-4 2xl:px-0">
        <ProductsHeader
          products={products}
          onSort={handleSort}
          dropdownOpen={dropdownOpen}
          onFilter={handleFilter}
        />
        <div className="flex justify-center items-center flex-wrap gap-20">
          {visibleProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        <div className="w-full text-center mt-14">
          {visibleAmount < filteredProducts.length && (
            <button
              type="button"
              onClick={showMoreProducts}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
              {translate.Show}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllProducts;
