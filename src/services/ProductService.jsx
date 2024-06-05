import pb from './PocketbaseService';
import Product from '../Models/Product';


class ProductService {
    constructor({ error, setProducts}) {
        this.db = pb;
        this.error = error;
        this.productSettler = setProducts;

        this.getProducts = this.getProducts.bind(this);
        this.getProductsByCategory = this.getProductsByCategory.bind(this);
        this.getProductsBySearch = this.getProductsBySearch.bind(this);
        this.getProductsByUser = this.getProductsByUser.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.getSavedProducts = this.getSavedProducts.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.liveUpdate = this.liveUpdate.bind(this);
        this.seedProducts = this.seedProducts.bind(this);



    }

    async getProducts() {
        try {
            const response = await pb.collection('products').getFullList();
            const productObject = {};
            response.forEach(product => {
                productObject[product.id] = new Product({id: product.id,...product, service: this});
            });
            this.productSettler(productObject);
            return Object.values(productObject);
        } catch (e) {
            console.error('Error getting products:', e);
            this.error.setError(e.message);
        }
    }

    async getProductsByCategory(id) {
        try {
            console.log('Getting products for category:', id); // Add this line
            const response = await pb.collection('products').getFullList({
                filter: `categoryID = '${id}'`
            });
            
            console.log('Response:', response); // Add this line
    
            const productObject = {};
            response.forEach(product => {
                productObject[product.id] = new Product({id: product.id,...product, service: this});
            });
            this.productSettler(productObject);
            return Object.values(productObject);
        } catch (e) {
            console.error('Error getting products:', e); // Add this line
            this.error.setError(e.message);
        }
    }

    async getProductsBySearch(search) {
        try {
            const response = await pb.collection('products').getFullList({
                filter: `title LIKE '%${search}%' OR description LIKE '%${search}%'`
            });
            const productObject = {};
            response.forEach(product => {
                productObject[product.id] = new Product({id: product.id,...product, service: this});
            });
            this.productSettler(productObject);
            return Object.values(productObject);
        } catch (e) {
            console.error('Error getting products:', e);
            this.error.setError(e.message);
        }
    }

    async getProductsByUser(id) {
        try {
          console.log('Getting products for user:', id); // Add this line

            const response = await pb.collection('products').getFullList({
                filter: `userID = '${id}'`
            });
            const productObject = {};
            response.forEach(product => {
                productObject[product.id] = new Product({...product, service: this});
            });
            this.productSettler(productObject);
            return Object.values(productObject);
        } catch (e) {
            console.error('Error getting products:', e);
            this.error.setError(e.message);
        }
    }

    async getProductById(id) {
        try {
            const response = await pb.collection("products").getOne(id, { $autoCancel: false });
            return response;
        } catch (e) {
            console.error('Error getting product:', e);
            this.error.setError(e.message);
        }
    }

    async getSavedProducts() {
        try {
          const response = await pb.collection('products').getFullList(
            { filter: `saved = true` }
          );
          const productObject = {};
            response.forEach(product => {
                productObject[product.id] = new Product({id: product.id,...product, service: this});
            });
            this.productSettler(productObject);
            return Object.values(productObject);
        } catch (error) {
          console.error('Failed to get saved products:', error);
          throw error;
        }
    }

    async deleteProduct(id) {
      try {
        await pb.collection("products").delete(id);
        return true;
      } catch (error) {
        console.error('Failed to delete product:', error);
        throw error;
      }
    }

    async updateProduct(updateProductData) {
      console.log(updateProductData); // Voeg deze regel toe

      try {
        delete updateProductData.productService
        await pb.collection("products").update(updateProductData.id, updateProductData);
        return true;
      } catch (error) {
        console.error('Failed to update product:', error);
        throw error;
      }
    }

    async addProduct(productData) {
        try {
          console.log('Adding product:', productData); // Add this line
            const product = await pb.collection("products").create(productData);
            if(product) {
              pb.collection('products').subscribe(`${product.id}`, (newProduct) => {
                this.productSettler(prevValues => {
                  return {
                    ...prevValues, 
                    [product.id]: new Product({...product, service: this})
                  }
                })
              });
              console.log('Product added:', product); // Add this line
              return true
            } else {this.error("Failed to add product"); return false}

        } catch (e) {
            console.error('Error adding product:', e);
            this.error.setError(e.message);
        }
    }
    

    liveUpdate(products) {
      Object.values(products).forEach(product => {
        pb.collection('products').subscribe(`${product.id}`, (e) => {
          if(product[product.id])this.productSettler(prevValues => {
            return {
              ...prevValues, 
              [changedProduct.record.id]: new Product({...e.record, service: this})
            }
          })
        });
      });
    }

    seedProducts(userID) {
      seedData.forEach(async product => {
        delete product.id;
        await pb.collection('products').create({...product, userID: userID}, { $autoCancel: false });
      });
    }
}

export default ProductService;