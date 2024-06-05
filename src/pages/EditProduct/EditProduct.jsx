import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ROUTES from '../../consts/Routes';
import ProductService from '../../services/ProductService';
import style from './EditProduct.module.css';
import Cookies from 'js-cookie';
import pb from '../../services/PocketbaseService';


const EditProduct = () => {
    const productID = Cookies.get('productID');
    const productTitle = Cookies.get('productTitle');
    const productPrice = Cookies.get('productPrice');
    const productDescription = Cookies.get('productDescription');
    const description = productDescription.replace(/<.*?>/g, '').replace(/&nbsp;/g, ' ');
    const productLength = Cookies.get('productLength');
    const productWidth = Cookies.get('productWidth');
    const productHeight = Cookies.get('productHeight');
    const productWeight = Cookies.get('productWeight');
    const productImages = Cookies.get('productImages');
    const productService = new ProductService({ productID });

    const [product, setProduct] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        length: '',
        width: '',
        height: '',
        weight: '',
        images: ''
    });

    const data = {
        id: productID,
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
        length: product.length,
        width: product.width,
        height: product.height,
        weight: product.weight,
        images: product.images
    }


    const SaveChanges = (data) => {
        productService.updateProduct(data)
        .then(response => {
            console.log(response);
        });
    }



  return (
    <div className={style.container}>
      <div className={style.editProduct}>
        <h1>Edit Product</h1>
        <div className={style.columns}>
          <div className={style.column}>
            <p>Title</p>
            <input type="text" placeholder={productTitle} value={product.title} onChange={e => setProduct({...product, title: e.target.value})} />
             <p>Category</p>
            <select value={product.category} onChange={e => setProduct({...product, category: e.target.value})}>
                        <option value="">Select category</option>
                        <option value="0udaymb6jqtpncj">HighLines</option>
                        <option value="01d75a71zc4d59v">SlackLines</option>
                        <option value="nffnc989i2s568y">Veiligheid</option>
                        <option value="34orqas2y6p5rmn">Versteveging</option>
                        <option value="xrrokjzu4tozskj">Frames</option>
                        <option value="oybtd517tbgnbt6">Kleding</option>
              // Voeg meer opties toe zoals nodig
            </select>
            <p>Description</p>
            <textarea placeholder={description} value={product.description} onChange={e => setProduct({...product, description: e.target.value})} />
            <p>Images</p>
            <input type="file" />
            <img src={productImages} alt={productTitle} />
          </div>
        <div className={style.column}>

            <p>Price</p>
            <input type="number" placeholder={productPrice} value={product.price} onChange={e => setProduct({...product, price: e.target.value})} />
            <p>Length</p>
            <input type="number" placeholder={productLength} value={product.length} onChange={e => setProduct({...product, length: e.target.value})} />
            <p>Width</p>
            <input type="number" placeholder={productWidth} value={product.width} onChange={e => setProduct({...product, width: e.target.value})} />
            <p>Height</p>
            <input type="number" placeholder={productHeight}value={product.height} onChange={e => setProduct({...product, height: e.target.value})} />
            <p>Weight</p>
            <input type="number" placeholder={productWeight} value={product.weight} onChange={e => setProduct({...product, weight: e.target.value})} />
        </div>
        </div>
        <Link to={ROUTES.shoppingcart}>
            <button
            className={style.SaveChanges}
            onClick={() => SaveChanges(data)}
            >
            Save Changes
            </button>
        </Link>
      </div>
    </div>
  );
};

export default EditProduct;