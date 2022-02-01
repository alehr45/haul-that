import React from "react"
import { Card, ListGroup, ListGroupItem, Button, ProgressBar, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { UPDATE_STATUS, ADD_VERIFICATION } from "../../utils/mutation"
import { useMutation } from "@apollo/react-hooks"
import moment from "moment"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const ActiveJobs = ({ info }) => {
  const [updateStatus] = useMutation(UPDATE_STATUS)
  const [addVerification] = useMutation(ADD_VERIFICATION)
  let { title, options, user, incompleteJobs, newTitle } = info
  const driver = user.driver

  const handleDragStart = (e) => e.preventDefault();

  const handleStatus = async (_id, status) => {
    await updateStatus({
      variables: {
        _id: _id
      }
    })
    console.log(status)
    window.location.assign("/profile")
  }

  const handleVerification = async _id => {
    console.log("here")
    await addVerification({
      variables: {
        _id: _id
      }
    })

    await updateStatus({
      variables: {
        _id: _id
      }
    })

    window.location.assign(`/payment/${_id}`)
  }

  const jobProgress = (options, title, job) => {
    return title !== "Generate Code" ? (
      <Button variant={options} onClick={() => handleStatus(job._id, job.status)}>
        {title}
      </Button>
    ) : (
      <Button variant={options} onClick={() => handleVerification(job._id)}>
        {title}
      </Button>
    )
  }

  const progressList = title => {
    return <ListGroupItem className="progress2">{title}</ListGroupItem>
  }

  const progress = (now, key) => {
    return <ProgressBar animated variant="primary" now={now} key={key} />
  }

  const responsive = {
    1024: { items: 4 },
    0: {items: 1}
  }

  // const slicedJobs = incompleteJobs.splice(0, 3)

  const handleDriverJobs = () => {
    const items = incompleteJobs.map(job => (
      <div className = "profileJob" onDragStart={handleDragStart} role="presentation">
        <Card key={job._id} style={{ width: "12rem" }}>
          <ListGroupItem className="job-box2">
            <Col className="pt-2">
              <h4>Job # {job.id}</h4>

              <h6>{parseInt(job.distance)} miles</h6>
              <h6>{moment(job.date).format("MMMM Do YYYY")}</h6>
              <h6>Drive: {job.realTime} minutes</h6>
              <h6>
                {"$"}
                {job.price / 100}
              </h6>
              <Button className="m-2" size="sm">
                <Link className="link text-white" to={`/job/${job._id}`}>
                  More Details
                </Link>
              </Button>
              <h6>
                {" "}
                {job.status === 1 ? (
                  jobProgress(options[0], title[0], job)
                ) : job.status === 2 ? (
                  jobProgress(options[1], title[1], job)
                ) : job.status === 3 ? (
                  jobProgress(options[2], title[2], job)
                ) : job.status === 4 ? (
                  jobProgress(options[3], title[3], job)
                ) : job.status === 5 ? (
                  jobProgress(options[4], title[4], job)
                ) : (
                  <Link className="link" to={`/payment/${job._id}`}>
                    Payment
                  </Link>
                )}
              </h6>
            </Col>
          </ListGroupItem>
        </Card>
      </div>
    ))

    incompleteJobs.sort()
    console.log(incompleteJobs)

    return <AliceCarousel mouseTracking items={items} responsive={responsive} disableButtonsControls={true}   />
  }

  return (
    <div>
      {handleDriverJobs()}
    </div>);

}

export default ActiveJobs;








































// import React from "react"
// import { Card, ListGroup, ListGroupItem, Button, ProgressBar, Col } from "react-bootstrap"
// import { Link } from "react-router-dom"
// import { UPDATE_STATUS, ADD_VERIFICATION } from "../../utils/mutation"
// import { useMutation } from "@apollo/react-hooks"
// import moment from "moment"

// const ActiveJobs = ({ info }) => {
//   const [updateStatus] = useMutation(UPDATE_STATUS)
//   const [addVerification] = useMutation(ADD_VERIFICATION)
//   let { title, options, user, incompleteJobs, newTitle } = info
//   const driver = user.driver

//   const handleStatus = async (_id, status) => {
//     await updateStatus({
//       variables: {
//         _id: _id
//       }
//     })
//     console.log(status)
//     window.location.assign("/profile")
//   }

//   const handleVerification = async _id => {
//     console.log("here")
//     await addVerification({
//       variables: {
//         _id: _id
//       }
//     })

//     await updateStatus({
//       variables: {
//         _id: _id
//       }
//     })

//     window.location.assign(`/payment/${_id}`)
//   }

//   const jobProgress = (options, title, job) => {
//     return title !== "Generate Code" ? (
//       <Button variant={options} onClick={() => handleStatus(job._id, job.status)}>
//         {title}
//       </Button>
//     ) : (
//       <Button variant={options} onClick={() => handleVerification(job._id)}>
//         {title}
//       </Button>
//     )
//   }

//   const progressList = title => {
//     return <ListGroupItem className="progress2">{title}</ListGroupItem>
//   }

//   const progress = (now, key) => {
//     return <ProgressBar animated variant="primary" now={now} key={key} />
//   }

//   const slicedJobs = incompleteJobs.splice(0, 3)
//   console.log(slicedJobs)

//   return (
//     <div>
//       {driver === true ? (
//         <div className="profilejob">
//           {slicedJobs &&
//             slicedJobs.map(job => (
//               <Card key={job._id} style={{ width: "12rem" }}>
//                 <ListGroupItem className="job-box2">
//                   <Col className="pt-2">
//                     <h4>Job # {job.id}</h4>

//                     <h6>{parseInt(job.distance)} miles</h6>
//                     <h6>{moment(job.date).format("MMMM Do YYYY")}</h6>
//                     <h6>Drive: {job.realTime} minutes</h6>
//                     <h6>
//                       {"$"}
//                       {job.price / 100}
//                     </h6>
//                     <Button className="m-2" size="sm">
//                       <Link className="link text-white" to={`/job/${job._id}`}>
//                         More Details
//                       </Link>
//                     </Button>
//                     <h6>
//                       {" "}
//                       {job.status === 1 ? (
//                         jobProgress(options[0], title[0], job)
//                       ) : job.status === 2 ? (
//                         jobProgress(options[1], title[1], job)
//                       ) : job.status === 3 ? (
//                         jobProgress(options[2], title[2], job)
//                       ) : job.status === 4 ? (
//                         jobProgress(options[3], title[3], job)
//                       ) : job.status === 5 ? (
//                         jobProgress(options[4], title[4], job)
//                       ) : (
//                         <Link className="link" to={`/payment/${job._id}`}>
//                           Payment
//                         </Link>
//                       )}
//                     </h6>
//                   </Col>
//                 </ListGroupItem>
//               </Card>
//             ))}
//         </div>
//       ) : (
//         <div className="profilejob">
//           {slicedJobs &&
//             slicedJobs.map(job => (
//               <Card key={job._id} style={{ width: "12rem" }}>
//                 <ListGroupItem className="job-box2">
//                   <Col className="pt-2">
//                     <h4>Job # {job.id}</h4>

//                     <h6>{parseInt(job.distance)} miles</h6>
//                     <h6>{moment(job.date).format("MMMM Do YYYY")}</h6>
//                     <h6>Drive: {job.realTime} minutes</h6>
//                     <h6>
//                       {"$"}
//                       {job.price / 100}
//                     </h6>
//                     <Button className="m-2" size="sm">
//                       <Link className="link text-white" to={`/job/${job._id}`}>
//                         More Details
//                       </Link>
//                     </Button>
//                     <h6 className="job-status"> {job.status === 2 ? progressList(newTitle[0]) : job.status === 3 ? progressList(newTitle[1]) : job.status === 4 ? progressList(newTitle[2]) : job.status === 5 ? progressList(newTitle[3]) : progressList("Pending...")}</h6>
//                     <h6>
//                       {job.status === 0 ? (
//                         progress("")
//                       ) : job.status === 1 ? (
//                         progress(8, 1)
//                       ) : job.status === 2 ? (
//                         progress(25, 1)
//                       ) : job.status === 3 ? (
//                         progress(45, 2)
//                       ) : job.status === 4 ? (
//                         progress(75, 3)
//                       ) : job.status === 5 ? (
//                         progress(100, 4)
//                       ) : (
//                         <Link className="link" to={`/payment/${job._id}`}>
//                           <Button>Make Payment</Button>
//                         </Link>
//                       )}
//                     </h6>
//                   </Col>
//                 </ListGroupItem>
//               </Card>
//             ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default ActiveJobs
