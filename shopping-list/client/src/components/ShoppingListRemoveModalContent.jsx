import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ModalContext from '../context/modal.context';
import { shoppingListType } from '../types/types';

const ShoppingListRemoveModalContent = ({ id, shoppingLists, setShoppingLists }) => {
  const [, setContent] = useContext(ModalContext);

  const handleClose = () => {
    setContent(null);
  };

  const removeButtonClick = () => {
    const shoppingListsWithoutCurrent = shoppingLists.filter((item) => item.id !== id);
    setShoppingLists(shoppingListsWithoutCurrent);
    handleClose();
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
  shoppingLists: PropTypes.arrayOf(shoppingListType().isRequired).isRequired,
  setShoppingLists: PropTypes.func.isRequired,
};

export default ShoppingListRemoveModalContent;
