import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card';

function TopRated() {
    const [products , setProducts] = useState([])
    const getProducts = async () => {
        try {
          const response = await axios.get("http://localhost:3001/products");
          const data = response.data.products;
         setProducts(data.filter(prod => {return prod.rating >= 4.81 && prod.rating != 4.83}))
          console.log(products)
          // console.log(products)
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => { 
        getProducts()
      },[])
  return (
    <>
    <div className="flex justify-center items-center flex-wrap gap-20">
    {products.map((prod) => 
       <Card key={prod.id} product={prod}/> )}
    </div>
      
    </>
  
  )
}

export default TopRated;