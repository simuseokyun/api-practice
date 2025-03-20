import { readDB } from '../dbController.js';

const getUsers = () => readDB('users');

const usersRoute = [
    // Get Users
    {
        method: 'get',
        route: '/users',
        handler: (req, res) => {
            const users = getUsers();
            res.send(users);
        },
    },
    // Get User
    {
        method: 'get',
        route: '/users/:id',
        handler: ({ params: { id } }, res) => {
            try {
                const users = getUsers();
                const user = users[id];
                if (!user) throw '사용자가 없습니다';
                res.send(user);
            } catch (err) {
                res.status(404).send({ error: err });
            }
        },
    },
];

export default usersRoute;
