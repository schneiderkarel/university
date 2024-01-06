import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormCheck, FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import ShoppingListItem from './ShoppingListItem';
import { shoppingListItemType } from '../types/types';
import ShoppingListItemsPieChart from '../components/ShoppingListItemsPieChart';

const ShoppingListItems = ({ shoppingListItems, setShoppingList }) => {
  const { t } = useTranslation();

  const [items, setItems] = useState(shoppingListItems);

  useEffect(() => {
    setShoppingList((prev) => ({ ...prev, items }));
  }, [items, setShoppingList]);

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
      <h4>{t('ShoppingListItems.title')}</h4>

      {itemsNotEmpty(items) ? (
        <div className="mt-3 mb-3">
          <FormCheck
            type="switch"
            className="mt-3 mb-3"
            label={t('ShoppingListItems.filters.unresolved')}
            checked={unresolvedFilterCheck}
            onChange={() => setUnresolvedFilterCheck(!unresolvedFilterCheck)}
          />
          {displayShoppingListItems()}
        </div>
      ) : (
        <h6 className="mt-3 mb-3">{t('ShoppingListItems.empty')}</h6>
      )}

      <div className="d-flex align-items-center justify-content-between">
        <Button
          variant="secondary"
          size="sm"
          onClick={addItemButtonClick}
        >
          {t('ShoppingListItems.button')}
        </Button>

        {itemsNotEmpty(items) && (
          <span className="text-secondary">
            {`${t('ShoppingListItems.summary')} ${items.filter((item) => item.resolved).length}/${items.length}`}
          </span>
        )}
      </div>

      {itemsNotEmpty(items) && (
        <div className="d-flex align-items-center justify-content-center my-5 h-50">
          <ShoppingListItemsPieChart items={shoppingListItems} />
        </div>
      )}
    </FormGroup>
  );
};

ShoppingListItems.propTypes = {
  shoppingListItems: PropTypes.arrayOf(shoppingListItemType().isRequired).isRequired,
  setShoppingList: PropTypes.func.isRequired,
};

export default ShoppingListItems;
