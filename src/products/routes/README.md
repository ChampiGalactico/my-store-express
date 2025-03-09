# Rutas
```Definir las rutas de la API y asociarlas con los controladores.```

_Responsabilidad:_

- Definir las rutas de la API.
- Asociar rutas con controladores.

_ejemplo:_

```
// users/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id', userController.getUser);
router.post('/', userController.createUser);

module.exports = router;
```

_En algunos casos podrías usar más archivos en esta carpet, algunos casos podrían ser:_
```
users/
│
├── routes/
│   ├── user.public.router.js  # Rutas públicas (ej: registro, login)
│   ├── user.private.router.js # Rutas privadas (ej: perfil, configuración)
│   └── index.js               # Combina todas las rutas
```
_y el index.js se vería algo así:_

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