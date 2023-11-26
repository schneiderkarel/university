import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ShoppingListForm } from './ShoppingListForm';
import { ShoppingListItems } from './ShoppingListItems';
import { isUserShoppingListOwner } from './helper';
import { shoppingListType, userType } from '../types/types';

const ShoppingListDetail = ({
  users,
  shoppingLists,
  setShoppingLists,
}) => {
  const { id } = useParams();

  const [shoppingList, setShoppingList] = useState(shoppingLists.find((s) => id === s.id));

  const saveButtonClick = () => {
    const restShoppingLists = shoppingLists.filter((item) => item.id !== shoppingList.id);
    setShoppingLists([...restShoppingLists, shoppingList]);
  };

  const leaveButtonClick = () => {
    const shoppingListsWithoutCurrent = shoppingLists.filter((item) => item.id !== shoppingList.id);
    setShoppingLists([...shoppingListsWithoutCurrent]);
  };

  return (
    <Container className="mt-3 mb-3">
      <Form onSubmit={(e) => e.preventDefault()}>
        <div className="d-flex justify-content-center">
          <ShoppingListForm
            users={users}
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
    </Container>
  );
};

ShoppingListDetail.propTypes = {
  users: PropTypes.arrayOf(userType().isRequired).isRequired,
  shoppingLists: PropTypes.arrayOf(shoppingListType()).isRequired,
  setShoppingLists: PropTypes.func.isRequired,
};

export default ShoppingListDetail;
