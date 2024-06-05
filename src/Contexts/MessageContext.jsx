import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import MessageService from "../services/MessageService";

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(false);
    const [error, setError] = useState(false);
    const authService = new AuthService({user: {user, setUser}, error: {error, setError}});
    const messageService = new MessageService({error: {error, setError}, setMessages});

    useEffect(() => {
        if(messages) messageService.liveUpdate(messages)
    }, [messages]);

    useEffect(() => {
        if(!user && authService.isLoggedIn) authService.loginFromCookies();
    });

    useEffect(() => {
        let isActive = true;
        if(isActive && error) setTimeout(() => setError(false), 5000);
        return () => isActive = false;
    }, [error]);

    return (
        <MessageContext.Provider value={{messages, error, user, authService, messageService}}>
            {children}
        </MessageContext.Provider>
    );
}

export default MessageProvider;

export const useMessages = () => useContext(MessageContext);

export const MessageContext = React.createContext();