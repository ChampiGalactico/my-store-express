import express from 'express';
import productRoutes from './src/product/index.js';
import userRoutes from './src/user/index.js';
import { AppError } from './src/errors/index.js'

const APP = express();

APP.use(express.json());

APP.use('/api', productRoutes);
APP.use('/api', userRoutes);


APP.use((err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    res.status(500).json({ message: 'Algo salió mal' });
});

export default APP;