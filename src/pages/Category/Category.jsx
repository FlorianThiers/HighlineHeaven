import React, { useEffect, useState } from "react";
import style from "./Category.module.css";
import ProductCard from "../../components/Productcard/ProductCard";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/Routes";
import pb from "../../services/PocketbaseService";

const Category = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const productService = new ProductService({
        category: id,
        error: { setError },
        setProducts,
      });

      productService
        .getProductsByCategory(id)
        .then((response) => {
          setProducts(response);
          console.log(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [id, setProducts, setError]);

  if (loading) return <Loading />;
  
  return (
    <div className={style.container}>
      <h1>Our Products</h1>
      <div className={style.bottumRow}>
        {/* styles */}
        <div className={style.rowBottum}>
          <Link to={`${ROUTES.category.to}${"0udaymb6jqtpncj"}`}>
            <button>HighLines</button>
          </Link>
          <Link to={`${ROUTES.category.to}${"01d75a71zc4d59v"}`}>
            <button>SlackLines</button>
          </Link>
          <Link to={`${ROUTES.category.to}${"nffnc989i2s568y"}`}>
            <button>Veiligheid</button>
          </Link>
          <Link to={`${ROUTES.category.to}${"34orqas2y6p5rmn"}`}>
            <button>Versteveging</button>
          </Link>
          <Link to={`${ROUTES.category.to}${"xrrokjzu4tozskj"}`}>
            <button>Frames</button>
          </Link>
          <Link to={`${ROUTES.category.to}${"oybtd517tbgnbt6"}`}>
            <button>Kleding</button>
          </Link>
        </div>
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

export default Category;
