import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormSelect } from 'react-bootstrap';

const LanguagePicker = () => {
  const { i18n } = useTranslation();

  const languages = [
    {
      name: 'English',
      code: 'en',
    },
    {
      name: 'Česky',
      code: 'cz',
    },
  ];

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <FormSelect
      size="sm"
      value={i18n.language}
      onChange={(e) => handleChange(e)}
    >
      {languages.map((language) => (
        <option
          key={language.code}
          value={language.code}
        >
          {language.name}
        </option>
      ))}
    </FormSelect>
  );
};

export default LanguagePicker;
