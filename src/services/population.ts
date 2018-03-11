import {User} from '../models';
import {UserServices} from "./user";

export const PopulationServices = {

    default: () => {
        const population = [
            {username: 'public', password: 'public', role: 0},
            {username: 'member', password: 'member', role: 1},
            {username: 'manager', password: 'manager', role: 2},
            {username: 'admin', password: 'admin', role: 3}
        ];
        population.forEach(data => {
            UserServices.insertOne(data).then((user: User) => {
                console.log('-> ' + user.username + ' user added');
            }, () => {
            });
        });
    },

};
