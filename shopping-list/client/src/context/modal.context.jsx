import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [content, setContent] = useState(null);

  const value = useMemo(
    () => ([content, setContent]),
    [content, setContent],
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
