import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import {
  Card as CardWrap, Col, FormCheck, Row,
} from 'react-bootstrap';
import { mdiPlaylistPlus } from '@mdi/js';
import Icon from '@mdi/react';
import Button from 'react-bootstrap/Button';
import ShoppingListCard from '../components/ShoppingListCard';
import ModalContext from '../context/modal.context';
import Modal from '../components/Modal';
import CallerContext from '../context/caller.context';
import Client from '../client/client';
import ShoppingListCreateModalContent from '../components/ShoppingListCreateModalContent';
import AlertContext from '../context/alert.context';

const ShoppingLists = () => {
  const [modalContent, setModalContent] = useContext(ModalContext);
  const [caller] = useContext(CallerContext);
  const [, setAlert] = useContext(AlertContext);

  const [shoppingLists, setShoppingLists] = useState([]);

  const client = new Client();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await client.user(caller);
        setShoppingLists(resp.shoppingLists);
      } catch (err) {
        setAlert({ variant: 'danger', message: err.message });
      }
    };

    fetchUser();
  }, [caller]);

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
                <ShoppingListCreateModalContent />,
              );
            }}
          >
            <Button className="h-100" variant="outline-secondary">
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
                <ShoppingListCard id={shoppingList.id} />
              </Col>
            ),
          )}
      </Row>
    </Container>
  );
};

export default ShoppingLists;
