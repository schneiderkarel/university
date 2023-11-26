import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { Card as CardWrap, Col, Row } from 'react-bootstrap';
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

  return (
    <Container className="d-flex justify-content-center align-items-center mb-5">
      {modalContent !== null && (
        <Modal />
      )}

      <Row>
        <Col className="d-flex justify-content-evenly mt-5">
          <CardWrap
            style={{
              width: '17rem',
              minHeight: '30rem',
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

        {shoppingLists.sort((a, b) => a.name.localeCompare(b.name))
          .map(
            (shoppingList) => (
              <Col
                key={shoppingList.id}
                className="d-flex justify-content-evenly mt-5"
              >
                <ShoppingListCard
                  id={shoppingList.id}
                  title={shoppingList.name}
                  image={shoppingList.image}
                  description={shoppingList.description}
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
