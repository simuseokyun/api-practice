import gql from 'graphql-tag';

export const GET_USERS = gql`
  query GET_USERS {
    users {
      id
      nickname
    }
  }
`;

export const GET_USER = gql`
  query GET_USER($id: ID!) {
    user(id: $id) {
      id
      nickname
    }
  }
`;

export const ADD_USER = gql`
  mutation ADD_USER($id: String!, $nickname: String!) {
    addUser(id: $id, nickname: $nickname) {
      id
      nickname
    }
  }
`;
