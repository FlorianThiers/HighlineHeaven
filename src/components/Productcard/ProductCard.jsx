import React, { useState, useEffect } from "react";
import style from "./ProductCard.module.css";
import { useProducts } from "../../Contexts/ProductContext";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/Routes";
import pb from "../../services/PocketbaseService";

const ProductCard = ({ product }) => {
  const { user } = useProducts();
  const { productService } = useProducts();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [productState, setProductState] = useState({
    saved: product.saved,
  });

  const deleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      setPopupMessage('Product deleted successfully!');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };
  
  const addToCart = (product) => {
    // Get the current cart from session storage
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  
    // Add the new product to the cart
    cart.push({ ...product, quantity: 1});
  
    // Save the updated cart back to session storage
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleSaveClick = async () => {
    try {
      await productService.updateProduct({...product, saved: true });
      
      // Update the local state
      setProductState(prevState => ({ ...prevState, saved: true }));

      // Show a success message
      setPopupMessage('Product saved successfully!');
      setShowPopup(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleUnsaveClick = async () => {
    try {
      await productService.updateProduct({...product, saved: false });
      
      // Update the local state
      setProductState(prevState => ({ ...prevState, saved: false }));

      
      // Show a success message
      setPopupMessage('Product unsaved successfully!');
      setShowPopup(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to unsave product:', error);
    }
  };

  // useEffect(() => {
  //   setProductState({
  //     saved: product.saved,
  //   });
  // }, [product]);


  
  if (user.id === product.userID) {
    return ( 
    <div className={style.productCard}>
      {showPopup && <div className={style.popup}>{popupMessage}</div>}
      <div className={style.top}>
        <h2>{product.title}</h2>
        <img src={pb.files.getUrl(product, product.image[0])} alt={product.image} />
      </div>
      <div className={style.bottum}>
        <p>{product.price} Euro</p>
        <div className={style.buttons}>
          <Link to={`${ROUTES.detail.to}${product.id}`}>
            <button className={style.seeMore}>See more</button>
          </Link>
        </div>
          <div className={style.detail}>
            <Link to={`${ROUTES.myProducts}`}>
              <button className={style.delete} onClick={() => deleteProduct(product.id)}>
                Delete
              </button>
            </Link>
          </div>
      </div>
    </div>
  );
 } else 
  return (
    <div className={style.productCard}>
          {showPopup && <div className={style.popup}>{popupMessage}</div>}
      <div className={style.top}>
        <h2>{product.title}</h2>
        <img src={pb.files.getUrl(product, product.image[0])} alt={product.image} />
      </div>
      <div className={style.bottum}>
        <p>{product.price} Euro</p>
        <div className={style.buttons}>
          <Link to={`${ROUTES.detail.to}${product.id}`}>
            <button className={style.seeMore}>See more</button>
          </Link>
          
        </div>
        <div className={style.detail}>
          {user ? (
            // <OptionMenu
            //   saved={{
            //     state: productState.saved,
            //     function: () => handleChange("saved", product.toggleSaved),
            //   }}
            // />
            productState.saved ? (
              <button className={style.unsave} onClick={handleUnsaveClick}>Unsave</button>
            ) : (
              <button className={style.save} onClick={handleSaveClick}>Save</button>
            )
          ) : (
            <Link to={ROUTES.login}>
              <button>Options</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );


};

export default ProductCard;
