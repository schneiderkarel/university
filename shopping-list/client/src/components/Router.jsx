import {
  BrowserRouter as ReactRouter, Outlet, Route, Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShoppingLists from '../pages/ShoppingLists';
import ShoppingListDetail from '../pages/ShoppingListDetail';
import NavigationBar from './NavigationBar';
import NotFound from '../pages/NotFound';

const Router = () => {
  const mockUsers = [
    {
      id: 'bc3a0300-09e7-4f9d-a113-b0f5c3352def',
      name: 'Freddie Mercury',
    },
    {
      id: 'bdc5df1d-22ab-4e0d-9153-85603df62b48',
      name: 'Michael Jackson',
    },
    {
      id: '582fca36-0d89-4af4-b229-8d1db1f25c89',
      name: 'Jesse James',
    },
  ];

  const [shoppingLists, setShoppingLists] = useState(
    () => JSON.parse(localStorage.getItem('local')) || [
      {
        id: '4113ea29-3a49-4624-8de3-54d14f69ffea',
        name: 'Vegetables',
        image: 'https://hips.hearstapps.com/hmg-prod/images/how-to-save-money-on-groceries-1673472736.png?resize=980:*',
        role: 'owner',
        description: 'A vegetable shopping list is a list of fresh and healthy produce items you need to buy from the grocery store or market. It typically includes various vegetables such as tomatoes, lettuce, carrots, broccoli, onions, peppers, and any other specific vegetables you plan to use in your meals. This list helps you stay organized and ensure you have all the necessary ingredients for your recipes and a balanced diet.',
        items: [],
        invitees: [],
      },
      {
        id: '73efd4e8-d1f4-4fbf-8909-d7c94f51b41f',
        name: 'Birthday party',
        image: 'https://cms-tc.pbskids.org/parents/_pbsKidsForParentsThreeTwoRatioMedium/EWW-tablescape-hero.jpg',
        role: 'owner',
        description: 'A birthday party shopping list is a checklist of essential items and supplies needed to throw a successful birthday celebration. It typically includes items such as decorations, balloons, cake or cupcakes, party favors, beverages, snacks, and any other specific items required to make the birthday party memorable and enjoyable.',
        items: [
          {
            id: 'b3636ec2-018c-4fe1-b6e8-a5c10286e4e2',
            name: 'Milk',
            quantity: '500 ml',
            resolved: false,
          },
          {
            id: '74012b6d-712a-4b58-936d-15e2a5ba9a59',
            name: 'Eggs',
            quantity: '10',
            resolved: true,
          },
          {
            id: 'ac3db1dd-2ad9-47c2-88ac-1b44cd33808c',
            name: 'Bananas',
            quantity: '2',
            resolved: false,
          },
        ],
        invitees: [],
      },
      {
        id: '0679ce8d-729f-455a-81e1-5d0f931c9345',
        name: 'Beach camping',
        role: 'invitee',
        image: 'https://cdn2.stylecraze.com/wp-content/uploads/2022/03/Beach-Themed-Party-Ideas-For-Adults.jpg',
        description: "A beach shopping list is a checklist of must-have items for a perfect day at the beach, covering sun protection, comfort, shade, refreshments, and entertainment. Don't forget beach essentials like towels, swimwear, snacks, and fun beach toys!",
        items: [],
        invitees: [],
      },
      {
        id: 'ede48bc6-7bc3-4ebd-8987-2e5a61ceb244',
        name: 'Summer party',
        role: 'invitee',
        image: 'https://cdn.greenvelope.com/blog/wp-content/uploads/group-of-friends-in-a-party.jpg',
        description: 'A summer party shopping list is a concise inventory of items needed to host a fantastic summer gathering. It includes everything from food and drinks to decorations and entertainment, ensuring you have all you need for a memorable summer celebration.',
        items: [],
        invitees: [],
      },
    ],
  );

  useEffect(() => {
    localStorage.setItem('local', JSON.stringify(shoppingLists));
  }, [shoppingLists]);

  const routes = [
    {
      path: '/',
      element: <ShoppingLists shoppingLists={shoppingLists} />,
    },
    {
      path: '/shopping-lists/:id',
      element: <ShoppingListDetail
        users={mockUsers}
        shoppingLists={shoppingLists}
        setShoppingLists={setShoppingLists}
      />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];

  return (
    <ReactRouter basename="/">
      <NavigationBar />
      <Routes>
        <Route element={<Outlet />}>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </ReactRouter>
  );
};

export default Router;
