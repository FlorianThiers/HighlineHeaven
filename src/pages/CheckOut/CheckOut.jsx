import style from './CheckOut.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../consts/Routes';
import OrderService from '../../services/OrderService';
import Cookies from 'js-cookie';





const CheckOut = () => {
    const storedTotal = JSON.parse(sessionStorage.getItem('total'));
    const storedProductsWithQuantity = JSON.parse(sessionStorage.getItem('productsWithQuantity'));


    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState(null);
    const orderService = new OrderService({error: {setError}});

    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [postcode, setPostcode] = useState('');
    const [cardNr, setCardNr] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [cvc, setCvc] = useState('');

    

    const data = {
        firstName: name,
        street: street,
        postcode: postcode,
        card: cardNr,
        mail: email,
        stad: city,
        land: country,
        cvc: cvc,
        products: storedProductsWithQuantity,
        total: storedTotal,

    }

    const handleCreateOrder = () => {
        console.log(data);
        orderService.createOrder(data)
        .then(() => {
            // Order created successfully, remove the cookies
            Cookies.remove('products');
            Cookies.remove('total');
        })
        .catch(error => {
            // Handle error
            console.error(error);
        });
    };



    return (
        <div className={style.container}>
            <div className={style.checkout}>
            {showPopup && <div className={style.popup}>{popupMessage}</div>}

                <h1>Check Out</h1>
                <div className={style.columns}>
                    <div className={style.column}>
                        <p>First & Last Name</p>
                        <input type="text" placeholder="First Name" value={name} onChange={e => setName(e.target.value)} />
                        <p>Straat + nr</p>
                        <input type="text" placeholder="Straat" value={street} onChange={e => setStreet(e.target.value)} />
                        <p>Postcode</p>
                        <input type="text" placeholder="Postcode" value={postcode} onChange={e => setPostcode(e.target.value)} />
                        <p>Card Nr</p>
                        <input type="text" placeholder="Card" value={cardNr} onChange={e => setCardNr(e.target.value)} />
                    </div>
                    <div className={style.column}>
                        <p>Mail</p>
                        <input type="email" placeholder="Mail" value={email} onChange={e => setEmail(e.target.value)} />
                        <p>Stad</p>
                        <input type="text" placeholder="Stad" value={city} onChange={e => setCity(e.target.value)} />
                        <p>Land</p>
                        <input type="text" placeholder="Land" value={country} onChange={e => setCountry(e.target.value)} />
                        <p>CVC</p>
                        <input type="password" placeholder="Repeat Password" value={cvc} onChange={e => setCvc(e.target.value)} />
                    </div>
                </div>
                <Link to={ROUTES.shoppingcart}>
                    <button
                    className={style.check}
                    onClick={() =>  {
                        handleCreateOrder(data),
                        sessionStorage.removeItem('cart'),
                        sessionStorage.removeItem('total'),
                        setPopupMessage('Thanks For Your Order!'),
                        setShowPopup(true)
                        setTimeout(() => {
                            setShowPopup(false);
                          }, 1000);
                    }}>
                    Check Out
                    </button>
                </Link>
                <button className={style.return} onClick={() => {
                window.history.back();
                }}>← Terug</button>
            </div>
        </div>
    );
};

export default CheckOut;