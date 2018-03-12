import {expect} from 'chai';
import {User} from "../../models";
import {LanguageEnums, UserRoleEnums} from "../../enums";

describe('User', () => {

    describe('new User()', () => {
        it('should return a default user', () => {
            const user = new User();
            expect(user)
                .to.be.a('object')
                .to.have.all.keys(['username', 'picture', 'firstname', 'lastname', 'birthday', 'address', 'language', 'role', 'token'])
            expect(user.username).to.be.equal('');
            expect(user.firstname).to.be.equal('');
            expect(user.lastname).to.be.equal('');
            expect(user.picture).to.be.equal('');
            expect(user.birthday).to.be.equal('');
            expect(user.address).to.be.equal('');
            expect(user.language).to.be.equal(LanguageEnums.EN_US);
            expect(user.token).to.be.equal('');
            expect(user.role).to.be.equal(UserRoleEnums.PUBLIC);
        });
    });

    describe('new User(data)', () => {
        it('should return a custom user', () => {
            const user = new User({
                username: 'username',
                firstname: 'firstname',
                lastname: 'lastname',
                picture: 'picture',
                birthday: 'birthday',
                address: 'address',
                language: LanguageEnums.EN_US,
                token: 'token',
                role: 0
            });
            expect(user)
                .to.be.a('object')
                .to.have.all.keys(['username', 'picture', 'firstname', 'lastname', 'birthday', 'address', 'language', 'role', 'token'])
            expect(user.username).to.be.equal('username');
            expect(user.firstname).to.be.equal('firstname');
            expect(user.lastname).to.be.equal('lastname');
            expect(user.picture).to.be.equal('picture');
            expect(user.birthday).to.be.equal('birthday');
            expect(user.address).to.be.equal('address');
            expect(user.language).to.be.equal(LanguageEnums.EN_US);
            expect(user.token).to.be.equal('token');
            expect(user.role).to.be.equal(UserRoleEnums.PUBLIC);
        });
    });

    describe('new User(public)', () => {
        it('should return a public user', () => {
            const user = new User({
                username: 'public',
                role: UserRoleEnums.PUBLIC
            });
            expect(user.username).to.be.equal('public');
            expect(user.role).to.be.equal(UserRoleEnums.PUBLIC);
        });
    });

    describe('new User(member)', () => {
        it('should return a member user', () => {
            const user = new User({
                username: 'member',
                role: UserRoleEnums.MEMBER
            });
            expect(user.username).to.be.equal('member');
            expect(user.role).to.be.equal(UserRoleEnums.MEMBER)
        });
    });

    describe('new User(manager)', () => {
        it('should return a manager user', () => {
            const user = new User({
                username: 'manager',
                role: UserRoleEnums.MANAGER
            });
            expect(user.username).to.be.equal('manager');
            expect(user.role).to.be.equal(UserRoleEnums.MANAGER)
        });
    });

    describe('new User(admin)', () => {
        it('should return an admin user', () => {
            const user = new User({
                username: 'admin',
                role: UserRoleEnums.ADMIN
            });
            expect(user.username).to.be.equal('admin');
            expect(user.role).to.be.equal(UserRoleEnums.ADMIN)
        });
    });

    describe('new User() toPublic', () => {
        it('should return a public user', () => {
            const user = new User().toPublic();
            expect(user.role).to.be.equal(UserRoleEnums.PUBLIC)
        });
    });

    describe('new User() toMember', () => {
        it('should return a member user', () => {
            const user = new User().toMember();
            expect(user.role).to.be.equal(UserRoleEnums.MEMBER)
        });
    });

    describe('new User() toManager', () => {
        it('should return a manager user', () => {
            const user = new User().toManager();
            expect(user.role).to.be.equal(UserRoleEnums.MANAGER)
        });
    });

    describe('new User() toAdmin', () => {
        it('should return an admin user', () => {
            const user = new User().toAdmin();
            expect(user.role).to.be.equal(UserRoleEnums.ADMIN)
        });
    });

});
