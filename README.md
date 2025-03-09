# My store express

My store express es un proyecto creado con el único fin de aprender cómo estructurar un proyecto de Nodejs con Express. Adicionalmente, repasar el funcionamiento de express.

# Estructuración
Este proyecto está estructurado por dominios, eso quiere decir que cada "entidad" tendrá su propia carpeta con la funcionalidad de esta, por ejemplo, nuestro proyecto con dos dominios --product y user--, se vería algo así:

```
src/
│
├── constants/
│   ├── messages.js
│   └── statusCodes.js
│
├── config/
│   ├── database.js
│   └── env.js
│
├── users/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── models/
│   ├── interfaces/
│   ├── validators/
│   ├── tests/
│   └── index.js
│
├── products/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── models/
│   ├── interfaces/
│   ├── validators/
│   ├── tests/
│   └── index.js
│
├── app.js
└── server.js
```
En donde el archivo index de cada dominio será el punto de entrada de este a la aplicaión. Aquí se importará y configurarán las rutas, como también exportaremos lo que sea que necesitemos exponer. La idea es que sólo este archivo interactúe con el reto de la aplicación. Si necesitas exponer algún otro archivo lo incluyes en el export del index.

## Repositorios (repositories)
```Los archivos de la carpeta repositories se encargarán de interactuar con la fuente de datos (base de datos, API, etc.).```

*Responsabilidad:*

- Interactuar con la fuente de datos (base de datos, API externa, archivo, etc.).
- Ocultar los detalles de la fuente de datos (el servicio no necesita saber si usas MySQL, MongoDB, etc.).
- Proveer métodos específicos para acceder a los datos (por ejemplo, findById, create, update, delete).

*ejemplo:*

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
```+
