import { Alert as BootstrapAlert } from 'react-bootstrap';
import React, { useContext } from 'react';
import AlertContext from '../context/alert.context';

const Alert = () => {
  const [alert] = useContext(AlertContext);

  return (
    <div className="custom-alert">
      {alert && (
        <BootstrapAlert className="on-top-middle" variant={alert.variant}>
          {alert.message}
        </BootstrapAlert>
      )}
    </div>
  );
};

export default Alert;
