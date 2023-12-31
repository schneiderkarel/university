import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const CallerContext = createContext();

export const CallerProvider = ({ children }) => {
  const initCaller = localStorage.getItem('caller');

  const [caller, setCaller] = useState(initCaller);

  const setCallerWithLocalStorage = (newCaller) => {
    localStorage.setItem('caller', newCaller);
    setCaller(newCaller);
  };

  const value = useMemo(
    () => ([caller, setCallerWithLocalStorage]),
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
