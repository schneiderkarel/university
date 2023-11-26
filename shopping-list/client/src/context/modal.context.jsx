import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  const value = useMemo(
    () => ([show, setShow]),
    [show, setShow],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ModalContext;
