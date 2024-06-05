import React, { useState, useEffect } from "react";
import style from "./MessageCard.module.css";
import MessageService from "../../services/MessageService";



const MessageCard = ({ message }) => {
  const questionF = message ? message.question.replace(/<.*?>/g, '').replace(/&nbsp;/g, ' ') : '';


  return (
    <div className={style.messageCard}>
        <h2>{message.title}</h2>
        <p>{questionF}</p>
        <p>Product: {message.productID.title}</p>
        <p>User: {message.sendUserID.username}</p>
        <p>Viewed: {message.viewed ? 'Yes' : 'No'}</p>
    </div>
    );



};

export default MessageCard;
