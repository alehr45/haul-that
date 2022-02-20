import React from "react"
import { Button } from "react-bootstrap"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { QUERY_ME_BASIC } from "../utils/queries"
import { UPDATE_POSITION } from "../utils/mutation"

const JobSwitchButton = () => {
  const { data } = useQuery(QUERY_ME_BASIC)
  const user = data?.me || {}
  const [updatePosition] = useMutation(UPDATE_POSITION)
  var customer
  var driver

  const handleSubmit = async event => {
    event.preventDefault()

    if (event.target.value === "customer") {
      customer = true
      driver = false
    } else {
      customer = false
      driver = true
    }

    await updatePosition({
      variables: { _id: user._id, driver: driver, customer: customer },
      refetchQueries: [{ query: QUERY_ME_BASIC }]
    })
  }

  return (
    <>
      <Button size="sm" variant={user.customer ? "warning" : "success"} value={user.customer ? "driver" : "customer"} onClick={handleSubmit}>
        {user.customer ? "Customer" : "Driver"}
      </Button>
    </>
  )
}

export default JobSwitchButton