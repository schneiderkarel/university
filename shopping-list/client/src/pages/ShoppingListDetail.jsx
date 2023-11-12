import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ShoppingListForm from './ShoppingListForm';
import ShoppingListItems from './ShoppingListItems';
import { isUserShoppingListOwner } from './helper';

const ShoppingListDetail = ({ users, shoppingLists, setShoppingLists }) => {
  const { id } = useParams();

  const [shoppingList, setShoppingList] = useState(shoppingLists.find((shoppingList) => id === shoppingList.id));

  const saveButtonClick = () => {
    const restShoppingLists = shoppingLists.filter((item) => item.id !== shoppingList.id);
    setShoppingLists([...restShoppingLists, shoppingList]);
  };

  const leaveButtonClick = () => {
    const shoppingListsWithoutCurrent = shoppingLists.filter((item) => item.id !== shoppingList.id);
    setShoppingLists([...shoppingListsWithoutCurrent]);
  };

  return (
    <Container className="mt-5 mb-5">
      <Form onSubmit={(e) => e.preventDefault()}>
        <div className="d-flex justify-content-evenly">
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
          >
            Leave
          </Button>
        )}
      </Form>
    </Container>
  );
};

ShoppingListDetail.propTypes = {
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

export default ShoppingListDetail;
