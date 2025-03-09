import USERS from '../../local-fake-db/user.js';

const DB = USERS;

class UserRepository {

    getAll() {
        return DB;
    }

    findById(userId) {
        return DB.find(user => user.id === userId);
    }

    findByUsername(username) {
        return DB.find(user => user.username === username);
    }

}

export default new UserRepository();