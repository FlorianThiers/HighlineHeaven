import React, { useEffect, useState } from "react";
import style from "./Library.module.css";
import Loading from '../../components/Loading/Loading.jsx';
import ProductCard from "../../components/Productcard/ProductCard";
import ProductService from "../../services/ProductService";
import { useParams } from "react-router-dom";

// Definieer de functionaliteit van de bibliotheekpagina.
const library = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); 

  useEffect(() => {
    const productService = new ProductService({
      error: { setError },
      setProducts,
    });

    productService
      .getProducts()
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

  if (loading) return <Loading />;

  const filteredProducts = products
  .filter(product => product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase()))  
  .sort((a, b) => {
    if (sortOrder === 'desc') {
      return new Date(b.created) - new Date(a.created);
    } else if (sortOrder === 'asc') {
      return new Date(a.created) - new Date(b.created);
    } else if (sortOrder === 'priceHigh') {
      return b.price - a.price;
    } else if (sortOrder === 'priceLow') {
      return a.price - b.price;
    }
  });
  
  return (
    <div className={style.container}>
      <h1>All Products</h1>
      <div className={style.productFilter}>
        <input type="text" placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
          <option value="priceHigh">Price high to low</option>
          <option value="priceLow">Price low to high</option>
        </select>
      </div>
      {/* <ProductCards /> */}
      <div className={style.productGrid}>
        {filteredProducts &&
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};
export default library;
