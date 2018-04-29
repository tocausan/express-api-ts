import * as _ from 'lodash';
import {Config} from '../config';
import {User, Password, Token, DbClient} from '../models';
import {Translation} from "../translations";
import {UserServices} from "./user";

export const AuthServices = {

    signin: async (username: string, password: string, passwordConfirmation: string): Promise<Token> => {
        if (_.isNil(username) || _.isNil(password) || _.isNil(passwordConfirmation)) throw new Error('Missing data');
        if (!Password.confirmPassword(password, passwordConfirmation)) throw new Error('Password not matching');

        const data = {
            username: username,
            password: password
        };
        const user = await UserServices.addUser(data)
            .catch((err: Error) => {
                throw err;
            });
        const token = new Token(data);
        token.userId = user.id;
        return AuthServices.setToken(user, token);
    },

    login: async (username: string, password: string): Promise<Token> => {
        if (_.isNil(username) || _.isNil(password)) throw new Error('Missing data');

        const user: User = await UserServices.getUser(username);
        const psswd: Password = await UserServices.getPassword(username);
        const valid = psswd.comparePassword(password);

        if (!valid) throw Translation[Config.language].INVALID_CREDENTIALS;
        const token = new Token({
            username: username,
            password: password
        });
        return AuthServices.setToken(user, token);
    },

    setToken: async (user: User, token: Token): Promise<Token> => {
        return DbClient.findOneAndUpdateOrInsert(Config.database.collections.tokens, {username: user.username}, token);
    }
};
