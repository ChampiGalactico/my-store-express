#Modelos
```Definir la estructura de los datos (si usas una base de datos).```

_Responsabilidad:_

    - Definir la estructura de los datos (si usas una base de datos).
    - Mapear objetos de la aplicación a la base de datos (si usas un ORM como Sequelize o Mongoose).

_ejemplo:_

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