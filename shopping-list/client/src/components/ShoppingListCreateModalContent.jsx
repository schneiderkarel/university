import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ShoppingListCreateForm } from '../pages/ShoppingListCreateForm';
import { emptyShoppingList } from '../pages/helper';
import ModalContext from '../context/modal.context';
import Client from '../client/client';
import CallerContext from '../context/caller.context';

const ShoppingListCreateModalContent = () => {
  const navigate = useNavigate();
  const client = new Client();
  const [caller] = useContext(CallerContext);

  const [, setContent] = useContext(ModalContext);

  const [shoppingList, setShoppingList] = useState(emptyShoppingList());

  const createButtonClick = async () => {
    const createShoppingList = {
      name: shoppingList.name,
      image: shoppingList.image,
      description: shoppingList.description,
      archived: shoppingList.archived,
      invitees: shoppingList.invitees.map((invitee) => ({ id: invitee.id })),
      items: shoppingList.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        resolved: item.resolved,
      })),
    };

    try {
      const resp = await client.createShoppingList(caller, createShoppingList);
      navigate(`/shopping-lists/${resp.id}`);
      setContent(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setContent(null);
  };

  return (
    <div>
      <ModalHeader closeButton>
        <ModalTitle>New shopping list</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <ShoppingListCreateForm
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

export default ShoppingListCreateModalContent;
