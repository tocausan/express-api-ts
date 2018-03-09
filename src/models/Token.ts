import * as moment from 'moment';
import * as jwt from 'jwt-simple';
import * as _ from 'lodash';
import {Config} from '../config';
import {DatabaseDataAccess} from '../data-access';

export class Token {
    username: string;
    token: any;
    creation: string;
    expiration: string;
    expires: string;

    constructor(data: any) {
        !_.isNil(data) && !_.isNil(data.username) ? this.generate(data) : null;
    }

    generate(data: any) {
        this.username = data.username;
        this.token = jwt.encode({exp: this.expires}, Config.token.secret);
        this.creation = moment.utc().format();
        this.expiration = moment.utc().add(Config.token.expiration, 'days').format();

        const filter = {username: this.username};
        return DatabaseDataAccess.findOneAndUpdate(Config.database.collections.tokens, filter, this);
    }
}
