import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { Card as CardWrap, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import { mdiPlaylistPlus } from '@mdi/js';
import ShoppingListCreateModal from '../components/ShoppingListCreateModal';
import Card from '../components/Card';
import ModalContext from '../context/modal.context';

const ShoppingLists = ({ users, shoppingLists, setShoppingLists }) => {
  const [, setShowModal] = useContext(ModalContext);

  return (
    <Container className="d-flex justify-content-center align-items-center mb-5">
      <ShoppingListCreateModal
        users={users}
        shoppingLists={shoppingLists}
        setShoppingLists={setShoppingLists}
      />

      <Row>
        <Col className="d-flex justify-content-evenly mt-5">
          <CardWrap
            style={{ width: '17rem', minHeight: '30rem', cursor: 'pointer' }}
            onClick={() => {
              setShowModal(true);
            }}
          >
            <Button className="h-100" variant="light">
              <Icon path={mdiPlaylistPlus} size={1.5} />
              <h6>New shopping list</h6>
            </Button>
          </CardWrap>
        </Col>

        {shoppingLists.sort((a, b) => a.name.localeCompare(b.name)).map(
          (shoppingList) => (
            <Col
              key={shoppingList.id}
              className="d-flex justify-content-evenly mt-5"
            >
              <Card
                id={shoppingList.id}
                title={shoppingList.name}
                image={shoppingList.image}
                description={shoppingList.description}
                link={`/shopping-lists/${shoppingList.id}`}
              />
            </Col>
          ),
        )}
      </Row>
    </Container>
  );
};

ShoppingLists.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      },
    ).isRequired,
  ).isRequired,
  shoppingLists: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        invitees: PropTypes.arrayOf(
          PropTypes.shape(
            {
              id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
            },
          ),
        ),
        items: PropTypes.arrayOf(
          PropTypes.shape(
            {
              id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              quantity: PropTypes.string.isRequired,
              resolved: PropTypes.bool.isRequired,
            },
          ),
        ).isRequired,
      },
    ),
  ).isRequired,
  setShoppingLists: PropTypes.func.isRequired,
};

export default ShoppingLists;
