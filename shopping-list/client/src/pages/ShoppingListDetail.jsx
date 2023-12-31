import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Form, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ShoppingListForm } from './ShoppingListForm';
import { ShoppingListItems } from './ShoppingListItems';
import { isUserShoppingListOwner } from './helper';
import CallerContext from '../context/caller.context';
import Client from '../client/client';

const ShoppingListDetail = () => {
  const { id } = useParams();
  const client = new Client();

  const [caller] = useContext(CallerContext);
  const [shoppingList, setShoppingList] = useState();

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const resp = await client.shoppingList(caller, id);
        setShoppingList(resp);
      } catch (err) {
        console.error(err);
      }
    };

    fetchShoppingList();
  }, [caller]);

  const saveButtonClick = async () => {
    const updateShoppingList = {
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
      const resp = await client.updateShoppingList(caller, id, updateShoppingList);
      setShoppingList(resp);
    } catch (err) {
      console.error(err);
    }
  };

  const leaveButtonClick = async () => {
    try {
      await client.leaveShoppingList(caller, id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="mt-3 mb-3">
      {shoppingList ? (
        <Form onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex justify-content-center">
            <ShoppingListForm
              shoppingList={shoppingList}
              setShoppingList={setShoppingList}
            />
            <ShoppingListItems
              shoppingListItems={shoppingList.items}
              setShoppingList={setShoppingList}
            />
          </div>

          <Button
            variant="primary"
            onClick={saveButtonClick}
          >
            Save
          </Button>
          {!isUserShoppingListOwner(shoppingList) && (
            <Button
              variant="danger"
              href="/"
              onClick={leaveButtonClick}
              style={{ marginLeft: '1rem' }}
            >
              Leave
            </Button>
          )}
        </Form>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default ShoppingListDetail;
