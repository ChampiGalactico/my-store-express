# My store express

My store express es un proyecto creado con el único fin de aprender cómo estructurar un proyecto de Nodejs con Express y entender el funcionamiento de express.

# Express
Express es un framework de Node.js que simplifica la creación de servidores web y APIs. Proporciona una capa de abstracción sobre las funcionalidades básicas de Node.js, permitiéndote manejar rutas, middlewares, solicitudes (requests) y respuestas (responses) de manera más sencilla.

## Glosario básico:

- App: Es la instancia principal de tu servidor.
- Router: Te ayuda a modularizar y organizar rutas.
- Middlewares: Funciones intermedias que procesan solicitudes y respuestas.
- Rutas: Definen cómo responder a las solicitudes HTTP.
- endpoint: es una URL específica en una API o servidor web a la que se puede acceder para realizar una operación o obtener un recurso. Cada endpoint está asociado a un método HTTP (GET, POST, PUT, DELETE, etc.) y define una acción concreta.
- Archivos estáticos: Son archivos que no cambian dinámicamente en el servidor (imagenes, fuentes, css, html, etc).
- Servir (en el contexto de un servidor web): acción de enviar archivos o datos desde el servidor al cliente cuando este los solicita.

## Conceptos clave
1. Aplicación (App)
En Express, una aplicación es una instancia de un servidor web. Se crea usando la función express():

```
import express from 'express';
const app = express();
```

- app es el objeto principal que maneja las solicitudes y respuestas.
- Puedes configurar rutas, middlewares y otros ajustes en este objeto.

2. Rutas
Las rutas definen cómo la aplicación responde a las solicitudes HTTP (GET, POST, PUT, DELETE, etc.) en un determinado endpoint (URL).

```
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});
```

- app.get: Maneja solicitudes GET.
- req: Objeto que representa la solicitud HTTP (contiene datos como parámetros, cabeceras, cuerpo, etc.).
- res: Objeto que representa la respuesta HTTP (envías datos al cliente).

>También puedes usar app.post, app.put, app.delete, etc., para otros métodos HTTP.

3. Router
El Router es una forma de organizar y modularizar las rutas. Es útil para dividir la lógica de la aplicación en varios archivos.

```
import { Router } from 'express'; // Desestructuramos para solo tener Router
const router = Router();

router.get('/', (req, res) => {
  res.send('Ruta principal del router');
});

router.get('/about', (req, res) => {
  res.send('Acerca de nosotros');
});

export default router;
```

Luego se puede usar el router en la aplicación principal (app.js)

```
import router from './router';
app.use('/api', router); // Todas las rutas del router empiezan con /api pro convensión
```

4. Middlewares
Los middlewares son funciones que se ejecutan en el flujo de una solicitud HTTP antes de que llegue a la ruta final. Pueden modificar la solicitud (req), la respuesta (res), o terminar el proceso.

```
app.use((req, res, next) => {
  console.log('Middleware ejecutado');
  next(); // Pasa al siguiente middleware o ruta
});
```

- next(): Indica que el flujo debe continuar.
- Si no llamas a next(), la solicitud se detiene.

**Tipos de middlewares:**
- Middleware de aplicación: Se aplica a toda la aplicación.
- Middleware de ruta: Se aplica a rutas específicas.
- Middleware de terceros: Por ejemplo, body-parser para parsear el cuerpo de las solicitudes.

5. Manejo de errores
Puedes crear middlewares específicos para manejar errores. Estos middlewares deben tener cuatro parámetros (err, req, res, next):

```
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});
```

6. Servir archivos estáticos
Express puede servir archivos estáticos (HTML, CSS, JS, imágenes) usando el middleware express.static:

```
app.use(express.static('public')); // Sirve archivos de la carpeta "public"
```

# Estructuración
Este proyecto está estructurado en módulos o dominios, que consiste en organizar el código en función de las responsabilidades o funcionalidades específicas de la aplicación. Por ejemplo, en tu proyecto, tienes dominios como users y products, cada uno con sus propias carpetas para modelos, repositorios, servicios, controladores, etc.

**Ejemplo:**

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
En donde el archivo index de cada dominio será el punto de entrada de este a la aplicaión. Aquí se importará y configurarán las rutas, como también exportaremos lo que sea que necesitemos exponer. La idea es que sólo este archivo interactúe con el resto de la aplicación. Si necesitas exponer algún otro archivo lo incluyes en el export del index.

## Repositorios (repositories)
Los archivos de la carpeta repositories se encargarán de interactuar con la fuente de datos (base de datos, API, etc.).

**Responsabilidad:**

- Interactuar con la fuente de datos (base de datos, API externa, archivo, etc.).
- Ocultar los detalles de la fuente de datos (el servicio no necesita saber si usas MySQL, MongoDB, etc.).
- Proveer métodos específicos para acceder a los datos (por ejemplo, findById, create, update, delete).

**ejemplo:**

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

## Servicios (services)
Los archivos de esta carpeta contendrán la lógica de negocio y orquestarán operaciones.

**Responsabilidad:**

- Contener la lógica de negocio.
- Orquestar las operaciones entre repositorios, validaciones, etc.
- No debe interactuar directamente con la base de datos (eso es responsabilidad del repositorio).

**ejemplo:**

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


## Controladores (controllers)
Los controladores se encargan de manejar las solicitudes HTTP y devolver respuestas

**Responsabilidad:**

- Manejar las solicitudes HTTP (GET, POST, PUT, DELETE, etc.).
- Devolver respuestas HTTP (JSON, HTML, etc.).
- No debe contener lógica de negocio.

**ejemplo:**

```
const userService = require('../services/userService');

class UserController {
    async getUser(req, res, next) {
        try{
            const user = await userService.getUserById(req.params.id);
            res.json(user);
        } catch(error){
            next(error)
        }
    }

    async createUser(req, res, next) {
        try{
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        }catch(error){
            next(error)
        }
    }
}

module.exports = new UserController();
```

## Rutas (routes)
Los archivos de esta carpeta definirán las rutas de la API y las asociarán con los controladores.

**Responsabilidad:**

- Definir las rutas de la API.
- Asociar rutas con controladores.

**ejemplo:**

```
// users/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id', userController.getUser);
router.post('/', userController.createUser);

module.exports = router;
```

En los casos en los que tengas más de un archivo en esta carpeta, tu carpeta routes podría lucir algo así:
```
users/
│
├── routes/
│   ├── user.public.router.js  # Rutas públicas (ej: registro, login)
│   ├── user.private.router.js # Rutas privadas (ej: perfil, configuración)
│   └── index.js               # Combina todas las rutas
```
y el index.js podría verse algo así algo así:

```
const express = require('express');
const publicRoutes = require('./user.public.router');
const privateRoutes = require('./user.private.router');

const router = express.Router();

// Usar rutas públicas y privadas
router.use('/public', publicRoutes);
router.use('/private', privateRoutes);

module.exports = router;
```

## Validadores (validators)
Los archivos de esta carpeta se encargarán de validar los datos de entrada antes de que lleguen al servicio.

**Responsabilidad:**

- Validar los datos antes de que lleguen al servicio.
- Asegurar que los datos cumplan con las reglas de negocio.io.

**ejemplo:**

```
// users/validators/userValidator.js
const { body } = require('express-validator');

const createUserValidator = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'),
];

module.exports = { createUserValidator }
```

## Modelos
Los archivos de esta carpeta definirán la estructura de los datos (si usas una base de datos).

**Responsabilidad:**

- Definir la estructura de los datos (si usas una base de datos).
- Mapear objetos de la aplicación a la base de datos (si usas un ORM como Sequelize o Mongoose).

**ejemplo:**

```
// users/models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = User;
```

## Interfaces (interfaces)

La carpeta interfaces se utiliza para definir contratos o estructuras de datos que deben cumplir ciertos componentes de tu aplicación.

**Responsabilidad:**

- Define la forma de los objetos que se manejan en tu aplicación..
- Establecer contratos para servicios y repositorios.
- Documentar el código.
- Facilitar pruebas y desacoplamiento.

***Ojo:*** *No se debe confundir con con el modelo. El modelo se encarga de definir la estructura de los datos en la base de datoso (esquemas, tipos, índices, etc), mientras que la interfaz define la forma de los objetos y contratos para los serivicios/repositorios.*

## app.js y server.js

Aunque la app y el server podrían hacerse en el mismo archivo, como cada uno tiene sus repsonsabilidades específicas es buena práctica separarlos.

>app.js se enfoca en la lógica de la aplicación (rutas, middlewares, etc.).
>server.js se enfoca en iniciar el servidor y configuraciones iniciales.

### app.js (la aplicación de Express)

**Responsabilidad:**

- Define middlewares globales (por ejemplo, para parsear JSON, manejar CORS, etc.).
- Configura rutas y enrutadores.
- Maneja errores globales.
- Importa y monta los enrutadores de cada dominio (por ejemplo, users, products).
- Exporta la instancia de Express para que pueda ser usada en otros archivos (como server.js).

### server.js (el servidor HTTP)

**Responsabilidad:**

- Crea una instancia del servidor HTTP usando la aplicación Express.
- Escucha en un puerto específico.
- Conecta a la base de datos.
- Configura variables de entorno.
- Realiza tareas de inicialización (por ejemplo, cargar datos iniciales).
- Escucha eventos como "listening" (cuando el servidor está listo) o "error" (cuando hay un problema al iniciar).

## Constantes (constants)

Esta carpeta se encarga de contener las constantes que vayas a tener en tu aplicación, estas podrían ser los mensajes de respuesta, los códigos de estado HTTP, roles de usuario, configuraciones específicas, entre otros.

**Ejemplo:**

```
export {
    errors: {
        user: {
            NOT_FOUND: 'Usuario no encontrado',
            INVALID_EMAIL: 'El email no es válido',
            EMAIL_ALREADY_EXISTS: 'El email ya está registrado',
            MISSING_FIELDS: 'Faltan campos obligatorios',
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
    },
    success: {
        user: {
            CREATED: 'Usuario creado exitosamente',
            UPDATED: 'Usuario actualizado exitosamente',
            DELETED: 'Usuario eliminado exitosamente',
        },
    },
};
```
## Configuración (confing)

Esta carpeta amacenará archivos de configuración que son necesarios para el funcionamiento de la aplicación. Estos archivos suelen contener valores que pueden variar según el entorno (desarrollo, producción, pruebas, etc.) o que son compartidos en toda la aplicación.

**Ejemplo:**
```
// config/database.js
export {
    development: {
        username: 'root',
        password: 'password',
        database: 'myapp_dev',
        host: 'localhost',
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
};
```

```
// config/env.js
export {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'secret',
};
```