import * as _ from 'lodash';
import {LanguageEnums, UserRoleEnums} from '../enums'

export class User {
    public id: string;
    public username: string;
    public email: string;
    public language: string;
    public role: number;

    constructor(data?: any) {
        this.id = !_.isNil(data) && !_.isNil(data._id) ? data._id : '';
        this.username = !_.isNil(data) && !_.isNil(data.username) ? data.username : '';
        this.email = !_.isNil(data) && !_.isNil(data.email) ? data.email : '';
        this.language = !_.isNil(data) && !_.isNil(data.language) ? data.language : LanguageEnums.EN_US;
        this.role = !_.isNil(data) && !_.isNil(data.role) ? data.role : UserRoleEnums.PUBLIC;
    }

    store() {
        return {
            username: this.username,
            email: this.email,
            language: this.language,
            role: this.role
        }
    }

    public hasAccessTo(role: number): boolean {
        return this.role >= role;
    }

    public toPublic(): User {
        this.role = UserRoleEnums.PUBLIC;
        return this;
    }

    public toMember(): User {
        this.role = UserRoleEnums.MEMBER;
        return this;
    }

    public toManager(): User {
        this.role = UserRoleEnums.MANAGER;
        return this;
    }

    public toAdmin(): User {
        this.role = UserRoleEnums.ADMIN;
        return this;
    }
}
