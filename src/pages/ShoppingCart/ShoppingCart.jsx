// ShoppingCart
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import style from "./ShoppingCart.module.css";
import pb from "../../services/PocketbaseService";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/Routes";

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
    sessionStorage.setItem("cart", JSON.stringify(newCart));
  };

  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    }
    setCart(newCart);
    sessionStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeProduct = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    sessionStorage.setItem("cart", JSON.stringify(newCart));
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <div className={style.container}>
      <div className={style.shoppingCart}>
        <div className={style.products}>
          <h1>ShoppingCart</h1>
          {cart.map((product, index) => (
            <div key={index} className={style.product}>
              <div className={style.productInfo}>
                <h2 className={style.productName}>{product.title}</h2>
                <div className={style.productFoto}>
                <img src={pb.files.getUrl(product, product.image[0])} alt={product.image} />
                  <strong className={style.productPrice}>{product.price} Euro/Stuk</strong>
                </div>
              </div>
              <div className={style.productActions}>
                <div className={style.quantity}>
                  <button
                    onClick={() => increaseQuantity(index)}
                    className={style.increaseQuantity}
                  >
                    +
                  </button>
                  <span className={style.quantityNumber}>
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => decreaseQuantity(index)}
                    className={style.decreaseQuantity}
                  >
                    -
                  </button>
                </div>
                <button
                  onClick={() => removeProduct(index)}
                  className={style.removeProduct}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={style.total}>
          <div>
            <h2>Total</h2>
            {cart.map((product, index) => (
              <div key={index} className={style.totalItem}>
                <div>
                  <span className={style.itemName}>{product.title}</span>
                </div>
                <div className={style.totPrijs}>
                  <span className={style.itemPrice}>{product.price} euro/p </span>
                  <strong className={style.quantityNumber}>
                    {product.quantity} 
                  </strong>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className={style.totalPrice}>
              <span>Total Price: </span>
              <strong>{calculateTotal()} Euro</strong>
            </div>
            <div className={style.buttons}>
            <Link to={`${ROUTES.category.to}${"0udaymb6jqtpncj"}`}>
              <button className={style.continueShopping}>Continue Shopping</button>
            </Link>
            <Link to={`${ROUTES.checkOut}`}
                onClick={() => {
                  sessionStorage.setItem('total', JSON.stringify(calculateTotal()));
                  sessionStorage.setItem('productsWithQuantity', JSON.stringify(cart));

                   }}>
            <button className={style.checkoutPaypal}>
                Checkout
              </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;