import { gql } from 'apollo-server-express';
import messageSchema from './messages.js';
import userSchema from './users.js';

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
`;
export default [linkSchema, messageSchema, userSchema];
