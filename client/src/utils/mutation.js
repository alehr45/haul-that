import gql from "graphql-tag"

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $username: String!, $password: String!, $aboutMe: String, $image: String) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, aboutMe: $aboutMe, image: $image, username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`

export const ADD_JOB = gql`
  mutation addJob($date: String!, $category: String!, $description: String!, $image: String, $distance: String!, $price: Int, $realTime: Int, $phone: String!, $name: String!, $email: String!, $pickup: addressInput!, $dropoff: addressInput!, $customer_id: String) {
    addJob(date: $date, category: $category, description: $description, image: $image, distance: $distance, price: $price, realTime: $realTime, phone: $phone, name: $name, email: $email, pickup: $pickup, dropoff: $dropoff, customer_id: $customer_id) {
      _id
    }
  }
`

export const PICKUP_JOB = gql`
  mutation pickupJob($_id: ID!, $distance: String!, $category: String!, $id: String!) {
    pickupJob(_id: $_id, distance: $distance, category: $category, id: $id) {
      jobs {
        _id
      }
    }
  }
`

export const UPDATE_JOB = gql`
  mutation updateJob($_id: ID!, $taken: Boolean, $status: Int) {
    updateJob(_id: $_id, taken: $taken, status: $status) {
      _id
      taken
      status
    }
  }
`

export const UPDATE_STATUS = gql`
  mutation updateStatus($_id: ID!) {
    updateStatus(_id: $_id) {
      _id
    }
  }
`

export const ADD_VERIFICATION = gql`
  mutation addVerification($_id: ID!) {
    addVerification(_id: $_id) {
      _id
      verificationCode
    }
  }
`

export const UPDATE_IMAGE = gql`
  mutation updateImage($_id: ID!, $image: String!) {
    updateImage(_id: $_id, image: $image) {
      _id
      image
    }
  }
`

export const DELETE_JOB = gql`
  mutation deleteJob($_id: ID!) {
    deleteJob(_id: $_id) {
      _id
    }
  }
`

export const COMPLETE_JOB = gql`
  mutation completeJob($_id: ID!) {
    completeJob(_id: $_id) {
      _id
      completed
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $firstName: String!, $lastName: String!, $email: String!, $phone: String!, $aboutMe: String, $customer: Boolean!, $driver: Boolean!) {
    updateUser(
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone

      aboutMe: $aboutMe
      customer: $customer
      driver: $driver
    ) {
      _id
    }
  }
`

export const UPDATE_POSITION = gql`
  mutation updatePosition($_id: ID!, $customer: Boolean!, $driver: Boolean!) {
    updatePosition(_id: $_id, customer: $customer, driver: $driver) {
      _id
    }
  }
`

// driverUsername to driver_id
export const UPDATE_JOB_DRIVER = gql`
  mutation updateJobDriver($_id: ID!, $driver_id: String!) {
    updateJobDriver(_id: $_id, driver_id: $driver_id) {
      _id
      driver_id
    }
  }
`

export const FIND_DRIVER_AND_RATE = gql`
  mutation findDriverAndRate($job_id: ID!, $input: Int!) {
    findDriverAndRate(job_id: $job_id, input: $input) {
      ratingNumber
      rating
    }
  }
`

export const FIND_CUSTOMER_AND_RATE = gql`
  mutation findCustomerAndRate($job_id: ID!, $input: Int!) {
    findCustomerAndRate(job_id: $job_id, input: $input) {
      ratingNumber
      rating
    }
  }
`
