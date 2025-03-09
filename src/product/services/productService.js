import productRepository from "../repositories/productRepository.js";
import { NotFoundError } from '../../errors/index.js';
import messages from "../../constants/messages.js";


class ProductService {

    async getAllProducts() {
        return productRepository.getAll();
    }

    async getProductById(productId) {
        const product = productRepository.findById(productId);
        if (!product) {
            throw new NotFoundError(messages.ERROR.product.NOT_FOUND);
        }
        return product;
    }

}

export default new ProductService();
