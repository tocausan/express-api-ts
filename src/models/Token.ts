import * as moment from 'moment';
import * as _ from 'lodash';
import {Config} from '../config';
import {EncryptionServices} from "../services";

export class Token {
    userId: string;
    hash: string;
    creation: string;
    expiration: string;

    constructor(data?: any) {
        this.userId = !_.isNil(data) && !_.isNil(data.userId) ?
            data.userId : '';
        this.creation = !_.isNil(data) && !_.isNil(data.creation) ?
            data.creation : moment.utc().format();
        this.expiration = !_.isNil(data) && !_.isNil(data.expiration) ?
            data.expiration : moment.utc(this.creation).add(Config.token.expiration, 'days').format();
        this.hash = !_.isNil(data) && !_.isNil(data.hash) ?
            data.hash : EncryptionServices.hash(this.userId + this.creation + this.expiration, Config.encryption.iterations);
    }
}
