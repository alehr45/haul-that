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
<<<<<<< HEAD
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $username: String!, $password: String!, $driver: String, $customer: String) {
=======

    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $username: String!, $password: String!, $driver: String, $customer: String) {
>>>>>>> da85385012b638e796b247c4a0c0f5d6e2584773
    addUser(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, username: $username, password: $password, driver: $driver, customer: $customer) {

      token
      user {
        _id
      }
    }
  }
`;

export const ADD_JOB = gql`
  mutation addJob($date: DateTime!, $category: String!, $description: String!, $distance: String!, $pickup: addressInput!, $dropoff: addressInput! ) {
    addJob(date: $date, category: $category, description: $description, distance: $distance, pickup: $pickup, dropoff: $dropoff) {
      _id
    }
  }
`;

export const PICKUP_JOB = gql`
  mutation pickupJob($jobId: ID!) {
    pickupJob(jobId: $jobId) {
      user{
        _id: ID
      }
    }
  }
`;

