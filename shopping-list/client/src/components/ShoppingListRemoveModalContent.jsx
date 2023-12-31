import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ModalContext from '../context/modal.context';
import Client from '../client/client';
import CallerContext from '../context/caller.context';

const ShoppingListRemoveModalContent = ({ id }) => {
  const client = new Client();
  const [, setContent] = useContext(ModalContext);
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
      console.error(err);
    }
  };

  return (
    <div>
      <ModalHeader closeButton>
        <ModalTitle>Are you sure you want to remove this shopping list?</ModalTitle>
      </ModalHeader>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={removeButtonClick}
        >
          Remove
        </Button>
      </ModalFooter>
    </div>
  );
};

ShoppingListRemoveModalContent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShoppingListRemoveModalContent;
