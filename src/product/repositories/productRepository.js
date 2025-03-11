import { ERROR } from '../../constants/messages.js';
import { NotFoundError } from '../../errors/index.js';
import PRODUCTS from '../../local-fake-db/product.js';

const DB = PRODUCTS;

// We usually use asynchronous functions here, but we are using a local-fake db, so we do not need it

class ProductRepository {
  getProducts(limit, offset) {
    return DB.slice(offset, offset + limit);
  }

  findById(id) {
    const product = DB.find((p) => p.id === id);
    return product;
  }

  findByCategory(category, limit, offset) {
    const products = DB.filter((p) => p.category === category);
    return products.slice(offset, offset + limit);
  }

  createProduct(product) {
    return DB.push(product);
  }

  updateProduct(id, changedProduct) {
    delete changedProduct.id;
    const product = this.findById(id);
    if (!product) {
      throw new NotFoundError(ERROR.user.NOT_FOUND(id));
    }
    return Object.assign(product, changedProduct);
  }

  deleteProduct(id) {
    const index = DB.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundError(ERROR.user.NOT_FOUND(id));
    }
    return DB.splice(index, 1);
  }
}

export default new ProductRepository();
