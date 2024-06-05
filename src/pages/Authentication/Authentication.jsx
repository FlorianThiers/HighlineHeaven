import React from 'react';
import ROUTES from '../../consts/Routes';
import {Route, Routes} from 'react-router-dom';
import { useProducts } from '../../Contexts/ProductContext';

import Home from '../Home/Home';
import Category from '../Category/Category';
import Detail from '../Detail/Detail';
import Library from '../Library/Library';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import EditProfile from '../EditProfile/EditProfile';
import ChangePassword from '../ChangePassword/ChangePassword';
import MyProducts from '../MyProducts/MyProducts';
import AddProduct from '../AddProduct/AddProduct';
import EditProduct from '../EditProduct/EditProduct';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import CheckOut from '../CheckOut/CheckOut';
import Message from '../Message/Message';
import Messages from '../Messages/Messages';



const Authentication = () => {
    const { authService } = useProducts();
    return (
        <Routes>
            <Route path={ROUTES.home} element={<Home/>} />
            <Route path={ROUTES.category.path} element={<Category/>} />
            <Route path={ROUTES.detail.path} element={<Detail/>} />
            <Route path={ROUTES.library} element={<Library/>} />
            <Route path={ROUTES.login} element={<Login authService={authService}/>} />
            <Route path={ROUTES.profile} element={<Profile/>} />
            <Route path={ROUTES.editProfile} element={<EditProfile/>} />
            <Route path={ROUTES.changePassword} element={<ChangePassword/>} />
            <Route path={ROUTES.myProducts} element={<MyProducts/>} />
            <Route path={ROUTES.addProduct} element={<AddProduct/>} />
            <Route path={ROUTES.editProduct} element={<EditProduct/>} />
            <Route path={ROUTES.shoppingcart} element={<ShoppingCart/>} />
            <Route path={ROUTES.checkOut} element={<CheckOut/>} />
            <Route path={ROUTES.message} element={<Message/>} />
            <Route path={ROUTES.messages} element={<Messages/>} />
         </Routes>
    );
};

export default Authentication;