import { SUCCESS } from '../../constants/messages.js';
import { CREATED, MODIFIED } from '../../constants/statusCodes.js';
import UserService from '../services/userService.js';

class UserController {
  async getUsers(req, res, next) {
    try {
      const query = req.query;
      const user = await UserService.getUsers(query);
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

  async createUser(req, res, next) {
    try {
      const body = req.body;
      await UserService.createUser(body);
      res.status(CREATED).json({message: SUCCESS.user.CREATED});
    } catch (error) {
      next(error);
    }
  }

  async updateUsername(req, res, next) {
    try {
      const body = req.body;
      const { id } = req.params;
      await UserService.updateUsername(id, body);
      res.status(MODIFIED).json({message: SUCCESS.user.UPDATED});
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
