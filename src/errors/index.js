import { ERROR } from "../constants/messages.js";
import { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, } from "../constants/statusCodes.js";

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Errores operacionales (no bugs)
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(message = ERROR.generic.NOT_FOUND) {
        super(message, NOT_FOUND);
    }
}

class ValidationError extends AppError {
    constructor(message = ERROR.generic.INVALID_VALUES) {
        super(message, BAD_REQUEST);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = ERROR.auth.UNAUTHORIZED) {
        super(message, UNAUTHORIZED);
    }
}

class InvalidPaginationError extends AppError {
    constructor(message = ERROR.pagination.INVALID_VALUES){
        super(message, BAD_REQUEST);
    }
}

export {
    AppError,
    NotFoundError,
    ValidationError,
    UnauthorizedError,
    InvalidPaginationError
};