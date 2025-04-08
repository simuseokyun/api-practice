import { gql } from 'apollo-server-express';
import messageSchema from './messages.js';
import userSchema from './users.js';

// 스키마는 어떤 이름으로 데이터를 내려주고 어떤 값이 들어있는지 지정해주는 파일이다
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;
export default [linkSchema, messageSchema, userSchema];
