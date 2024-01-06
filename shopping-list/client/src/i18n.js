import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          UserCreateForm: {
            title: 'Welcome! What is your name?',
            name: 'Name',
            button: 'Create user',
          },
          ShoppingLists: {
            filters: {
              title: 'Filters',
              unarchived: 'Unarchived',
            },
            button: 'New shopping list',
          },
          ShoppingListItems: {
            title: 'Items',
            filters: {
              unresolved: 'Unresolved',
            },
            empty: 'No items to display.',
            button: 'Add item',
            summary: 'Resolved items',
          },
          ShoppingListItem: {
            quantity: 'Qty.',
          },
          ShoppingListInvitees: {
            title: 'Invitees',
            empty: 'No added invitees. Please add them by using the form below.',
            optionHeader: 'Invite user',
            button: 'Invite',
          },
          ShoppingListForm: {
            title: 'Detail',
            name: 'Name',
            image: 'Image',
            description: 'Description',
          },
          ShoppingListDetail: {
            buttons: {
              update: 'Save',
              leave: 'Leave',
            },
          },
          ShoppingListCreateForm: {
            title: 'Detail',
            name: 'Name',
            image: 'Image',
            description: 'Description',
          },
          NotFound: {
            message: 'page not found! 👀',
          },
          ShoppingListRemoveModalContent: {
            title: 'Are you sure you want to remove this shopping list?',
            buttons: {
              cancel: 'Cancel',
              remove: 'Remove',
            },
          },
          ShoppingListCreateModalContent: {
            buttons: {
              close: 'Close',
              create: 'Create',
            },
            title: 'New shopping list',
          },
          ShoppingListCard: {
            title: 'Detail',
            buttons: {
              archive: 'Archive',
              unarchive: 'Unarchive',
              remove: 'Remove',
            },
          },
          ShoppingListItemsPieChart: {
            titles: {
              resolved: 'Resolved',
              unresolved: 'Unresolved',
            },
          },
          Alert: {
            createShoppingList: {
              message: 'Shopping list created successfully.',
            },
            updateShoppingList: {
              message: 'Shopping list updated successfully.',
            },
          },
          Client: {
            users: {
              default: 'There was an unexpected error when loading users. Please, try again.',
            },
            createUser: {
              422: 'There is a problem with your input',
              default: 'There was an unexpected error when creating user. Please, try again.',
            },
            user: {
              404: 'User unexpectedly not found.',
              default: 'There was an unexpected error when loading the user. Please, try again.',
            },
            shoppingList: {
              400: 'You are not permitted to view the shopping list.',
              404: 'Shopping list unexpectedly not found.',
              default: 'There was an unexpected error when loading the shopping list. Please, try again.',
            },
            createShoppingList: {
              422: 'There is a problem with your input',
              default: 'There was an unexpected error when creating the shopping list. Please, try again.',
            },
            updateShoppingList: {
              404: 'Shopping list unexpectedly not found.',
              422: 'There is a problem with your input',
              default: 'There was an unexpected error when updating the shopping list. Please, try again.',
            },
            removeShoppingList: {
              400: 'You are not permitted to remove the shopping list.',
              default: 'There was an unexpected error when removing the shopping list. Please, try again.',
            },
            leaveShoppingList: {
              400: 'You are not permitted to leave the shopping list.',
              default: 'There was an unexpected error when removing the shopping list. Please, try again.',
            },
          },
        },
      },
      cz: {
        translation: {
          UserCreateForm: {
            title: 'Vítejte! Jak se jmenujete?',
            name: 'Jméno',
            button: 'Vytvořit uživatele',
          },
          ShoppingLists: {
            filters: {
              title: 'Filtry',
              unarchived: 'Nearchivované',
            },
            button: 'Nový nákupní seznam',
          },
          ShoppingListItems: {
            title: 'Položky',
            filters: {
              unresolved: 'Neoznačené',
            },
            empty: 'Žádné položky k zobrazení.',
            button: 'Přidat položku',
            summary: 'Dokončené položky',
          },
          ShoppingListItem: {
            quantity: 'Mnž.',
          },
          ShoppingListInvitees: {
            title: 'Pozvaní',
            empty: 'Nikdo není pozvaný. Přidejte je prosím pomocí formuláře níže.',
            optionHeader: 'Pozvete uživatele',
            button: 'Pozvat',
          },
          ShoppingListForm: {
            title: 'Detail',
            name: 'Jméno',
            image: 'Obrázek',
            description: 'Popis',
          },
          ShoppingListDetail: {
            buttons: {
              update: 'Uložit',
              leave: 'Opustit',
            },
          },
          ShoppingListCreateForm: {
            title: 'Detail',
            name: 'Jméno',
            image: 'Obrázek',
            description: 'Popis',
          },
          NotFound: {
            message: 'stránka nenalezena! 👀',
          },
          ShoppingListRemoveModalContent: {
            title: 'Opravdu jste si jistí, že chcete odstranit tento nákupní seznam?',
            buttons: {
              cancel: 'Zrušit',
              remove: 'Odstranit',
            },
          },
          ShoppingListCreateModalContent: {
            buttons: {
              close: 'Zavřít',
              create: 'Vytvořit',
            },
            title: 'Nový nákupní seznam',
          },
          ShoppingListCard: {
            title: 'Detail',
            buttons: {
              archive: 'Archivovat',
              unarchive: 'Obnovit',
              remove: 'Odstranit',
            },
          },
          ShoppingListItemsPieChart: {
            titles: {
              resolved: 'Označené',
              unresolved: 'Neoznačené',
            },
          },
          Alert: {
            createShoppingList: {
              message: 'Nákupní seznam byl úspěšně vytvořen.',
            },
            updateShoppingList: {
              message: 'Nákupní seznam byl úspěšně aktualizován.',
            },
          },
          Client: {
            users: {
              default: 'Při načítání uživatelů došlo k neočekávané chybě. Prosím zkuste to znovu.',
            },
            createUser: {
              422: 'Vyskytl se problém s vaším zadáním',
              default: 'Při vytváření uživatele došlo k neočekávané chybě. Prosím zkuste to znovu.',
            },
            user: {
              404: 'Uživatel neočekávaně nebyl nalezen.',
              default: 'Při načítání uživatele došlo k neočekávané chybě. Prosím zkuste to znovu.',
            },
            shoppingList: {
              400: 'Nemáte oprávnění prohlížet nákupní seznam.',
              404: 'Nákupní seznam neočekávaně nebyl nalezen.',
              default: 'Při načítání nákupního seznamu došlo k neočekávané chybě. Prosím zkuste to znovu.',
            },
            createShoppingList: {
              422: 'Vyskytl se problém s vaším zadáním',
              default: 'Při vytváření nákupního seznamu došlo k neočekávané chybě. Prosím zkuste to znovu.',
            },
            updateShoppingList: {
              404: 'Nemáte oprávnění prohlížet nákupní seznam.',
              422: 'Vyskytl se problém s vaším zadáním',
              default: 'Při aktualizaci nákupního seznamu došlo k neočekávané chybě. Prosím zkuste to znovu.',
            },
            removeShoppingList: {
              400: 'Nemáte oprávnění odstranit nákupní seznam.',
              default: 'Při odstraňování nákupního seznamu došlo k neočekávané chybě. Prosím zkuste to znovu.',
            },
            leaveShoppingList: {
              400: 'Nemáte oprávnění opustit tento nákupní seznam.',
              default: 'Při opouštění nákupního seznamu došlo k neočekávané chybě. Prosím zkuste to znovu.',
            },
          },
        },
      },
    },
  });

export default i18n;
