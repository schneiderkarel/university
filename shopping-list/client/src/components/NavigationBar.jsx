import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavbarBrand } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiBasket } from '@mdi/js';

const NavigationBar = () => (
  <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <NavbarBrand href="/">
        <div className="d-flex align-items-center">
          <Icon className="text-primary" path={mdiBasket} size={1} />
          <span className="ms-2">Shopper.io</span>
        </div>
      </NavbarBrand>
    </Container>
  </Navbar>
);

export default NavigationBar;
