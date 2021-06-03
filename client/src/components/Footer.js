import React from "react";
import { Navbar, NavbarBrand, Container } from "react-bootstrap";




const Footer= () => {
   
        return(
            <div  className="footer">  
                <Navbar color="danger" dark>
                    <Container className="footer">
                        <NavbarBrand>Footer</NavbarBrand>
                    </Container>
                </Navbar>
            </div>
        )
    };


export default Footer;