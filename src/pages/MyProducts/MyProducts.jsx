import React, { useEffect, useState } from "react";
import style from "./MyProducts.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/Routes";
import Loading from '../../components/Loading/Loading.jsx';
import ProductCard from "../../components/Productcard/ProductCard";
import ProductService from "../../services/ProductService";
import { useProducts } from "../../Contexts/ProductContext";

// Definieer de functionaliteit van de bibliotheekpagina.
const MyProducts = () => {
    const { user } = useProducts();
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const productService = new ProductService({
      error: { setError },
      setProducts,
    });

    productService
      .getProductsByUser(user.id)
      .then((response) => { 
        setProducts(response);
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [setProducts, setError]);

  return (
    <div className={style.container}>
      <h1>My Products</h1>
      <div className={style.buttons}>
        {/* add product button */}
        <Link to={ROUTES.addProduct}>
          <button className={style.addProduct}>Add Product</button>
        </Link>
        {/* messages button  */}
        <Link to={ROUTES.messages}>
          <button className={style.messages}>Messages</button>
        </Link>
      </div>

      {/* <ProductCards /> */}
      <div className={style.productGrid}>
        {products &&
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};
export default MyProducts;
