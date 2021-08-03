
import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from '../../history';

export default class Routes extends Component {
    render() {
    
        return (
            <div>
                <div>
                    <form>
                        <Button variant="btn btn-success" onClick={() => history.push('/BookingD')}>Continue</Button>
                    </form>
                </div>
            </div>
        );
    }
};