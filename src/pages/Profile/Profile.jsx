// profile page
import React, { useState, useEffect } from "react";
import ROUTES from "../../consts/Routes";
import style from "./Profile.module.css";
import { useProducts } from "../../Contexts/ProductContext";
import { Link } from "react-router-dom";
import pb from "../../services/PocketbaseService";


const Profile = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const { productService, user } = useProducts();

  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        const products = await productService.getSavedProducts();
        console.log(products);
        setSavedProducts(products);
      } catch (error) {
        console.error('Failed to fetch saved products:', error);
      }
    };


    fetchSavedProducts();
  }, []);


  console.log(user);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={style.container}>
      <div className={style.profile}>
        <img src="/image.png" alt="Profile Image" className={style.profileImg} />
        <h2 className={style.name}>{user.username}</h2>
        <p className={style.work}>{user.work}</p>
        <p className={style.bio}>{user.bio}</p>
        <p className={style.address}>{user.street}</p>
        <p className={style.address}>{user.postcode}</p>
        <p className={style.address}>{user.city}</p>
        <p className={style.address}>{user.country}</p>
        <Link to={`${ROUTES.editProfile}`}>
          <button className={style.editProfile}>Edit Profile</button>
        </Link>
        <Link to={`${ROUTES.changePassword}`}>
          <button className={style.changePassword}>Change Password</button>
        </Link>


        

      </div>
      <div className={style.rightColumn}>
        <div className={style.saved}>
          <h3>Saved</h3>
          <div className={style.savedItems}>
            {savedProducts.map((product) => (
              <Link to={`${ROUTES.detail.to}${product.id}`} key={product.id}>
              <div className={style.savedItem}>
                <img src={pb.files.getUrl(product, product.image[0])} alt={product.title} />
                <p>{product.title}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
