// Sign & Log in page
import style from './Messages.module.css';
import React, { useEffect, useState } from 'react';
import MessageService from '../../services/MessageService';
import { useProducts } from '../../Contexts/ProductContext';
import MessageCard from '../../components/MessageCard/MessageCard';



const Messages = () => {
    const { user } = useProducts();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const [messageState, setMessageState] = useState({
        viewed: messages.viewed,
    });




    const toggleViewed = async () => {
        const [messageState, setMessageState] = useState({
            viewed: message.viewed,
        });
        try {
          await messageService.updateMessage({ ...message, viewed: true });
            setMessageState((prevState) => ({ ...prevState, viewed: true }));
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 1000); // hide popup after 3 seconds
        } catch (error) {
          console.error("Failed to update message:", error);
        }
    };

    useEffect(() => {
        const messageService = new MessageService({
            error: { setError },
            setMessages,
        });
        console.log(user.id)
        messageService
            .getMessagesByUser(user.id)
            .then((response) => {
                setMessages(response);
                console.log(response);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [setMessages, setError]);

    const newMessages = messages.filter(message => !message.viewed);
    const viewedMessages = messages.filter(message => message.viewed);

    return (
        <div className={style.container}>
                  {showPopup && <div className={style.popup}>Message status updated!</div>}

                <div className={style.columns}>
                <div className={style.column}>
                        <h2>New Messages</h2>
                        {newMessages.map((message) => (
                            <div key={message.id} className={style.card}>
                                <MessageCard message={message} />
                            </div>
                        ))}
                    </div>
                    <div className={style.column}>
                        <h2>Viewed Messages</h2>
                        {viewedMessages.map((message) => (
                            <div key={message.id} className={style.card}>
                                <MessageCard message={message} />
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
};

export default Messages;