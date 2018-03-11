import * as moment from 'moment';
import * as _ from 'lodash';
import {Config} from '../config';
import {DatabaseDataAccess} from '../data-access';
import {EncryptionServices} from "../services";

export class Token {
    username: string;
    token: string;
    creation: string;
    expiration: string;

    constructor(data: any) {
        this.username = !_.isNil(data) && !_.isNil(data.username) ? data.username : '';
        this.creation = !_.isNil(data) && !_.isNil(data.creation) ? data.creation : moment.utc().format();
        this.expiration = !_.isNil(data) && !_.isNil(data.expiration) ? data.expiration : moment.utc().add(Config.token.expiration, 'days').format();
        this.token = !_.isNil(data) && !_.isNil(data.token) ? data.token : EncryptionServices.hash(this.username + this.creation + this.expiration, Config.encryption.iterations);
    }

    isValid(): boolean {
        const now = moment.utc().format();
        return now >= this.creation && now <= this.expiration;
    }
}
