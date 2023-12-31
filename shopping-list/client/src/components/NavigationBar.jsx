import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavbarBrand } from 'react-bootstrap';
import Icon from '@mdi/react';
import {
  mdiBasket, mdiMoonNew,
} from '@mdi/js';
import Button from 'react-bootstrap/Button';
import ThemeContext from '../context/theme.context';
import LanguagePicker from './LanguagePicker';

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

        <div className="d-flex align-items-center justify-content-center">
          <LanguagePicker />

          <Button
            onClick={() => toggleTheme()}
            className="rounded-circle p-0 m-0 ms-3"
            variant={theme === 'light' ? 'theme' : 'theme'}
          >
            {
              theme === 'light'
                ? (
                  <Icon path={mdiMoonNew} size={1} style={{ color: '#28242c' }} />
                )
                : (
                  <Icon path={mdiMoonNew} size={1} style={{ color: 'white' }} />
                )
            }
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
