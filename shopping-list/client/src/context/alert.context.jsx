import React, {
  createContext, useEffect, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const timerRef = useRef();

  useEffect(() => {
    const ALERT_TIMEOUT = 2000;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setAlert(null);
    }, ALERT_TIMEOUT);
  }, [alert]);

  const value = useMemo(
    () => ([alert, setAlert]),
    [alert, setAlert],
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AlertContext;
