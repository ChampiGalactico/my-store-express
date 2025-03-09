import productService from '../services/productService.js';

class ProductController {
  async getProducts(req, res, next) {
    try {
      const products = await productService.getAllProducts();
      console.log("size->",products.length);
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
}

export default new ProductController();
