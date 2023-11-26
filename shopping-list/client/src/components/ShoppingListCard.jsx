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

const ShoppingListCard = ({
  id,
  title,
  image,
  description,
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

  return (
    <CardWrap
      key={id}
      style={{
        width: '17rem',
        minHeight: '30rem',
      }}
    >
      <CardImg
        className="object-fit-none"
        style={{ height: '190px' }}
        variant="top"
        src={image}
      />
      <CardBody>
        <CardTitle>{ceilingText(title, TITLE_CHAR_CEILING)}</CardTitle>
        <CardText>
          {ceilingText(description, DESCRIPTION_CHAR_CEILING)}
        </CardText>
      </CardBody>
      <CardBody className="d-flex justify-content-end align-items-center">
        <SplitButton
          href={link}
          variant="primary"
          title="Detail"
        >
          <DropdownItem eventKey="1">Archive</DropdownItem>
          <DropdownDivider />
          <DropdownItem
            eventKey="2"
            onClick={() => {
              setModalContent(
                <ShoppingListRemoveModalContent
                  id={id}
                  shoppingLists={shoppingLists}
                  setShoppingLists={setShoppingLists}
                />,
              );
            }}
          >
            Delete
          </DropdownItem>
        </SplitButton>
      </CardBody>
    </CardWrap>
  );
};

ShoppingListCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  shoppingLists: PropTypes.arrayOf(shoppingListType().isRequired).isRequired,
  setShoppingLists: PropTypes.func.isRequired,
};

export default ShoppingListCard;
