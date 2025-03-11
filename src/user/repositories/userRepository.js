import { ERROR } from '../../constants/messages.js';
import { NotFoundError } from '../../errors/index.js';
import USERS from '../../local-fake-db/user.js';

const DB = USERS;

class UserRepository {
  getAll(limit, offset) {
    return DB.slice(offset, limit + offset);
  }

  findById(userId) {
    return DB.find((user) => user.id === userId);
  }

  findByUsername(username) {
    return DB.find((user) => user.username === username);
  }

  createUser(user) {
    return DB.push(user);
  }

  updateUsername(userId, username) {
    const user = this.findById(userId);
    if (!user) {
      throw new NotFoundError(ERROR.user.NOT_FOUND(userId));
    }
    user.username = username;
    return user;
  }

  deleteUser(id) {
    const index = DB.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundError(ERROR.user.NOT_FOUND(id));
    }
    return DB.splice(index, 1);
  }
}

export default new UserRepository();
