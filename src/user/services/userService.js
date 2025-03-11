import { ERROR } from "../../constants/messages.js";
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_OFFSET } from "../../constants/config.js";
import { NotFoundError } from "../../errors/index.js";
import UserRepository from "../repositories/userRepository.js";

class UserService {

    getUsers(query){
        const limit = Number(query.limit) || DEFAULT_PAGINATION_LIMIT;
        const offset = Number(query.offset) || DEFAULT_PAGINATION_OFFSET;

        return UserRepository.getAll(limit, offset);
    }

    getUserById(userId){
        const user = UserRepository.findById(userId);
        if (!user) {
            throw new NotFoundError(ERROR.user.NOT_FOUND(userId));
        }
        return user;
    }

    getUserByUsername(username){
        const user = UserRepository.findByUsername(username);
        if (!user) {
            throw new NotFoundError(ERROR.user.NOT_FOUND(username));
        }
        return user;
    }

    createUser(body){
        // validaciones
        return UserRepository.createUser(body);
    }

    updateUsername(id, body){
        const { username } = body;
        const modifiedUser = UserRepository.updateUsername(id, username);
        return modifiedUser;
    }

}

export default new UserService();