import PropTypes from 'prop-types';
import {
  Card as CardWrap,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  DropdownDivider,
  DropdownItem,
  SplitButton,
} from 'react-bootstrap';
import React, { useContext } from 'react';
import ModalContext from '../context/modal.context';
import ShoppingListRemoveModalContent from './ShoppingListRemoveModalContent';
import { shoppingListType } from '../types/types';
import { isUserShoppingListOwner } from '../pages/helper';

const ShoppingListCard = ({
  shoppingList,
  link,
  shoppingLists,
  setShoppingLists,
}) => {
  const [, setModalContent] = useContext(ModalContext);

  const TITLE_CHAR_CEILING = 20;
  const DESCRIPTION_CHAR_CEILING = 175;

  const ceilingText = (text, ceiling) => {
    if (text.length > ceiling) {
      return `${text.substring(0, ceiling)}...`;
    }

    return text;
  };

  const archiveButtonClick = () => {
    const shoppingListsWithoutCurrent = shoppingLists.filter((item) => item.id !== shoppingList.id);
    setShoppingLists([...shoppingListsWithoutCurrent, {
      ...shoppingList,
      archived: !shoppingList.archived,
    }]);
  };

  const removeButtonClick = () => {
    setModalContent(
      <ShoppingListRemoveModalContent
        id={shoppingList.id}
        shoppingLists={shoppingLists}
        setShoppingLists={setShoppingLists}
      />,
    );
  };

  const buttonSection = () => (
    <SplitButton
      href={link}
      variant="primary"
      title="Detail"
    >
      <DropdownItem
        eventKey="1"
        onClick={archiveButtonClick}
      >
        {shoppingList.archived ? 'Unarchive' : 'Archive'}
      </DropdownItem>

      {isUserShoppingListOwner(shoppingList) && (
        <div>
          <DropdownDivider />
          <DropdownItem
            eventKey="2"
            onClick={removeButtonClick}
          >
            Remove
          </DropdownItem>
        </div>
      )}
    </SplitButton>
  );

  return (
    <CardWrap
      key={shoppingList.id}
      style={{
        width: '17rem',
        minHeight: '31rem',
        maxHeight: '31rem',
      }}
    >
      <CardImg
        className="object-fit-none"
        style={{
          height: '190px',
          opacity: shoppingList.archived ? '0.5' : '1',
        }}
        variant="top"
        src={shoppingList.image}
      />
      <CardBody>
        <CardTitle>{ceilingText(shoppingList.name, TITLE_CHAR_CEILING)}</CardTitle>
        <CardText>
          {ceilingText(shoppingList.description, DESCRIPTION_CHAR_CEILING)}
        </CardText>
      </CardBody>
      <CardBody className="d-flex justify-content-end align-items-end">
        {buttonSection()}
      </CardBody>
    </CardWrap>
  );
};

ShoppingListCard.propTypes = {
  shoppingList: shoppingListType().isRequired,
  link: PropTypes.string.isRequired,
  shoppingLists: PropTypes.arrayOf(shoppingListType().isRequired).isRequired,
  setShoppingLists: PropTypes.func.isRequired,
};

export default ShoppingListCard;
