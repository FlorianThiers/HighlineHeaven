import React, { useEffect, useState } from 'react';
import style from "./OptieMenu.module.css";

const OptionMenu = ({ saved = {}}) => {
    const handleSaveClick = () => {
        if (saved.function) {
            saved.function(!saved.state);
        }
    };

    return (
        <ul className={style.buttonList}>
            <li onClick={handleSaveClick} className={`${style.buttonList__item} ${saved.state ? style.active : ''}`}> 
                <img src="/save.svg" alt="save" />
            </li>
        </ul>
    );
};

export default OptionMenu;