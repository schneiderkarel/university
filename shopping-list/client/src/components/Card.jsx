import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import {
  Card as CardWrap, CardBody, CardImg, CardText, CardTitle,
} from 'react-bootstrap';

const Card = (item) => {
  const TITLE_CHAR_CEILING = 20;
  const DESCRIPTION_CHAR_CEILING = 175;

  const ceilingText = (text, ceiling) => {
    if (text.length > ceiling) {
      return `${text.substring(0, ceiling)}...`;
    }

    return text;
  };

  return (
    <CardWrap key={item.id} style={{ width: '17rem' }}>
      <CardImg
        className="object-fit-none"
        style={{ height: '190px' }}
        variant="top"
        src={item.image}
      />
      <CardBody>
        <CardTitle>{ceilingText(item.title, TITLE_CHAR_CEILING)}</CardTitle>
        <CardText>
          {ceilingText(item.description, DESCRIPTION_CHAR_CEILING)}
        </CardText>
      </CardBody>
      <CardBody className="d-flex align-items-end">
        <Button
          href={item.link}
          variant="primary"
        >
          Detail
        </Button>
      </CardBody>
    </CardWrap>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card;
