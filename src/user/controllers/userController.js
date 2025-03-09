import UserService from "../services/userService.js";

class UserController {

     async getUsers(req, res, next) {
        try {
          const user = await UserService.getAllUsers();
          res.json(user);
        } catch (error) {
          next(error);
        }
      }
    
      async getUserById(req, res, next) {
        try {
          const { id } = req.params;
    
          const user = await UserService.getUserById(id);
    
          res.json(user);
        } catch (error) {
          next(error);
        }
      }

      async getUserByUsername(req, res, next) {
        try {
          const { username } = req.params;
    
          const user = await UserService.getUserByUsername(username);
    
          res.json(user);
        } catch (error) {
          next(error);
        }
      }

}

export default new UserController();