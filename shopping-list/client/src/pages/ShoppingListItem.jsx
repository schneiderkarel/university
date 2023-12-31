import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/InputGroupText';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { shoppingListItemType } from '../types/types';

const ShoppingListItem = ({
  shoppingListItem, shoppingListItemChange, shoppingListItemRemove,
}) => {
  const { t } = useTranslation();

  const [item, setItem] = useState(shoppingListItem);

  const nameChange = (value) => {
    const newValue = { ...item, name: value };
    setItem(newValue);
    shoppingListItemChange(item.id, newValue);
  };

  const quantityChange = (value) => {
    const newValue = { ...item, quantity: value };
    setItem(newValue);
    shoppingListItemChange(item.id, newValue);
  };

  const resolvedChange = (value) => {
    const newValue = { ...item, resolved: value };
    setItem(newValue);
    shoppingListItemChange(item.id, newValue);
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

        <InputGroupText>{t('ShoppingListItem.quantity')}</InputGroupText>
        <FormControl
          value={item.quantity}
          onChange={(e) => quantityChange(e.target.value)}
        />

        <Button
          variant="outline-danger"
          onClick={() => shoppingListItemRemove(item.id)}
        >
          x
        </Button>
      </InputGroup>
    </FormGroup>
  );
};

ShoppingListItem.propTypes = {
  shoppingListItem: shoppingListItemType().isRequired,
  shoppingListItemChange: PropTypes.func.isRequired,
  shoppingListItemRemove: PropTypes.func.isRequired,
};

export default ShoppingListItem;
