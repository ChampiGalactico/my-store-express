# Repositorios
```Interactuar con la fuente de datos (base de datos, API, etc.).```

_Responsabilidad:_

- Interactuar con la fuente de datos (base de datos, API externa, archivo, etc.).
- Ocultar los detalles de la fuente de datos (el servicio no necesita saber si usas MySQL, MongoDB, etc.).
- Proveer métodos específicos para acceder a los datos (por ejemplo, findById, create, update, delete).

_ejemplo:_

```
const db = require('../../../config/database'); // Conexión a la base de datos

class UserRepository {
    async findById(id) {
        return await db('users').where({ id }).first();
    }

    async findByEmail(email) {
        return await db('users').where({ email }).first();
    }

    async create(userData) {
        const [userId] = await db('users').insert(userData);
        return await db('users').where({ id: userId }).first();
    }
}

module.exports = new UserRepository();
```