import { writeDB } from '../dbController.js';

const setUser = (data) => writeDB('users', data);
const userResolver = {
  Query: {
    users: (parent, args, { db }) => Object.values(db.users),
    user: (parent, { id }, { db }) => db.users[id],
  },
  Mutation: {
    addUser: (parent, { id, nickname }, { db }) => {
      const newUser = {
        id,
        nickname,
      };
      db.users[id] = newUser;
      setUser(db.users);
      return newUser;
    },
  },
};

export default userResolver;
