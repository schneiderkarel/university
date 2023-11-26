import { v4 as uuidv4 } from 'uuid';

export const isUserShoppingListOwner = (shoppingList) => shoppingList.role === 'owner';

export const emptyShoppingList = () => (
  {
    id: uuidv4(),
    name: '',
    image: '',
    role: 'owner',
    description: '',
    archived: false,
    invitees: [],
    items: [],
  }
);
