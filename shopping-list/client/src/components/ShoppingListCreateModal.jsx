import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
  Modal as BootstrapModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ModalContext from '../context/modal.context';
import { ShoppingListCreateForm } from '../pages/ShoppingListCreateForm';
import { emptyShoppingList } from '../pages/helper';

const ShoppingListCreateModal = ({
  users,
  shoppingLists,
  setShoppingLists,
}) => {
  const navigate = useNavigate();

  const [show, setShow] = useContext(ModalContext);

  const [shoppingList, setShoppingList] = useState(emptyShoppingList());

  const createButtonClick = () => {
    const restShoppingLists = shoppingLists.filter((item) => item.id !== shoppingList.id);
    setShoppingLists([...restShoppingLists, shoppingList]);
    navigate(`/shopping-lists/${shoppingList.id}`);
  };

  const closeButtonClick = () => {
    const shoppingListsWithoutCurrent = shoppingLists.filter((item) => item.id !== shoppingList.id);
    setShoppingLists([...shoppingListsWithoutCurrent]);
  };

  const handleClose = () => {
    setShow(false);
    closeButtonClick();
  };

  return (
    <BootstrapModal
      dialogClassName="expanded-modal-dialog"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader closeButton>
        <ModalTitle>New shopping list</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <ShoppingListCreateForm
          users={users}
          shoppingList={shoppingList}
          setShoppingList={setShoppingList}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={createButtonClick}>Create</Button>
      </ModalFooter>
    </BootstrapModal>
  );
};

ShoppingListCreateModal.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      },
    ).isRequired,
  ).isRequired,
  shoppingLists: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        invitees: PropTypes.arrayOf(
          PropTypes.shape(
            {
              id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
            },
          ),
        ).isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape(
            {
              id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              quantity: PropTypes.string.isRequired,
              resolved: PropTypes.bool.isRequired,
            },
          ),
        ).isRequired,
      },
    ),
  ).isRequired,
  setShoppingLists: PropTypes.func.isRequired,
};

export default ShoppingListCreateModal;
