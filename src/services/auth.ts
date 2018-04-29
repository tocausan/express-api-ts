import * as _ from 'lodash';
import {Config} from '../config';
import {User, Password, Token, DbClient} from '../models';
import {Translation} from "../translations";
import {UserServices} from "./user";

export const AuthServices = {

    signin: async (username: string, password: string, passwordConfirmation: string): Promise<Token> => {
        if (_.isNil(username) || _.isNil(password) || _.isNil(passwordConfirmation)) throw new Error('Missing data');
        if (!Password.confirmPassword(password, passwordConfirmation)) throw new Error('Password not matching');
        if (!Password.difficultyPassword(password)) throw new Error('Password must contains at least 6 characters');

        const user = await UserServices.addUser({
            username: username,
            password: password
        })
            .catch((err: Error) => {
                throw err;
            });

        const token = new Token({
            userId: user.id,
            username: username,
            password: password
        });
        return AuthServices.setToken(user, token);
    },

    login: async (username: string, password: string): Promise<Token> => {
        if (_.isNil(username) || _.isNil(password)) throw new Error('Missing data');

        const user: User = await UserServices.getUser(username);
        const userPassword: Password = await UserServices.getPassword(username);
        const valid = userPassword.comparePassword(password);
        console.log(valid)
        if (valid === false) throw new Error(Translation[Config.language].INVALID_CREDENTIALS);

        const token = new Token({
            userId: user.id,
            username: username,
            password: password
        });
        return AuthServices.setToken(user, token);
    },

    setToken: async (user: User, token: Token): Promise<Token> => {
        return DbClient.findOneAndUpdateOrInsert(Config.database.collections.tokens, {userId: user.id}, token);
    }
};
