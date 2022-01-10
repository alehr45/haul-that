import React, { useState, useEffect, useContext } from "react"
import { Badge } from "react-bootstrap"
import { GET_JOBS } from "../utils/queries"
import { useQuery } from "@apollo/react-hooks"
import { useImmer } from "use-immer"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

const NavBadge = ({ me }) => {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const { loading, data: jobsData } = useQuery(GET_JOBS)
  const nonTakenJobs = jobsData?.jobs.filter(job => job.taken === false) || []
  const [state, setState] = useImmer({
    jobCountNum: []
  })

  return (
    <div>
      {me.driver == true ? (
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
