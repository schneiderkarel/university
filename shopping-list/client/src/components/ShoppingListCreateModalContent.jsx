import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShoppingListCreateForm from '../pages/ShoppingListCreateForm';
import { emptyShoppingList } from '../pages/helper';
import ModalContext from '../context/modal.context';
import Client from '../client/client';
import CallerContext from '../context/caller.context';
import AlertContext from '../context/alert.context';

const ShoppingListCreateModalContent = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const client = new Client();
  const [caller] = useContext(CallerContext);

  const [, setContent] = useContext(ModalContext);
  const [, setAlert] = useContext(AlertContext);

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
      setAlert({ variant: 'success', message: t('Alert.createShoppingList.message') });
    } catch (err) {
      setAlert({ variant: 'danger', message: err.message });
    }
  };

  const handleClose = () => {
    setContent(null);
  };

  return (
    <div>
      <ModalHeader closeButton>
        <ModalTitle>{t('ShoppingListCreateModalContent.title')}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <ShoppingListCreateForm
          shoppingList={shoppingList}
          setShoppingList={setShoppingList}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          {t('ShoppingListCreateModalContent.buttons.close')}
        </Button>
        <Button variant="primary" onClick={createButtonClick}>
          {t('ShoppingListCreateModalContent.buttons.create')}
        </Button>
      </ModalFooter>
    </div>
  );
};

export default ShoppingListCreateModalContent;
