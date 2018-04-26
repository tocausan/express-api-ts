import * as _ from 'lodash';
import {LanguageEnums, UserRoleEnums} from '../enums'
import {DebugConsole} from "./index";

export class User {
    username: string;
    firstname: string;
    lastname: string;
    birthday: string;
    address: string;
    picture: string;
    language: string;
    role: number;
    token: string;

    constructor(data?: any) {
        new DebugConsole('User/constructor');
        this.username = !_.isNil(data) && !_.isNil(data.username) ? data.username : '';
        this.firstname = !_.isNil(data) && !_.isNil(data.firstname) ? data.firstname : '';
        this.lastname = !_.isNil(data) && !_.isNil(data.lastname) ? data.lastname : '';
        this.birthday = !_.isNil(data) && !_.isNil(data.birthday) ? data.birthday : '';
        this.address = !_.isNil(data) && !_.isNil(data.address) ? data.address : '';
        this.picture = !_.isNil(data) && !_.isNil(data.picture) ? data.picture : '';
        this.language = !_.isNil(data) && !_.isNil(data.language) ? data.language : LanguageEnums.EN_US;
        this.role = !_.isNil(data) && !_.isNil(data.role) ? data.role : UserRoleEnums.PUBLIC;
        this.token = !_.isNil(data) && !_.isNil(data.token) ? data.token : '';
    }

    toPublic() {
        new DebugConsole('User/toPublic');
        this.role = UserRoleEnums.PUBLIC;
        return this;
    }

    toMember() {
        new DebugConsole('User/toMember');
        this.role = UserRoleEnums.MEMBER;
        return this;
    }

    toManager() {
        new DebugConsole('User/toManager');
        this.role = UserRoleEnums.MANAGER;
        return this;
    }

    toAdmin() {
        new DebugConsole('User/toAdmin');
        this.role = UserRoleEnums.ADMIN;
        return this;
    }
}
