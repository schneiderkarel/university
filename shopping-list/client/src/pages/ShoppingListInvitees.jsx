import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormSelect, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import ShoppingListInvitee from './ShoppingListInvitee';
import { shoppingListInviteeType } from '../types/types';
import CallerContext from '../context/caller.context';
import Client from '../client/client';
import AlertContext from '../context/alert.context';

const ShoppingListInvitees = ({
  shoppingListInvitees,
  setShoppingList,
}) => {
  const { t } = useTranslation();

  const client = new Client();
  const [caller] = useContext(CallerContext);
  const [, setAlert] = useContext(AlertContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resp = await client.users(caller);
        setUsers(resp.filter((user) => user.id !== caller));
      } catch (err) {
        setAlert({ variant: 'danger', message: err.message });
      }
    };

    fetchUsers();
  }, [caller]);

  const [invitees, setInvitees] = useState(shoppingListInvitees);

  useEffect(() => {
    setShoppingList((prev) => ({
      ...prev,
      invitees,
    }));
  }, [invitees, setShoppingList]);

  const [selectedInvitee, setSelectedInvitee] = useState({});

  const inviteeSelectChange = (e) => setSelectedInvitee(
    users.find((user) => user.id === e.target.value),
  );

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
    const usersWithoutAlreadyInvitedUsers = users.filter(
      (user) => !invitees.some((invitee) => invitee.id === user.id),
    );

    const sortedUsersWithoutAlreadyInvitedUsers = usersWithoutAlreadyInvitedUsers.sort(
      (a, b) => a.name.localeCompare(b.name),
    );

    return (
      sortedUsersWithoutAlreadyInvitedUsers.map((user) => (
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
      <h4>{t('ShoppingListInvitees.title')}</h4>

      {inviteesNotEmpty(invitees)
        ? invitees.map((item) => (
          <ShoppingListInvitee
            key={item.id}
            shoppingListInvitee={item}
            removeShoppingListInvitee={removeShoppingListInvitee}
          />
        ))
        : (
          <h6 className="mt-3 mb-3">{t('ShoppingListInvitees.empty')}</h6>
        )}

      <InputGroup className="mt-3 mb-3">
        <FormSelect onChange={(e) => inviteeSelectChange(e)}>
          <option>{`${t('ShoppingListInvitees.optionHeader')} - `}</option>
          {displayInviteUserOptions()}
        </FormSelect>
        <Button
          variant="secondary"
          onClick={inviteButtonClick}
        >
          {t('ShoppingListInvitees.button')}
        </Button>
      </InputGroup>
    </FormGroup>
  );
};

ShoppingListInvitees.propTypes = {
  shoppingListInvitees: PropTypes.arrayOf(shoppingListInviteeType().isRequired).isRequired,
  setShoppingList: PropTypes.func.isRequired,
};

export default ShoppingListInvitees;
