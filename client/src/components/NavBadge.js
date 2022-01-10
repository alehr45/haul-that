import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { GET_JOBS } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

const NavBadge = ({ setJobsArr, jobsArr }) => {
  const { loading, data: jobsData } = useQuery(GET_JOBS);
  const nonTakenJobs =
    jobsData?.jobs.filter((job) => job.taken === false) || [];

  const [counter, setCounter] = useState(nonTakenJobs.length)
  var count = counter

  const badgeRender = () => {
    count++;
    setCounter(nonTakenJobs.length);
  };

  setInterval(badgeRender, 1000);

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
    </div>
  );
};

export default NavBadge;
