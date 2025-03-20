import { gql } from 'apollo-server-express'; //  문자열을 graphQL로 인식하게 만듬

// gql방식은 생성한 스키마에 리졸버를 따로 붙여줘야 함(extend)

const messageSchema = gql`
    type Message {
        id: ID!
        text: String!
        userId: ID!
        timestamp: Float
    }
    extend type Query {
        messages: [Message!]!
        message(id: ID!): Message!
    }
    extend type Mutation {
        createMessage(text: String!, userId: ID!): Message!
        updateMessage(id: ID!, text: String!, userId: ID!): Message!
        deleteMessage(id: ID!, userId: ID!): ID!
    }
`;

export default messageSchema;
