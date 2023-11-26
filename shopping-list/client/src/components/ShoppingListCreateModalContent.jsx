import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ShoppingListCreateForm } from '../pages/ShoppingListCreateForm';
import { emptyShoppingList } from '../pages/helper';
import { shoppingListType, userType } from '../types/types';
import ModalContext from '../context/modal.context';

const ShoppingListCreateModalContent = ({
  users,
  shoppingLists,
  setShoppingLists,
}) => {
  const navigate = useNavigate();

  const [, setContent] = useContext(ModalContext);

  const [shoppingList, setShoppingList] = useState(emptyShoppingList());

  const createButtonClick = () => {
    const restShoppingLists = shoppingLists.filter((item) => item.id !== shoppingList.id);
    setShoppingLists([...restShoppingLists, shoppingList]);
    navigate(`/shopping-lists/${shoppingList.id}`);
    setContent(null);
  };

  const closeButtonClick = () => {
    const shoppingListsWithoutCurrent = shoppingLists.filter((item) => item.id !== shoppingList.id);
    setShoppingLists([...shoppingListsWithoutCurrent]);
  };

  const handleClose = () => {
    setContent(null);
    closeButtonClick();
  };

  return (
    <div>
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
    </div>
  );
};

ShoppingListCreateModalContent.propTypes = {
  users: PropTypes.arrayOf(userType().isRequired).isRequired,
  shoppingLists: PropTypes.arrayOf(shoppingListType().isRequired).isRequired,
  setShoppingLists: PropTypes.func.isRequired,
};

export default ShoppingListCreateModalContent;
