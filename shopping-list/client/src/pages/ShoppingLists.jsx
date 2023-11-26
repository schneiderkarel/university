import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import {
  Card as CardWrap, Col, FormCheck, Row,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import { mdiPlaylistPlus } from '@mdi/js';
import ShoppingListCreateModalContent from '../components/ShoppingListCreateModalContent';
import ShoppingListCard from '../components/ShoppingListCard';
import { shoppingListType, userType } from '../types/types';
import ModalContext from '../context/modal.context';
import Modal from '../components/Modal';

const ShoppingLists = ({
  users,
  shoppingLists,
  setShoppingLists,
}) => {
  const [modalContent, setModalContent] = useContext(ModalContext);

  const [unarchivedFilter, setUnarchivedFilter] = useState(false);

  const filtersSection = () => (
    <div className="mt-3">
      <h5>Filters</h5>

      <FormCheck
        type="switch"
        className="mt-3 mb-3"
        label="Unarchived"
        onChange={() => setUnarchivedFilter(!unarchivedFilter)}
      />
    </div>
  );

  const applyUnarchivedFilter = (lists) => (
    unarchivedFilter
      ? lists.filter((shoppingList) => !shoppingList.archived)
      : lists
  );

  const displayShoppingLists = () => {
    let notArchived = shoppingLists.filter((shoppingList) => !shoppingList.archived);
    let archived = shoppingLists.filter((shoppingList) => shoppingList.archived);

    notArchived = notArchived.sort((a, b) => a.name.localeCompare(b.name));
    archived = archived.sort((a, b) => a.name.localeCompare(b.name));

    return applyUnarchivedFilter(notArchived.concat(archived));
  };

  return (
    <Container className="mb-5">
      {modalContent !== null && (
        <Modal />
      )}

      {filtersSection()}

      <hr />

      <Row className="d-flex justify-content-center align-items-center">
        <Col className="d-flex justify-content-evenly mt-3">
          <CardWrap
            style={{
              width: '17rem',
              minHeight: '31rem',
              maxHeight: '31rem',
              cursor: 'pointer',
            }}
            onClick={() => {
              setModalContent(
                <ShoppingListCreateModalContent
                  users={users}
                  shoppingLists={shoppingLists}
                  setShoppingLists={setShoppingLists}
                />,
              );
            }}
          >
            <Button className="h-100" variant="light">
              <Icon path={mdiPlaylistPlus} size={1.5} />
              <h6>New shopping list</h6>
            </Button>
          </CardWrap>
        </Col>

        {displayShoppingLists()
          .map(
            (shoppingList) => (
              <Col
                key={shoppingList.id}
                className="d-flex justify-content-evenly mt-3"
              >
                <ShoppingListCard
                  shoppingList={shoppingList}
                  link={`/shopping-lists/${shoppingList.id}`}
                  shoppingLists={shoppingLists}
                  setShoppingLists={setShoppingLists}
                />
              </Col>
            ),
          )}
      </Row>
    </Container>
  );
};

ShoppingLists.propTypes = {
  users: PropTypes.arrayOf(userType().isRequired).isRequired,
  shoppingLists: PropTypes.arrayOf(shoppingListType().isRequired).isRequired,
  setShoppingLists: PropTypes.func.isRequired,
};

export default ShoppingLists;
