import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  const path = window.location.pathname;

  return (
    <div className="basic-component">
      {`"${path}" ${t('NotFound.message')}`}
    </div>
  );
};

export default NotFound;
