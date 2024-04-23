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
      <h2>Products</h2>
      <ul>
        {products.map(productsData => (
          <li key={productsData.id}>
            <div className='productContainer'>
            <strong>Name:</strong> {productsData.name}
             <strong>Price:</strong> {productsData.price}
              <strong>Image:</strong> <img src={productsData.img} alt="productimage"/>
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreGrid;
