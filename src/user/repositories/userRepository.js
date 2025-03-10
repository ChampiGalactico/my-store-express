import USERS from '../../local-fake-db/user.js';

const DB = USERS;

class UserRepository {

    getAll(limit, offset) {
        return DB.slice(offset, limit + offset);
    }

    findById(userId) {
        return DB.find(user => user.id === userId);
    }

    findByUsername(username) {
        return DB.find(user => user.username === username);
    }

    createUser(user) {
        return DB.push(user);    
    }

}

export default new UserRepository();