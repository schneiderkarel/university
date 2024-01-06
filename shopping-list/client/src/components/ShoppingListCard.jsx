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
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalContext from '../context/modal.context';
import ShoppingListRemoveModalContent from './ShoppingListRemoveModalContent';
import { isUserShoppingListOwner } from '../pages/helper';
import CallerContext from '../context/caller.context';
import Client from '../client/client';
import AlertContext from '../context/alert.context';

const ShoppingListCard = ({ id }) => {
  const { t } = useTranslation();

  const [, setModalContent] = useContext(ModalContext);
  const client = new Client();
  const [caller] = useContext(CallerContext);
  const [, setAlert] = useContext(AlertContext);

  const [shoppingList, setShoppingList] = useState();

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const resp = await client.shoppingList(caller, id);
        setShoppingList(resp);
      } catch (err) {
        setAlert({ variant: 'danger', message: err.message });
      }
    };

    fetchShoppingList();
  }, [caller]);

  const TITLE_CHAR_CEILING = 20;
  const DESCRIPTION_CHAR_CEILING = 175;

  const ceilingText = (text, ceiling) => {
    if (text.length > ceiling) {
      return `${text.substring(0, ceiling)}...`;
    }

    return text;
  };

  const archiveButtonClick = async () => {
    const updateShoppingList = {
      name: shoppingList.name,
      image: shoppingList.image,
      description: shoppingList.description,
      archived: !shoppingList.archived,
      invitees: shoppingList.invitees.map((invitee) => ({ id: invitee.id })),
      items: shoppingList.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        resolved: item.resolved,
      })),
    };

    try {
      const resp = await client.updateShoppingList(caller, id, updateShoppingList);
      setShoppingList(resp);
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  const removeButtonClick = () => {
    setModalContent(
      <ShoppingListRemoveModalContent id={shoppingList.id} />,
    );
  };

  const buttonSection = () => (
    <SplitButton
      className="d-flex align-items-end"
      href={`/shopping-lists/${shoppingList.id}`}
      variant="primary"
      title={t('ShoppingListCard.title')}
    >
      <DropdownItem
        eventKey="1"
        onClick={archiveButtonClick}
      >
        {shoppingList.archived
          ? t('ShoppingListCard.buttons.unarchive')
          : t('ShoppingListCard.buttons.archive')}
      </DropdownItem>

      {isUserShoppingListOwner(shoppingList) && (
        <div>
          <DropdownDivider />
          <DropdownItem
            eventKey="2"
            onClick={removeButtonClick}
          >
            {t('ShoppingListCard.buttons.remove')}
          </DropdownItem>
        </div>
      )}
    </SplitButton>
  );

  return shoppingList ? (
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
      <CardBody className="d-flex align-items-end justify-content-between">
        <div className="d-flex align-items-center">
          <span className="d-flex align-items-center small">
            {`Items: ${shoppingList.items.filter((item) => item.resolved).length}/${shoppingList.items.length}`}
          </span>
        </div>
        <div className="d-flex justify-content-end">{buttonSection()}</div>
      </CardBody>
    </CardWrap>
  ) : (
    <div />
  );
};

ShoppingListCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShoppingListCard;
