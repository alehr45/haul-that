import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $driver: String, $customer: String) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, driver: $driver, customer: $customer) {
      token
      user {
        _id
      }
    }
  }
`;