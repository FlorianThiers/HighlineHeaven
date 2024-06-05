import style from "./Detail.module.css";
import Coockies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../../Contexts/ProductContext";
import ProductService from "../../services/ProductService";
import ROUTES from "../../consts/Routes";
import Loading from "../../components/Loading/Loading";
import OptionMenu from "../../components/OptieMenu/OptieMenu";
import pb from "../../services/PocketbaseService";


const Detail = () => {
  const { id } = useParams();
  const { user } = useProducts();
  const { productService } = useProducts();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const descriptionF = product ? product.description.replace(/<.*?>/g, '').replace(/&nbsp;/g, ' ') : '';

  const [productState, setProductState] = useState({
    saved: false,
  });

  const addToCart = (product) => {
    // Get the current cart from session storage
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // If the product is already in the cart, increase the quantity
      existingProduct.quantity += 1;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      cart.push({ ...product, quantity: 1 });
    }

    setPopupMessage('Product added to cart!');
    setShowPopup(true);

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
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

  useEffect(() => {
    if (product) {
      setProductState({ saved: product.saved });
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      const productService = new ProductService({});
      productService
        .getProductById(id)
        .then((response) => {
          setProduct(response);
          console.log(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (product && product.image.length > 0) {
      setSelectedImage(product.image[0]);
    }
  }, [product]);

  if (loading) return <Loading />;

  if (!product) return <h1>Product not found</h1>;
  
  if (user.id === product.userID) {
    return ( 
      <div className={style.container}>
      <div className={style.productCard}>
        {showPopup && <div className={style.popup}>{popupMessage}</div>}

      <article className={style.article}>
          <button className={style.return} onClick={() => window.history.back()}>← Terug</button>
          <h1>{product.title}</h1>
          <div className={style.productDetails}>
            <div className={style.image}>
              <img src={pb.files.getUrl(product, selectedImage)} alt={selectedImage} className={style.BigImg}/>
              <div className={style.images}>
                {product.image.map((img, index) => (
                  <img
                    key={index}
                    src={pb.files.getUrl(product, img)}
                    alt={`product-${index}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
            <div className={style.productInfo}>
              <div className={style.info}>
                <p>Length: </p>
                <p>{product.lengt} m</p>
              </div>
              <div className={style.info}>
                <p>Width: </p>
                <p>{product.width} cm</p>
              </div>
              <div className={style.info}>
                <p>Height: </p>
                <p>{product.height} cm</p>
              </div>
              <div className={style.info}>
                <p>Weight: </p>
                <p>{product.weight} Kg</p>
              </div>
              <div className={style.price}>
                <h2>Price: </h2>
                <h2>{product.price} Euro</h2>
              </div>
              <div className={style.buttons}>
                <Link to={ROUTES.editProduct}
                  onClick={() => {
                    Coockies.set('productID', product.id);
                    Coockies.set('productTitle', product.title);
                    Coockies.set('productPrice', product.price);
                    Coockies.set('productDescription', product.description);
                    Coockies.set('productLength', product.lengt);
                    Coockies.set('productWidth', product.width);
                    Coockies.set('productHeight', product.height);
                    Coockies.set('productWeight', product.weight);
                    Coockies.set('productImages', product.image);
                  }}
                >
                  <button className={style.edit}>Edit</button>
                </Link>
                <button className={style.delete} onClick={() => productService.deleteProduct(product)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        <p>{descriptionF}</p>
      </article>
      </div>
    </div>
    );
  } else 
  return (
    <div className={style.container}>
      <div className={style.productCard}>
        {showPopup && <div className={style.popup}>{popupMessage}</div>}

      <article className={style.article}>
          <button className={style.return} onClick={() => window.history.back()}>← Terug</button>
          <h1>{product.title}</h1>
          <div className={style.productDetails}>
            <div className={style.image}>
              <img src={pb.files.getUrl(product, selectedImage)} alt={selectedImage} className={style.BigImg}/>
              <div className={style.images}>
                {product.image.map((img, index) => (
                  <img
                    key={index}
                    src={pb.files.getUrl(product, img)}
                    alt={`product-${index}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
            <div className={style.productInfo}>
              <div className={style.info}>
                <p>Length: </p>
                <p>{product.lengt} m</p>
              </div>
              <div className={style.info}>
                <p>Width: </p>
                <p>{product.width} cm</p>
              </div>
              <div className={style.info}>
                <p>Height: </p>
                <p>{product.height} cm</p>
              </div>
              <div className={style.info}>
                <p>Weight: </p>
                <p>{product.weight} Kg</p>
              </div>
              <div className={style.price}>
                <h2>Price: </h2>
                <h2>{product.price} Euro</h2>
              </div>
              <div className={style.buttons}>
              {user ? (
                // <OptionMenu product={product} 
                // saved={{
                //   state: productState.saved,
                //   function: () => handleChange("saved", product.toggleSaved),
                // }}/>
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
              {user ? (
                <button className={style.buy} onClick={() => addToCart(product)}>Add to Cart</button>
              ) : (
                <Link to={ROUTES.login}>
                  <button>Add To Cart</button>
                </Link>
              )}
              </div>
            </div>
          </div>
        <p>{descriptionF}</p>
        {user ? (
          <Link to={ROUTES.message} onClick={() => {
            Coockies.set('productID', product.id);
            console.log(product.userID);
            Coockies.set('getUserID', product.userID);
          }}>
            <button className={style.messages}>Message</button>
          </Link>
        ) : (
          <Link to={ROUTES.login}>
            <button className={style.messages}>Message</button>
          </Link>
        )
          }
      </article>
      </div>
    </div>
    );
  };

export default Detail;
