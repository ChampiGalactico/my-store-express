import { SUCCESS } from '../../constants/messages.js';
import { CREATED } from '../../constants/statusCodes.js';
import productService from '../services/productService.js';

class ProductController {
  async getProducts(req, res, next) {
    try {
      const query = req.query;
      const products = await productService.getProducts(query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await productService.getProductById(id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async getProductsByCategory(req, res, next) {
    try {
      const { category } = req.params;
      const query = req.query;
      const products = await productService.getProductsByCategory(category, query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const body = req.body;
      await productService.createProduct(body);
      res.status(CREATED).json({message: SUCCESS.product.CREATED})
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
