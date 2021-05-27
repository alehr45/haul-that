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

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const GET_JOBS = gql`
{
  jobs {
    _id
    date
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