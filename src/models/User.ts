import * as _ from 'lodash';
import {LanguageEnums, UserRoleEnums} from '../enums'

export class User {
    username: string;
    firstname: string;
    lastname: string;
    birthday: string;
    address: string;
    picture: string;
    language: string;
    role: number;

    constructor(data: any) {
        this.username = !_.isNil(data) && !_.isNil(data.username) ? data.username : '';
        this.firstname = !_.isNil(data) && !_.isNil(data.firstname) ? data.firstname : '';
        this.lastname = !_.isNil(data) && !_.isNil(data.lastname) ? data.lastname : '';
        this.birthday = !_.isNil(data) && !_.isNil(data.birthday) ? data.birthday : '';
        this.address = !_.isNil(data) && !_.isNil(data.address) ? data.address : '';
        this.picture = !_.isNil(data) && !_.isNil(data.picture) ? data.picture : '';
        this.language = !_.isNil(data) && !_.isNil(data.language) ? data.language : LanguageEnums.EN_US;
        this.role = !_.isNil(data) && !_.isNil(data.role) ? data.role : UserRoleEnums.PUBLIC;
    }

    toPublic(){
        return this.role = UserRoleEnums.PUBLIC;
    }
    toMember(){
        return this.role = UserRoleEnums.MEMBER;
    }
    toManager(){
        return this.role = UserRoleEnums.MANAGER;
    }
    toAdmin(){
        return this.role = UserRoleEnums.ADMIN;
    }
}
