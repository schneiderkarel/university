import PropTypes from 'prop-types';
import { FormCheck, FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ShoppingListItem from './ShoppingListItem';

export const ShoppingListItems = (prop) => {
  const [items, setItems] = useState(prop.shoppingListItems);

  useEffect(() => {
    prop.setShoppingList((prev) => ({ ...prev, items }));
  }, [items, prop.setShoppingList]);

  const itemsNotEmpty = (its) => its?.length !== 0;

  const addItemButtonClick = () => {
    if (items.filter((item) => item.name === '' || item.quantity === '').length !== 0) {
      return;
    }

    setItems((prevItems) => [...prevItems, {
      id: uuidv4(), name: '', quantity: '', resolved: false,
    }]);
  };

  const handleItemChange = (itemId, newValue) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...newValue } : item)));
  };

  const handleItemRemove = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const [unresolvedFilterCheck, setUnresolvedFilterCheck] = useState(false);

  const displayShoppingListItems = () => {
    let its = items;

    if (unresolvedFilterCheck) {
      its = items.filter((item) => !item.resolved);
    }

    return (
      its.map((item) => (
        <ShoppingListItem
          key={item.id}
          shoppingListItem={item}
          shoppingListItemChange={handleItemChange}
          shoppingListItemRemove={handleItemRemove}
        />
      ))
    );
  };

  return (
    <FormGroup className="w-50 ms-5">
      <h4>Items</h4>

      {itemsNotEmpty(items) ? (
        <div className="mt-3 mb-3">
          <FormCheck
            type="switch"
            className="mt-3 mb-3"
            label="Unresolved"
            checked={unresolvedFilterCheck}
            onChange={() => setUnresolvedFilterCheck(!unresolvedFilterCheck)}
          />
          {displayShoppingListItems()}
        </div>
      ) : (
        <h6 className="mt-3 mb-3">No items to display.</h6>
      )}

      <div className="d-flex align-items-center justify-content-between">
        <Button
          variant="secondary"
          size="sm"
          onClick={addItemButtonClick}
        >
          Add item
        </Button>
        {itemsNotEmpty(items) && (
          <span className="text-secondary">
            {`Resolved items: ${items.filter((item) => item.resolved).length}/${items.length}`}
          </span>
        )}
      </div>
    </FormGroup>
  );
};

ShoppingListItems.propTypes = {
  shoppingListItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    resolved: PropTypes.bool.isRequired,
  })).isRequired,
  setShoppingList: PropTypes.func.isRequired,
};

export default ShoppingListItems;
