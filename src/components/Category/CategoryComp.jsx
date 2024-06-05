// CategoryComponent.jsx
import React, { useContext } from 'react';
import { ProductContext } from './ProductContext';

const CategoryComponent = () => {
    const { categories, setSelectedCategoryId } = useContext(ProductContext);

    return (
        <div>
            {categories.map(category => (
                <div key={category.id} onClick={() => setSelectedCategoryId(category.id)}>
                    {category.name}
                </div>
            ))}
        </div>
    );
};

export default CategoryComponent;