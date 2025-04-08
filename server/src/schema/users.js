import { gql } from 'apollo-server-express';

export const userSchema = gql`
  type User {
    id: ID!
    nickname: String!
  }
  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }
  extend type Mutation {
    addUser(id: String!, nickname: String!): User
  }
`;
export default userSchema;
