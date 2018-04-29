import {expect} from 'chai';
import {User} from "../../models";
import {LanguageEnums, UserRoleEnums} from "../../enums";

describe('User', () => {

    describe('new User()', () => {
        const user = new User();
        it('should return an object with [id, username, language, role, email]', () => {
            expect(user)
                .to.be.a('object')
                .to.have.all.keys(['id', 'username', 'language', 'role', 'email']);
        });
        it('email should return ""', () => {
            expect(user.email).to.be.equal('');
        });
        it('username should return ""', () => {
            expect(user.username).to.be.equal('');
        });
        it('language should return default english"', () => {
            expect(user.language).to.be.equal(LanguageEnums.EN_US);
        });
        it('role should return default public"', () => {
            expect(user.role).to.be.equal(UserRoleEnums.PUBLIC);
        });
    });

    describe('new User(data)', () => {
        const user = new User({
            username: 'username',
            email: 'email',
            language: LanguageEnums.EN_US,
            token: 'token',
            role: 0
        });
        it('should return an object with [id, username, language, role, email]', () => {
            expect(user)
                .to.be.a('object')
                .to.have.all.keys(['id', 'username', 'language', 'role', 'email']);
        });
        it('username should return "username"', () => {
            expect(user.username).to.be.equal('username');
        });
        it('email should return "email"', () => {
            expect(user.email).to.be.equal('email');
        });
        it('language should return dafault english', () => {
            expect(user.language).to.be.equal(LanguageEnums.EN_US);
        });
        it('role should return default public', () => {
            expect(user.role).to.be.equal(UserRoleEnums.PUBLIC);
        });
    });

    describe('new User(public)', () => {
        const user = new User({
            username: 'public',
            role: UserRoleEnums.PUBLIC
        });
        it('username should return "public"', () => {
            expect(user.username).to.be.equal('public');
        });
        it('role should return public role', () => {
            expect(user.role).to.be.equal(UserRoleEnums.PUBLIC);
        });
    });

    describe('new User(member)', () => {
        const user = new User({
            username: 'member',
            role: UserRoleEnums.MEMBER
        });
        it('member should return "member"', () => {
            expect(user.username).to.be.equal('member');
        });
        it('role should return member role', () => {
            expect(user.role).to.be.equal(UserRoleEnums.MEMBER)
        });
    });

    describe('new User(manager)', () => {
        const user = new User({
            username: 'manager',
            role: UserRoleEnums.MANAGER
        });
        it('manager should return "manager"', () => {
            expect(user.username).to.be.equal('manager');
        });
        it('role should return manager role', () => {
            expect(user.role).to.be.equal(UserRoleEnums.MANAGER)
        });
    });

    describe('new User(admin)', () => {
        const user = new User({
            username: 'admin',
            role: UserRoleEnums.ADMIN
        });
        it('admin should return "admin"', () => {
            expect(user.username).to.be.equal('admin');
        });
        it('role should return admin role', () => {
            expect(user.role).to.be.equal(UserRoleEnums.ADMIN)
        });
    });

    describe('new User() toPublic', () => {
        const user = new User().toPublic();
        it('role should return a public user', () => {
            expect(user.role).to.be.equal(UserRoleEnums.PUBLIC)
        });
    });

    describe('new User() toMember', () => {
        const user = new User().toMember();
        it('role should return a member user', () => {
            expect(user.role).to.be.equal(UserRoleEnums.MEMBER)
        });
    });

    describe('new User() toManager', () => {
        const user = new User().toManager();
        it('role should return a manager user', () => {
            expect(user.role).to.be.equal(UserRoleEnums.MANAGER)
        });
    });

    describe('new User() toAdmin', () => {
        const user = new User().toAdmin();
        it('role should return an admin user', () => {
            expect(user.role).to.be.equal(UserRoleEnums.ADMIN)
        });
    });

});
