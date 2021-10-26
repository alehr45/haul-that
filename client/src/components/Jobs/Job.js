import React from "react";
import { Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Map from "../Map/Map";
import { Container } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import { GET_JOBS, QUERY_ME_BASIC } from "../../utils/queries";
import Details from "./Details";

const Jobs = () => {
  const { loading, data: jobsData } = useQuery(GET_JOBS);
  const { loading: meLoading, data: meData } = useQuery(QUERY_ME_BASIC);
  const jobs = jobsData?.jobs || [];
  const activeJobs = jobs.filter((job) => job.completed === false);

  const handleDetails = async (date) => {
    return <Details date={date}></Details>;
  };

  const handleCardRender = () => {
    var cards = [];
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!loading && !meLoading) {
      cards = activeJobs.map((job) => {
        const _id = job._id;
        return (
          <Container fluid>
            <Row className="row5">
              {job.taken ? (
                <Button variant="secondary" disabled>
                  Pending...
                </Button>
              ) : (
                <Button
                  className="button6"
                  variant="text-white-20"
                  onClick={() =>
                    handleDetails(
                      job._id,
                      job.distance,
                      job.category,
                      job.id,
                      job.email,
                      job.name,
                      job.date
                    )
                  }
                >
                  <Link className="link" to={"/details/" + _id}>
                    <h5>Active Job #{job.id} </h5>
                    Haul: {parseInt(job.distance)} miles {job.category} for $
                    {parseInt(job.distance * 1.2)}
                  </Link>
                </Button>
              )}
            </Row>
          </Container>
        );
      });
    }
    return cards;
  };

  return (
    <div>
      <Map jobs={jobs} loading={loading} />
      <Container>{handleCardRender()}</Container>
    </div>
  );
};

export default Jobs;
