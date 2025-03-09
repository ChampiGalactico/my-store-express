import ProductRepository from '../repositories/productRepository.js';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_OFFSET,
} from '../../constants/config.js';
import { NotFoundError } from '../../errors/index.js';
import { ERROR } from '../../constants/messages.js';

class ProductService {
  async getProducts(query) {
    const limit = Number(query.limit) || DEFAULT_PAGINATION_LIMIT;
    const offset = Number(query.offset) || DEFAULT_PAGINATION_OFFSET;

    return ProductRepository.getProducts(limit, offset);
  }

  async getProductById(productId) {
    const product = ProductRepository.findById(productId);
    if (!product) {
      throw new NotFoundError(ERROR.product.NOT_FOUND(productId));
    }
    return product;
  }

  async getProductsByCategory(category, query) {
    const limit = query.limit ?? DEFAULT_PAGINATION_LIMIT;
    const offset = query.offset ?? DEFAULT_PAGINATION_OFFSET;

    const products = ProductRepository.findByCategory(category, limit, offset);
    if (!products.length) {
      throw new NotFoundError(ERROR.product.NOT_FOUND_IN_CATEGORY(category));
    }
    return products;
  }
}

export default new ProductService();
