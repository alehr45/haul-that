import React, { useEffect, useState } from "react"
import { Badge } from "react-bootstrap"
import { GET_JOBS } from "../utils/queries"
import { useQuery } from "@apollo/react-hooks"

const NavBadge = ({ setJobsArr, jobsArr }) => {
  const { data: jobsData } = useQuery(GET_JOBS)
  const nonTakenJobs = jobsData?.jobs.filter(job => job.taken === false) || []
  const [counter, setCounter] = useState(nonTakenJobs.length)

  if (counter !== nonTakenJobs.length) {
    setCounter(nonTakenJobs.length)
  }

  useEffect(() => {}, nonTakenJobs.length)

  return (
    <Badge style={{ paddingLeft: "2px" }} className="badge" pill variant="primary">
      {nonTakenJobs.length > 0 ? counter : ""}
    </Badge>
  )
}

export default NavBadge
