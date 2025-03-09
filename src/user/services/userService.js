import messages from "../../constants/messages.js";
import { NotFoundError } from "../../errors/index.js";
import UserRepository from "../repositories/userRepository.js";

class UserService {

    getAllUsers(){
        return UserRepository.getAll();
    }

    getUserById(userId){
        const user = UserRepository.findById(userId);
        if (!user) {
            throw new NotFoundError(messages.ERROR.user.NOT_FOUND);
        }
        return user;
    }

    getUserByUsername(username){
        const user = UserRepository.findByUsername(username);
        if (!user) {
            throw new NotFoundError(messages.ERROR.user.NOT_FOUND);
        }
        return user;
    }

}

export default new UserService();