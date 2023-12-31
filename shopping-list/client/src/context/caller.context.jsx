import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const CallerContext = createContext();

export const CallerProvider = ({ children }) => {
  const [caller, setCaller] = useState('659034fcd3137f17b974a2c4');

  const value = useMemo(
    () => ([caller, setCaller]),
    [caller, setCaller],
  );

  return (
    <CallerContext.Provider value={value}>
      {children}
    </CallerContext.Provider>
  );
};

CallerProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CallerContext;
