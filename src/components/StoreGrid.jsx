import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../data/fire.js';
import "../stylesheet/StoreGrid.css"

const StoreGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const snapshot = await getDocs(productsCollection);
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className='products-title'>Products</h2>
        <section className='products'>
        {products.map(productsData => (
             <div className='product-card' key={productsData.id}>
                <img className='product-image' src={productsData.img} alt="productimage"/>    
                      <div className='product-info'>
            <h5>{productsData.name}</h5>
            <h6>{productsData.price}</h6>
            <div className='addtocart-btn'>
            <button className='removeOne'>-</button> 
            <div className='amount'>0</div>
            <button className='addOne'>+</button>
            </div>
           
                      </div>

              </div>
         ))}
        </section>
    </div>
  );
};

export default StoreGrid;
