import React, { useContext, useState } from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import Client from '../client/client';
import AlertContext from '../context/alert.context';
import CallerContext from '../context/caller.context';

const UserCreateForm = () => {
  const { t } = useTranslation();

  const client = new Client();
  const [, setAlert] = useContext(AlertContext);
  const [, setCaller] = useContext(CallerContext);

  const [name, setName] = useState('');

  const createButtonClick = async () => {
    const createUser = {
      name,
    };

    try {
      const resp = await client.createUser(createUser);
      setCaller(resp.id);
    } catch (err) {
      setAlert({ variant: 'danger', message: err.message });
    }
  };

  return (
    <Container className="mb-5 mt-5">
      <h4 className="d-flex justify-content-center align-items-center">
        {t('UserCreateForm.title')}
      </h4>

      <div className="d-flex justify-content-center mt-5">
        <div style={{ width: '400px' }}>
          <div className="justify-content-center align-items-center">
            <FormGroup className="mb-3 mt-3">
              <FormLabel>{t('UserCreateForm.name')}</FormLabel>
              <FormControl
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </div>

          <Button
            className="w-100"
            variant="primary"
            onClick={() => createButtonClick({ name })}
          >
            <h6
              className="d-flex justify-content-center align-items-center mb-0"
            >
              {t('UserCreateForm.button')}
            </h6>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default UserCreateForm;
