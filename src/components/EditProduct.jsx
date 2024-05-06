import React, { useState, useEffect } from "react";
import "../stylesheet/EditProductOverlay.css";
import { updateDoc, doc, collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../data/fire.js';

const EditProduct = ({ product, handleCancelEdit }) => {
  const [editedProductData, setEditedProductData] = useState({
    name: product.name,
    price: product.price,
    img: product.img,
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProductData({
      ...editedProductData,
      [name]: value,
    });
  };

  const handleSaveClick = async () => {
    try {
      const productRef = doc(db, 'products', product.id);
      await updateDoc(productRef, editedProductData);
      handleCancelEdit(); // Close the edit overlay
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelClick = () => {
    handleCancelEdit();
  };

  return (
    <div className="editProductContainer">
      <div className="overlay">
        <div className="form-container">
          <form>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedProductData.name || ''}
              onChange={handleInputChange}
            />
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={editedProductData.price ||''}
              onChange={handleInputChange}
            />
            <label>Image URL:</label>
            <input
              name="img"
              value={editedProductData.img || ''}
              onChange={handleInputChange}
            />

            <div className="button-container">
              <button className="save-btn" type="button" onClick={handleSaveClick}>
                Save Changes
              </button>
              <button className="cancel-btn" type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
