import PRODUCTS from "../../local-fake-db/product.js";

const DB = PRODUCTS;

// We usually use asynchronous functions here, but we are using a local-fake db, so we do not need it

class ProductRepository{

    getAll(){
        return DB;
    }

    findById(id){
        const product = DB.find(p => p.id === id);
        return product;
    }

    getSome(amount){
        const products = DB.slice(amount);
        return products;
    }

}

export default new ProductRepository();