import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import ProductService from "../services/ProductService";



export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(false);
    const [categories, setCategories] = useState(false);
    const [error, setError] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Add this line
    const authService = new AuthService({user: {user, setUser}, error: {error, setError}});
    const productService = new ProductService({categories: {categories, setCategories}, error: {error, setError}, setProducts});


    useEffect(() => {
        if(products) productService.liveUpdate(products)
    }, [products]);

    useEffect(() => {
        if(!user && authService.isLoggedIn) authService.loginFromCookies();
    });


    useEffect(() => {
        let isActive = true;
        if(isActive && error) setTimeout(() => setError(false), 5000);
        return () => isActive = false;
    }, [error]);



    return (
        <ProductContext.Provider value={{products, categories, error, user, authService, productService, setSelectedCategoryId}}>
            {children}
        </ProductContext.Provider>
    );


}
export default ProductProvider;

export const useProducts = () => useContext(ProductContext);

export const ProductContext = React.createContext();