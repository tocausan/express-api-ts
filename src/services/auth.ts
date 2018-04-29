import * as _ from 'lodash';
import {Config} from '../config';
import {User, Password, Token, DbClient} from '../models';
import {Translation} from "../translations";
import {UserServices} from "./user";

export const AuthServices = {

    signin: async (username: string, password: string, passwordConfirmation: string): Promise<User> => {
        if (_.isNil(username) || _.isNil(password) || _.isNil(passwordConfirmation)) throw new Error('Missing data');
        if (!Password.confirmPassword(password, passwordConfirmation)) throw new Error('Password not matching');
        if (!Password.difficultyPassword(password)) throw new Error('Password must contains at least 6 characters');
        return UserServices.addUser({
            username: username,
            password: password
        });
    },

    login: async (username: string, password: string): Promise<Token> => {
        if (_.isNil(username) || _.isNil(password)) throw new Error('Missing data');
        const user: User = await UserServices.getUser(username);
        const userPassword: Password = await UserServices.getPassword(username);
        const valid = userPassword.comparePassword(password);
        if (valid === false) throw new Error(Translation[Config.language].INVALID_CREDENTIALS);
        return UserServices.setToken(user.username);
    }
};
