import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc } from 'firebase/firestore/lite';
import { db } from '../data/fire.js';
import "../stylesheet/StoreGrid.css";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import AddProduct from "../components/AddProduct.jsx";
import useStore from "../data/store.js";
import useCartStore from "../data/cartstore.js";
import EditProduct from "../components/EditProduct.jsx";
import DeleteProduct from "../components/DeleteProduct.jsx"; // Import the DeleteProduct component

const StoreGrid = () => {
  const [products, setProducts] = useState([]);
  const [showAdminActions, setShowAdminActions] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProductData, setEditedProductData] = useState({});
  const [deleteProductId, setDeleteProductId] = useState(null); // State to store the ID of the product to be deleted
  
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.id]: true,
    }));


    setTimeout(() => {
      setAddedToCart((prevState) => ({
        ...prevState,
        [product.id]: false,
      }));
    }, 300);
  };

  const { removeProduct } = useStore();
  const { addToCart } = useCartStore(); 

  const handleSaveProduct = async () => {
    try {
      const productRef = doc(db, 'products', editingProduct.id);
      await updateDoc(productRef, editedProductData);
      setEditingProduct(null);
      setShowAddProduct(false);
      setEditedProductData({});
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setShowAddProduct(false);
    setEditedProductData({});
  };

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

  const handleDeleteProduct = async () => {
    try {
      await removeProduct(deleteProductId);
      // Update local state to remove the deleted product
      setProducts(products.filter(product => product.id !== deleteProductId));
      setDeleteProductId(null); // Reset deleteProductId after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowAddProduct(true); 
  };

  const toggleAdminActions = () => {
    setShowAdminActions(prevState => !prevState);
    setShowAddProduct(false); 
  };

  const toggleAddProduct = () => {
    setShowAddProduct(prevState => !prevState);
  };

  return (
    <div>
      <h2 className='products-title'>Products</h2>
      <div className='addProductContainer'>
        <button className='adminLogin' onClick={toggleAdminActions}>
          {showAdminActions ? "Admin Logout" : "Admin Login"}
        </button>
        {showAdminActions && (
          <button className='addProduct' onClick={toggleAddProduct}>
            {showAddProduct ? "Cancel" : "Add product"}
          </button>
        )}
      </div>
      {showAddProduct && <AddProduct />}
      <section className='products'>
        {products.map(product => (
          <div className='product-card' key={product.id}>
            <img className='product-image' src={product.img} alt="productimage"/>    
            <div className='product-info'>
              <h5>{product.name}</h5>
              <h6>${product.price}</h6>
              <div className='addtocart-btn'>
                <button className='addtocart-button' onClick={() => handleAddToCart(product)}>
                  {addedToCart[product.id] ? "+" : "Buy"}
                </button>
                {showAdminActions && (
                  <>
                    <button className='deleteProduct' onClick={() => setDeleteProductId(product.id)}> {/* Set deleteProductId on click */}
                      <FaRegTrashCan />
                    </button>
                    <button className='editProduct' onClick={() => handleEditProduct(product)}>
                      <CiEdit />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          handleCancelEdit={handleCancelEdit}
        />
      )}
      {deleteProductId && ( // Render DeleteProduct component if deleteProductId is set
        <DeleteProduct
          productId={deleteProductId}
          onDeleteSuccess={() => setDeleteProductId(null)} // Reset deleteProductId after deletion
          onCancel={() => setDeleteProductId(null)} // Reset deleteProductId on cancellation
        />
      )}
    </div>
  );
};

export default StoreGrid;
