import PropTypes from 'prop-types';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { ShoppingListInvitees } from './ShoppingListInvitees';
import { isUserShoppingListOwner } from './helper';

export const ShoppingListForm = ({ users, shoppingList, setShoppingList }) => {
  const setName = (value) => {
    setShoppingList((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const setImage = (value) => {
    setShoppingList((prev) => ({
      ...prev,
      image: value,
    }));
  };

  const setDescription = (value) => {
    setShoppingList((prev) => ({
      ...prev,
      description: value,
    }));
  };

  return (
    <FormGroup className="mb-3 w-50">
      <h4>Detail</h4>

      <FormGroup className="mb-3 mt-3">
        <FormLabel>Name</FormLabel>
        <FormControl
          value={shoppingList.name}
          disabled={!isUserShoppingListOwner(shoppingList)}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="mb-3 mt-3">
        <FormLabel>Image</FormLabel>
        <FormControl
          value={shoppingList.image}
          onChange={(e) => setImage(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="mb-3 mt-3">
        <FormLabel>Description</FormLabel>
        <FormControl
          as="textarea"
          rows={10}
          value={shoppingList.description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ resize: 'none' }}
        />
      </FormGroup>

      {isUserShoppingListOwner(shoppingList) && (
        <ShoppingListInvitees
          users={users}
          shoppingListInvitees={shoppingList.invitees}
          setShoppingList={setShoppingList}
        />
      )}
    </FormGroup>
  );
};

ShoppingListForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      },
    ).isRequired,
  ).isRequired,
  shoppingList: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
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
  }).isRequired,
};

export default ShoppingListForm;
