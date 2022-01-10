import React from "react"
import { Badge } from "react-bootstrap"
import { GET_JOBS } from "../utils/queries"
import { useQuery } from "@apollo/react-hooks"

const NavBadge = ({ me }) => {
  const { data: jobsData } = useQuery(GET_JOBS)
  const nonTakenJobs = jobsData?.jobs.filter(job => job.taken === false) || []

  return (
    <div>
      {me.driver === true ? (
        <Badge style={{ paddingLeft: "0px" }} className="badge" pill variant="primary">
          {nonTakenJobs.length}
        </Badge>
      ) : (
        ""
      )}
    </div>
  )
}

export default NavBadge
