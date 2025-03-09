# Validadores
```Validar los datos de entrada antes de que lleguen al servicio.```

_Responsabilidad:_

- Validar los datos antes de que lleguen al servicio.
- Asegurar que los datos cumplan con las reglas de negocio.io.

_ejemplo:_

```
// users/validators/userValidator.js
const { body } = require('express-validator');

const createUserValidator = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'),
];

module.exports = { createUserValidator }
```