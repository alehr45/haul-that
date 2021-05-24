import React, { Component } from "react";
import { Button, Form, Container, Col, Row } from 'react-bootstrap';
import history from '../../history';


export default class Routes extends Component {
    render() {
    
        return (
            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <h1>Column One</h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <Form>
                            <Form.Group controlId="formQuantity">
                                <Form.Label>QTY</Form.Label>
                                <Form.Control type="text" placeholder="0" />
                            </Form.Group>

                            <Form.Group controlId="formBookJob">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" defaultValue="Choose a category" readOnly>
                                    <option>Furniture</option>
                                    <option>Scrap Metal</option>
                                    <option>Yard Waste</option>
                                    <option>Other</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formQuantity">
                                <Form.Label>Description</Form.Label><br />
                                <Form.Control as="textarea" placeholder="Type here" />
                            </Form.Group>    
                       
                            {/* Starting Address */}
                            <h3>Pick-up Address</h3>
                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St" />
                            </Form.Group>
                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control placeholder="Apartment, studio, or floor" />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control />
                                </Form.Group>
                            </Form.Row>
                            <br />

                            {/* Ending Address */}
                            <h3>Drop-off Address</h3>
                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St" />
                            </Form.Group>
                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control placeholder="Apartment, studio, or floor" />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control as="select" defaultValue="Choose...">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Form.Row>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <Button variant="btn btn-success" onClick={() => history.push('/BookingB')}>Continue</Button>
                        </Col>
                    <Col xs={6} md={4}>
                        <h1>Column Three</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
};