export const defineShoppingListRole = (id, invitees) => {
  const occurrences = invitees.filter((invitee) => invitee.id === id);
  return occurrences.length === 0 ? 'owner' : 'invitee';
};
