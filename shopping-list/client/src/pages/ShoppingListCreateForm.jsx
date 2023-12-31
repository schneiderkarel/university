import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { ShoppingListInvitees } from './ShoppingListInvitees';
import { ShoppingListItems } from './ShoppingListItems';
import { shoppingListType } from '../types/types';

export const ShoppingListCreateForm = ({ shoppingList, setShoppingList }) => {
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
    <div className="d-flex">
      <FormGroup className="mb-3 w-50">
        <h4>Detail</h4>

        <FormGroup className="mb-3 mt-3">
          <FormLabel>Name</FormLabel>
          <FormControl
            value={shoppingList.name}
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

        <ShoppingListInvitees
          shoppingListInvitees={shoppingList.invitees}
          setShoppingList={setShoppingList}
        />
      </FormGroup>

      <ShoppingListItems
        shoppingListItems={shoppingList.items}
        setShoppingList={setShoppingList}
      />
    </div>
  );
};

ShoppingListCreateForm.propTypes = {
  shoppingList: shoppingListType().isRequired,
  setShoppingList: PropTypes.func.isRequired,
};

export default ShoppingListCreateForm;
