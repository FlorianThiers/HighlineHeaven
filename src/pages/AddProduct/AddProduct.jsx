import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../../services/ProductService';
import { useProducts } from '../../Contexts/ProductContext';
import ROUTES from "../../consts/Routes";
import style from './AddProduct.module.css';

const AddProduct = () => {
    const { user } = useProducts();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const productService = new ProductService({error: {setError}, setProducts});

    
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState('');
    const [lengt, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');


    const data = {
        title: title,
        price: price,
        categoryID: category,
        description: description,
        images: images,
        length: lengt,
        width: width,
        height: height,
        weight: weight,
        userID: user.id
    }

    const handleAddProduct = () => {
        console.log(data);
        productService.addProduct(data);
    };





    return (
        <div className={style.container}>
            <div className={style.addProduct}>
                <h1>Add Product</h1>
                <div className={style.columns}>
                    <div className={style.column}>
                    <p>Title</p>
                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <p>Price</p>
                    <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                    <p>Category</p>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">Select category</option>
                        <option value="0udaymb6jqtpncj">HighLines</option>
                        <option value="01d75a71zc4d59v">SlackLines</option>
                        <option value="nffnc989i2s568y">Veiligheid</option>
                        <option value="34orqas2y6p5rmn">Versteveging</option>
                        <option value="xrrokjzu4tozskj">Frames</option>
                        <option value="oybtd517tbgnbt6">Kleding</option>
                    </select>
                    <p>Description</p>
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className={style.column}>
                    <p>images</p>
                    <input type="file" placeholder="images" value={images} onChange={e => setImages(e.target.value)}/>
                    <p>length</p>
                    <input type="number" placeholder="length" value={lengt} onChange={e => setLength(e.target.value)} />
                    <p>width</p>
                    <input type="number" placeholder="width" value={width} onChange={e => setWidth(e.target.value)} />
                    <p>height</p>
                    <input type="number" placeholder="height" value={height} onChange={e => setHeight(e.target.value)} />
                    <p>weight</p>
                    <input type="number" placeholder="weight" value={weight} onChange={e => setWeight(e.target.value)} />
                </div>
                </div>
                <Link to={ROUTES.myProducts}>
                    <button
                    className={style.add}
                    onClick={() => handleAddProduct(data)}
                    >
                    Add
                    </button>
                </Link>
                <button className={style.return} onClick={() => window.history.back()}>← Terug</button>

            </div>
        </div>
    );
};

export default AddProduct;