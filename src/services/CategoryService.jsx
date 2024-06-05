import pb from './PocketbaseService';
import Category from '../Models/Category';

class CategoryService {
    constructor({ error, setCategories }) {
        this.db = pb;
        this.error = error;
        this.categorySettler = setCategories;

        this.getCategories = this.getCategories.bind(this);
        this.getCategory = this.getCategory.bind(this);
    }

    async getCategories() {
        try {
            console.log('Getting categories'); // Add this line
            const response = await this.db.collection('categories').getFullList({
            });

            console.log('Response:', response); // Add this line

            const categoryObject = {};
            response.forEach(category => {
                categoryObject[category.id] = new Category({ id: category.id, ...category });
            });
            this.categorySettler(categoryObject);
            return Object.values(categoryObject);
        } catch (e) {
            console.error('Error getting categories:', e); // Add this line
            this.error.setError(e.message);
        }
    }

    async getCategory(id) {
        try {
            console.log('Getting category:', id); // Add this line
            const response = await this.db.collection('categories').get(id);
    
            console.log('Response:', response); // Add this line
    
            if (!response) {
                console.error('No category found with id:', id); // Add this line
                this.error.setError(`No category found with id: ${id}`);
                return null;
            }
            
            const categoryObject = {};
            categoryObject[response.id] = new Category({ id: response.id, ...response });
            this.categorySettler(categoryObject);
            return Object.values(categoryObject);
            
        } catch (e) {
            console.error('Error getting category:', e); // Add this line
            this.error.setError(e.message);
        }
    }


}

export default CategoryService;