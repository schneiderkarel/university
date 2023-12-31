import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavbarBrand } from 'react-bootstrap';
import Icon from '@mdi/react';
import {
  mdiBasket, mdiMoonFull,
} from '@mdi/js';
import Button from 'react-bootstrap/Button';
import ThemeContext from '../context/theme.context';

const NavigationBar = () => {
  const [theme, toggleTheme] = useContext(ThemeContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavbarBrand href="/">
          <div className="d-flex align-items-center">
            <Icon className="text-primary" path={mdiBasket} size={1} />
            <span className="ms-2">Shopper.io</span>
          </div>
        </NavbarBrand>

        <Button
          onClick={() => toggleTheme()}
          className="rounded-circle p-0 m-0"
          variant={theme === 'light' ? 'theme' : 'theme'}
        >
          {
            theme === 'light'
              ? (
                <Icon path={mdiMoonFull} size={1} style={{ color: 'black' }} />
              )
              : (
                <Icon path={mdiMoonFull} size={1} style={{ color: 'white' }} />
              )
          }
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
