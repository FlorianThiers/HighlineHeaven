class Product {
    constructor({id, title, description, price, lengt, width, height, weight, image, categoryID, userID, viewed, service, created, updated}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.lengt = lengt;
        this.width = width;
        this.height = height;
        this.weight = weight;
        this.image = image;
        this.categoryID = categoryID;
        this.userID = userID;
        this.productService = service;
        this.created = created;
        this.updated = updated;

        this.viewed = viewed ?? false;
    
        // this.toggleViewed = this.toggleViewed.bind(this);
        // this.toggleLiked = this.toggleLiked.bind(this);
        // this.toggleAddedToLibrary = this.toggleAddedToLibrary.bind(this);
    }


    deleteProduct() {
        this.productService.deleteProduct(this);
    }



    
}

export default Product;
