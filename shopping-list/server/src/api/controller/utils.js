export const defineShoppingListRole = (id, invitees) => {
  const found = invitees.filter((invitee) => invitee.id === id);
  return found.length === 0 ? 'owner' : 'invitee';
};
