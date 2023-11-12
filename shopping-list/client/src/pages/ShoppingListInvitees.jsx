import PropTypes from 'prop-types';
import { FormGroup, FormSelect, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import ShoppingListInvitee from './ShoppingListInvitee';

export const ShoppingListInvitees = (prop) => {
  const [invitees, setInvitees] = useState(prop.shoppingListInvitees);

  useEffect(() => {
    prop.setShoppingList((prev) => ({ ...prev, invitees }));
  }, [invitees, prop.setShoppingList]);

  const [selectedInvitee, setSelectedInvitee] = useState({});

  const inviteeSelectChange = (e) => setSelectedInvitee(prop.users.find((user) => user.id === e.target.value));

  const inviteesNotEmpty = (its) => its.length !== 0;

  const inviteButtonClick = () => {
    if (Object.keys(selectedInvitee).length === 0) {
      return;
    }

    setInvitees((prevItems) => [...prevItems, selectedInvitee]);
    setSelectedInvitee({});
  };

  const removeShoppingListInvitee = (itemId) => {
    setInvitees(invitees.filter((item) => item.id !== itemId));
  };

  const displayInviteUserOptions = () => {
    const usersWithoutAlreadyInvitedUsers = prop.users.filter((user) => !invitees.some((invitee) => invitee.id === user.id));

    return (
      usersWithoutAlreadyInvitedUsers.map((user) => (
        <option
          key={user.id}
          value={user.id}
        >
          {user.name}
        </option>
      ))
    );
  };

  return (
    <FormGroup className="mt-3 mb-3">
      <h4>Invitees</h4>

      {inviteesNotEmpty(invitees)
        ? invitees.map((item) => (
          <ShoppingListInvitee
            key={item.id}
            shoppingListInvitee={item}
            removeShoppingListInvitee={removeShoppingListInvitee}
          />
        ))
        : (
          <h6 className="mt-3 mb-3">No added invitees. Please add them by using the form below.</h6>
        )}

      <InputGroup className="mt-3 mb-3">
        <FormSelect onChange={(e) => inviteeSelectChange(e)}>
          <option>{'Invite user - '}</option>
          {displayInviteUserOptions()}
        </FormSelect>
        <Button
          variant="secondary"
          onClick={inviteButtonClick}
        >
          Invite
        </Button>
      </InputGroup>
    </FormGroup>
  );
};

ShoppingListInvitees.propTypes = {
  shoppingListInvitees: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      },
    ),
  ).isRequired,
  setShoppingList: PropTypes.func.isRequired,
};

export default ShoppingListInvitees;
