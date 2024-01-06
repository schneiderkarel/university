export const defineShoppingListRole = (id, invitees) => {
  const filtered = invitees.filter((invitee) => invitee.id === id);
  return filtered.length === 0 ? 'owner' : 'invitee';
};

export const userHasShoppingList = (user, shoppingListId) => {
  const filtered = user.shoppingLists.filter(
    (shoppingList) => shoppingList.id === shoppingListId,
  );
  return filtered.length !== 0;
};
