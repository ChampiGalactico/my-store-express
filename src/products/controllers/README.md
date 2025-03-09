# Controladores
```Los controladores se encargan de manejar las solicitudes HTTP y devolver respuestas```

_Responsabilidad:_

- Manejar las solicitudes HTTP (GET, POST, PUT, DELETE, etc.).
- Devolver respuestas HTTP (JSON, HTML, etc.).
- No debe contener lógica de negocio.

_ejemplo:_

```
const userService = require('../services/userService');

class UserController {
    async getUser(req, res) {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    }

    async createUser(req, res) {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    }
}

module.exports = new UserController();
```