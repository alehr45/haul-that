<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { GET_JOBS } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

const NavBadge = ({ setJobsArr, jobsArr }) => {
  const { loading, data: jobsData } = useQuery(GET_JOBS);
  const nonTakenJobs =
    jobsData?.jobs.filter((job) => job.taken === false) || [];
  const [counter, setCounter] = useState(nonTakenJobs.length)

  if (counter !== nonTakenJobs.length) {
    setCounter(nonTakenJobs.length)
  }
  
  // var count = counter

  // const badgeRender = () => {
  //   count++;
  //   setCounter(nonTakenJobs.length);
  // };

  // setInterval(badgeRender, 1000);

  return (
    <div>
      <Badge
        style={{ paddingLeft: "0px" }}
        className="badge"
        pill
        variant="primary"
      >
        {counter}
      </Badge>
>>>>>>> 060ec212f1a04dba1b3830f2c3671fd0c8b860bd
    </div>
  )
}

export default NavBadge
