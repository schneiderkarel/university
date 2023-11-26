import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import InputGroupText from 'react-bootstrap/InputGroupText';

export const ShoppingListInvitee = ({ shoppingListInvitee, removeShoppingListInvitee }) => {
  const removeInviteeButtonClick = () => removeShoppingListInvitee(shoppingListInvitee.id);

  return (
    <FormGroup className="mt-2 mb-2">
      <InputGroup size="sm">
        <InputGroupText>{shoppingListInvitee.name}</InputGroupText>
        <Button
          variant="outline-danger"
          onClick={removeInviteeButtonClick}
        >
          x
        </Button>
      </InputGroup>
    </FormGroup>
  );
};

ShoppingListInvitee.propTypes = {
  shoppingListInvitee: PropTypes.shape(
    {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    },
  ).isRequired,
  removeShoppingListInvitee: PropTypes.func.isRequired,
};

export default ShoppingListInvitee;
