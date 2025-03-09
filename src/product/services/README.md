# Servicios
```Contener la lógica de negocio y orquestar operaciones.```

_Responsabilidad:_

- Contener la lógica de negocio.
- Orquestar las operaciones entre repositorios, validaciones, etc.
- No debe interactuar directamente con la base de datos (eso es responsabilidad del repositorio).

_ejemplo:_

```
const userRepository = require('../repositories/userRepository');

class UserService {
    async getUserById(id) {
        return await userRepository.findById(id);
    }

    async createUser(userData) {
        // Validar datos (podría estar en un validador)
        if (!userData.name || !userData.email) {
            throw new Error('Nombre y email son obligatorios');
        }

        // Lógica de negocio (por ejemplo, verificar si el email ya existe)
        const existingUser = await userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }

        // Guardar el usuario en la base de datos
        return await userRepository.create(userData);
    }
}

module.exports = new UserService();
```