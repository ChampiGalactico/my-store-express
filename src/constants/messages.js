const ERROR = {
    user: {
        NOT_FOUND: 'Usuario no encontrado',
        INVALID_EMAIL: 'El email no es válido',
        EMAIL_ALREADY_EXISTS: 'El email ya está registrado',
        MISSING_FIELDS: 'Faltan campos obligatorios',
    },
    product: {
        NOT_FOUND: 'Producto no encontrado',
    },
    auth: {
        INVALID_CREDENTIALS: 'Credenciales inválidas',
        UNAUTHORIZED: 'No autorizado',
        TOKEN_EXPIRED: 'El token ha expirado',
    },
    generic: {
        INTERNAL_ERROR: 'Error interno del servidor',
        BAD_REQUEST: 'Solicitud incorrecta',
    },
    NOT_FOUND: 'No se encontró la información',
};

const SUCCESS = {
    user: {
        CREATED: 'Usuario creado exitosamente',
        UPDATED: 'Usuario actualizado exitosamente',
        DELETED: 'Usuario eliminado exitosamente',
    },
};

export default {ERROR, SUCCESS}