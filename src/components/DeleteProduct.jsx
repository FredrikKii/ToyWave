import React from "react";
import { deleteDoc, doc } from 'firebase/firestore/lite';
import { db } from '../data/fire.js';

const DeleteProduct = ({ productId, onDeleteSuccess, onCancel }) => {
  const handleDeleteClick = async () => {
    try {
      const productRef = doc(db, 'products', productId);
      await deleteDoc(productRef);
      onDeleteSuccess(); // Notify parent component of successful deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCancelClick = () => {
    onCancel(); // Notify parent component of cancellation
  };

  return (
    <div className="deleteProductContainer">
      <div className="overlay">
        <div className="form-container">
          <p>Are you sure you want to delete this product?</p>
          <div className="button-container">
            <button className="delete-btn" type="button" onClick={handleDeleteClick}>
              Delete Product
            </button>
            <button className="cancel-btn" type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
