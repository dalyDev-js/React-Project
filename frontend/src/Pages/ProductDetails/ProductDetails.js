import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../Components/Card/Card'

function ProductDetails() {
    const [singleProduct,setSingleProduct] = useEffect([])
      const params = useParams()
      useEffect(()=>{
        axios.get()
      }, [])

    return (
        <div>
          <Card src = {singleProduct.image}
                
                  
                  
                  />
        </div>
    )
    
}

export default ProductDetails