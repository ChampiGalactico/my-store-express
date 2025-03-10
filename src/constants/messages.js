export const ERROR = {
  user: {
    NOT_FOUND: (userId) => `El usuario ${userId} no ha sido encontrado.`,
    INVALID_EMAIL: 'El email no es válido.',
    EMAIL_ALREADY_EXISTS: 'El email ya está registrado.',
    MISSING_FIELDS: 'Faltan campos obligatorios.',
  },
  product: {
    NOT_FOUND: (productId) => `El producto ${productId} no ha sido encontrado.`,
    NOT_FOUND_IN_CATEGORY: (categoryName) =>
      `No hay productos registrados en la categoría ${categoryName}`,
  },
  auth: {
    INVALID_CREDENTIALS: 'Credenciales inválidas.',
    UNAUTHORIZED: 'No autorizado.',
    TOKEN_EXPIRED: 'El token ha expirado.',
  },
  generic: {
    INTERNAL_ERROR: 'Error interno del servidor.',
    BAD_REQUEST: 'Solicitud incorrecta.',
    INVALID_VALUES: 'Datos inválidos',
    NOT_FOUND: 'Recurso no encontrado.',
  },
  pagination: {
    INVALID_VALUES: 'Limit y offset deben ser enteros positivos.',
  },
};

export const SUCCESS = {
  user: {
    CREATED: 'Usuario creado exitosamente.',
    UPDATED: 'Usuario actualizado exitosamente.',
    DELETED: 'Usuario eliminado exitosamente.',
  },
  product: {
    CREATED: 'Producto creado exitosamente.',
    UPDATED: 'Producto actualizado exitosamente.',
    DELETED: 'Producto eliminado exitosamente.',
  },
};
