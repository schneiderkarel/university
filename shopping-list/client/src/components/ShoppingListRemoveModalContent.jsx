import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ModalContext from '../context/modal.context';
import Client from '../client/client';
import CallerContext from '../context/caller.context';
import AlertContext from '../context/alert.context';

const ShoppingListRemoveModalContent = ({ id }) => {
  const { t } = useTranslation();

  const client = new Client();
  const [, setContent] = useContext(ModalContext);
  const [, setAlert] = useContext(AlertContext);
  const [caller] = useContext(CallerContext);

  const handleClose = () => {
    setContent(null);
  };

  const removeButtonClick = async () => {
    try {
      await client.removeShoppingList(caller, id);
      handleClose();
      window.location.reload();
    } catch (err) {
      setAlert({ variant: 'danger', message: err.message });
    }
  };

  return (
    <div>
      <ModalHeader closeButton>
        <ModalTitle>{t('ShoppingListRemoveModalContent.title')}</ModalTitle>
      </ModalHeader>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          {t('ShoppingListRemoveModalContent.buttons.cancel')}
        </Button>
        <Button
          variant="danger"
          onClick={removeButtonClick}
        >
          {t('ShoppingListRemoveModalContent.buttons.remove')}
        </Button>
      </ModalFooter>
    </div>
  );
};

ShoppingListRemoveModalContent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShoppingListRemoveModalContent;
