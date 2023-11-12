import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Card from '../components/Card';

const ShoppingLists = (prop) => (
  <Container className="d-flex justify-content-center align-items-center mb-5">
    <Row>
      {prop.shoppingLists.sort((a, b) => a.name.localeCompare(b.name)).map(
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

ShoppingLists.propTypes = {
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
};

export default ShoppingLists;
