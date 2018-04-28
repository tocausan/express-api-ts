import * as _ from 'lodash';
import {LanguageEnums, UserRoleEnums} from '../enums'

export class User {
    username: string;
    email: string;
    language: string;
    role: number;

    constructor(data?: any) {
        this.username = !_.isNil(data) && !_.isNil(data.username) ? data.username : '';
        this.email = !_.isNil(data) && !_.isNil(data.email) ? data.email : '';
        this.language = !_.isNil(data) && !_.isNil(data.language) ? data.language : LanguageEnums.EN_US;
        this.role = !_.isNil(data) && !_.isNil(data.role) ? data.role : UserRoleEnums.PUBLIC;
    }

    toPublic() {
        this.role = UserRoleEnums.PUBLIC;
        return this;
    }

    toMember() {
        this.role = UserRoleEnums.MEMBER;
        return this;
    }

    toManager() {
        this.role = UserRoleEnums.MANAGER;
        return this;
    }

    toAdmin() {
        this.role = UserRoleEnums.ADMIN;
        return this;
    }
}
