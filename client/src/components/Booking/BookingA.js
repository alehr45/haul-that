import React, { useState } from "react";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_JOB } from "../../utils/mutation";
import { QUERY_ME_BASIC } from "../../utils/queries";
import PictureUploader from "../Profiles/PictureUploader";
import Jobs from "../Jobs/Job";

const BookingA = () => {
  const { loading, data } = useQuery(QUERY_ME_BASIC);
  const [image, setImage] = useState("");

  var phone = "";
  var email = "";
  var name = "";

  if (!loading) {
    phone = data.me.phone;
    email = data.me.email;
    name = data.me.firstName;
  }

  const [formState, setFormState] = useState({
    date: "",
    category: "",
    description: "",
    addressP: "",
    addressP2: "",
    cityP: "",
    stateP: "",
    zipP: "",
    addressD: "",
    addressD2: "",
    cityD: "",
    stateD: "",
    zipD: "",
  });

  const [addJob] = useMutation(ADD_JOB);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(typeof value);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form (notice the async!)
  const handleFetch = () => {
    fetch(
      `https://www.mapquestapi.com/directions/v2/route?key=ejlJ5TZ16qwyxA1YWDLZwhdPp6eTt2qA&from=${formState.addressP} ${formState.cityP}, ${formState.stateP} ${formState.zipP}}&to=${formState.addressD} ${formState.cityD}, ${formState.stateD} ${formState.zipD}`,
      {}
    ).then(function (response) {
      if (response.ok) {
        response.json().then(function (routeInfo) {
          const distance = routeInfo.route.distance;
          // const pickupLat = routeInfo.route.locations[0].latLng.
          const pickupLat = routeInfo.route.locations[0].latLng.lat;
          const pickupLng = routeInfo.route.locations[0].latLng.lng;
          const dropoffLat = routeInfo.route.locations[1].latLng.lat;
          const dropoffLng = routeInfo.route.locations[1].latLng.lng;
          const realTime = parseInt(routeInfo.route.realTime / 60);

          console.log(realTime);
          setFormState({
            ...formState,
          });
          handleFormSubmit(
            distance,
            pickupLat,
            pickupLng,
            dropoffLat,
            dropoffLng,
            realTime
          );
        });
      }
    });
  };

  const handleFormSubmit = async (
    distance,
    pickupLat,
    pickupLng,
    dropoffLat,
    dropoffLng,
    realTime
  ) => {
    let job = {
      date: formState.date,
      category: formState.category,
      description: formState.description,
      image: image,
      distance: distance.toString(),
      realTime: realTime,
      phone: phone,
      name: name,
      email: email,
      pickup: {
        address: formState.addressP,
        address2: formState.addressP2,
        city: formState.cityP,
        state: formState.stateP,
        zip: formState.zipP,
        lat: pickupLat.toString(),
        lng: pickupLng.toString(),
      },
      dropoff: {
        address: formState.addressD,
        address2: formState.addressD2,
        city: formState.cityD,
        state: formState.stateD,
        zip: formState.zipD,
        lat: dropoffLat.toString(),
        lng: dropoffLng.toString(),
      },
    };

    // use try/catch instead of promises to handle errors
    try {
      console.log(job);
      await addJob({
        variables: { ...job },
      });

      window.location.assign("/jobs");
      return <Jobs distance={distance}></Jobs>;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className="bookingForm">
      <Row className="booking">
        <Form>
          <Form.Group controlId="dob">
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              placeholder="Day of Delivery"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBookJob">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose a category"
              readOnly
              name="category"
              onChange={handleChange}
            >
              <option> ... </option>
              <option>Furniture</option>
              <option>Scrap Metal</option>
              <option>Yard Waste</option>
              <option>Lawncare Materials</option>
              <option>Mulch or Gravel</option>
              <option>Musical Equipment</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formQuantity">
            <Form.Label>Description</Form.Label>
            <br />
            <Form.Control
              name="description"
              onChange={handleChange}
              as="textarea"
              placeholder="Type here"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Upload Picture</Form.Label>
            <PictureUploader type="job" setImage={setImage} />
          </Form.Group>

          {/* Starting Address */}
          <h3 className="pickup1">Pick-up Address</h3>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              onChange={handleChange}
              name="addressP"
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              placeholder="Apartment, studio, or floor"
              onChange={handleChange}
              name="addressP2"
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control onChange={handleChange} name="cityP" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={handleChange}
                name="stateP"
              >
                <option>Choose...</option>
                <option>...</option>
                <option>Alabama</option>
                <option>Alaska</option>
                <option>Arizona</option>
                <option>Arkansas</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Connecticut</option>
                <option>Delaware</option>
                <option>Florida</option>
                <option>Georgia</option>
                <option>Hawaii</option>
                <option>Idaho</option>
                <option>Illinois</option>
                <option>Indiana</option>
                <option>Iowa</option>
                <option>Kansas</option>
                <option>Kentucky</option>
                <option>Louisiana</option>
                <option>Maine</option>
                <option>Maryland</option>
                <option>Massachusetts</option>
                <option>Michigan</option>
                <option>Minnesota</option>
                <option>Mississippi</option>
                <option>Missouri</option>
                <option>Montana</option>
                <option>Nebraska</option>
                <option>Nevada</option>
                <option>New Hampshire</option>
                <option>New Jersey</option>
                <option>New Mexico</option>
                <option>New York</option>
                <option>North Carolina</option>
                <option>North Dakota</option>
                <option>Ohio</option>
                <option>Oklahoma</option>
                <option>Oregon</option>
                <option>Pennsylvania</option>
                <option>Rhode Island</option>
                <option>South Carolina</option>
                <option>South Dakota</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Utah</option>
                <option>Vermont</option>
                <option>Virginia</option>
                <option>Washington</option>
                <option>West Virginia</option>
                <option>Wisconsin</option>
                <option>Wyoming</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control onChange={handleChange} name="zipP" />
            </Form.Group>
          </Form.Row>
          <br />

          {/* Ending Address */}
          <h3>Drop-off Address</h3>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              onChange={handleChange}
              name="addressD"
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              placeholder="Apartment, studio, or floor"
              onChange={handleChange}
              name="addressD2"
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control onChange={handleChange} name="cityD" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={handleChange}
                name="stateD"
              >
                <option>Choose...</option>
                <option>Tennessee</option>
                <option>Alabama</option>
                <option>Alaska</option>
                <option>Arizona</option>
                <option>Arkansas</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Connecticut</option>
                <option>Delaware</option>
                <option>Florida</option>
                <option>Georgia</option>
                <option>Hawaii</option>
                <option>Idaho</option>
                <option>Illinois</option>
                <option>Indiana</option>
                <option>Iowa</option>
                <option>Kansas</option>
                <option>Kentucky</option>
                <option>Louisiana</option>
                <option>Maine</option>
                <option>Maryland</option>
                <option>Massachusetts</option>
                <option>Michigan</option>
                <option>Minnesota</option>
                <option>Mississippi</option>
                <option>Missouri</option>
                <option>Montana</option>
                <option>Nebraska</option>
                <option>Nevada</option>
                <option>New Hampshire</option>
                <option>New Jersey</option>
                <option>New Mexico</option>
                <option>New York</option>
                <option>North Carolina</option>
                <option>North Dakota</option>
                <option>Ohio</option>
                <option>Oklahoma</option>
                <option>Oregon</option>
                <option>Pennsylvania</option>
                <option>Rhode Island</option>
                <option>South Carolina</option>
                <option>South Dakota</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Utah</option>
                <option>Vermont</option>
                <option>Virginia</option>
                <option>Washington</option>
                <option>West Virginia</option>
                <option>Wisconsin</option>
                <option>Wyoming</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control onChange={handleChange} name="zipD" />
            </Form.Group>
          </Form.Row>
          <Button
            variant="btn btn-success"
            onClick={handleFetch}
            //   onClick={() => history.push("/BookingB")}
            //
          >
            Continue
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default BookingA;
