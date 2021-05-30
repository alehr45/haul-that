import gql from 'graphql-tag';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      }
  }
`;

export const GET_USER = gql`
query user($_id: String!) {
  user(_id: $_id) {
    _id
  }
}`

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      firstName
      lastName
      phone
      email
    }
  }
`;

export const GET_JOBS = gql`
{
  jobs {
    id
    _id
    date
    category
    description
    distance
    createdAt
    pickup {
      address
      address2
      city
      state
      zip
      lat
      lng
    }
    dropoff {
      address
      address2
      city
      state
      zip
      lat
      lng
    }
  }
}`