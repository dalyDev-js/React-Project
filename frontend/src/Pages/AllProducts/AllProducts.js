import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Card/Card";
function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        const data = response.data.products;
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <Card product={product} />
      ))}
    </div>
  );
}

export default AllProducts;
