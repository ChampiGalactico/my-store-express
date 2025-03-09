import PRODUCTS from "../../local-fake-db/product.js";

const DB = PRODUCTS;

// We usually use asynchronous functions here, but we are using a local-fake db, so we do not need it

class ProductRepository{

    getProducts(limit, offset){
        return DB.slice(offset, offset + limit);
    }

    findById(id){
        const product = DB.find(p => p.id === id);
        return product;
    }

    findByCategory(category, limit, offset){
        const products = DB.filter(p => p.category === category);
        return products.slice(offset, offset + limit);
    }
}

export default new ProductRepository();