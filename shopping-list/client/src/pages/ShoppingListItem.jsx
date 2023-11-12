import PropTypes from 'prop-types';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import InputGroupText from 'react-bootstrap/InputGroupText';
import Button from 'react-bootstrap/Button';

export const ShoppingListItem = (prop) => {
  const [item, setItem] = useState(prop.shoppingListItem);

  const nameChange = (value) => {
    const newValue = { ...item, name: value };
    setItem(newValue);
    prop.shoppingListItemChange(item.id, newValue);
  };

  const quantityChange = (value) => {
    const newValue = { ...item, quantity: value };
    setItem(newValue);
    prop.shoppingListItemChange(item.id, newValue);
  };

  const resolvedChange = (value) => {
    const newValue = { ...item, resolved: value };
    setItem(newValue);
    prop.shoppingListItemChange(item.id, newValue);
  };

  return (
    <FormGroup className="mt-1 mb-1">
      <InputGroup size="sm" className="d-flex">
        <InputGroup.Checkbox
          checked={item.resolved}
          onChange={() => resolvedChange(!item.resolved)}
          className="m-0"
        />
        <FormControl
          style={{ width: '50%' }}
          value={item.name}
          onChange={(e) => nameChange(e.target.value)}
        />

        <InputGroupText>Qty.</InputGroupText>
        <FormControl
          value={item.quantity}
          onChange={(e) => quantityChange(e.target.value)}
        />

        <Button
          variant="outline-danger"
          onClick={() => prop.shoppingListItemRemove(item.id)}
        >
          x
        </Button>
      </InputGroup>
    </FormGroup>
  );
};

ShoppingListItem.propTypes = {
  shoppingListItem: PropTypes.shape(
    {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
      resolved: PropTypes.bool.isRequired,
    },
  ).isRequired,
  shoppingListItemChange: PropTypes.func,
  shoppingListItemRemove: PropTypes.func,
};

export default ShoppingListItem;
