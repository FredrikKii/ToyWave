import React, { useState, useEffect } from "react";
import "../stylesheet/AddProductOverlay.css";
import useStore from "../data/store.js";
import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../data/fire.js';


const AddProduct = ({ initialProductData, handleCancelEdit }) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    img: "",
  });

  const { addProduct, setProducts } = useStore();

  useEffect(() => {
    if (initialProductData) {
      setNewProduct(initialProductData);
      setShowOverlay(true);
    }
  }, [initialProductData]);

  const handleImageChange = (event) => {
    const imageUrl = event.target.value;
    setNewProduct({ ...newProduct, img: imageUrl });
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddClick = async () => {
    try {
      
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      console.log("Document written with ID: ", docRef.id);
  
  
      addProduct(newProduct);
  
  
      const updatedProductsCollection = collection(db, 'products');
      const updatedSnapshot = await getDocs(updatedProductsCollection);
      const updatedProductsData = updatedSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(updatedProductsData);
  
   
      setShowOverlay(false);
      resetForm();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleCancelClick = () => {
    setShowOverlay(false);
    resetForm();
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      price: 0,
      img: "",
    });
  };

  const handleAddProductButtonClick = () => {
    setShowOverlay(true);
  };

  return (
    <div className="addProductContainer">
      <button className="addProduct" onClick={handleAddProductButtonClick}>Add product</button>
      {showOverlay && (
        <div className="overlay">
          <div className="form-container">
            <form>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
               <label>Image URL:</label>
              <input
                name="img"
                value={newProduct.img}
                onChange={handleImageChange}
              />


              <div className="button-container">
                <button className="addProduct-btn" type="button" onClick={handleAddClick}>
                  {initialProductData ? "Save Changes" : "Add Product"}
                </button>
                <button className="cancel-btn" type="button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
