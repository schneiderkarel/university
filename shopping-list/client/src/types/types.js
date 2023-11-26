import PropTypes from 'prop-types';

export const userType = () => PropTypes.shape(
  {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  },
);

export const shoppingListInviteeType = () => PropTypes.shape(
  {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  },
);

export const shoppingListItemType = () => PropTypes.shape(
  {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    resolved: PropTypes.bool.isRequired,
  },
);

export const shoppingListType = () => PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  invitees: PropTypes.arrayOf(shoppingListInviteeType().isRequired).isRequired,
  items: PropTypes.arrayOf(shoppingListItemType().isRequired).isRequired,
});
