// Sign & Log in page
import style from './Message.module.css';
import Cookies from 'js-cookie';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../consts/Routes';
import MessageService from '../../services/MessageService';
import { useProducts } from '../../Contexts/ProductContext';


const Message = () => {
    const productID = Cookies.get('productID');
    const getUserID = Cookies.get('getUserID');
    const { user } = useProducts();
    const [error, setError] = useState(null);
    const messageService = new MessageService({error: {setError}});

    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');



    const data = {
        title: title,
        question: question,
        getUserID: getUserID,
        productID: productID,
        sendUserID: user.id
    }

    const handleAddMessage = () => {
        console.log(data);
        messageService.createMessage(data)
        .then(() => {
            // Order created successfully, remove the cookies
            Cookies.remove('productID');
            Cookies.remove('getUserID');
        })
    };

    return (
        <div className={style.container}>
            <div className={style.message}>
                <h1>Send Message</h1>
                <div className={style.columns}>
                    <div className={style.column}>
                        <p>Title</p>
                        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                        <p>Content</p>
                        <textarea placeholder="question" value={question} onChange={e => setQuestion(e.target.value)} />
                    </div>
                </div>
                <Link to={ROUTES.messages}>
                    <button
                    className={style.add}
                    onClick={() => handleAddMessage(data)}
                    >
                    Send
                    </button>
                </Link>
                <button className={style.return} onClick={() => window.history.back()}>← Terug</button>
            </div>
        </div>
    );
};

export default Message;