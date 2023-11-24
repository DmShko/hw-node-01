  const { nanoid } = require('nanoid');
  const fs = require('fs/promises');
  // const fs = require('fs').promises;
  const path = require('path');

  const contactsPath = path.join(__dirname, 'db/contacts.json');
 
  async function listContacts() {
    // Повертає масив контактів.
   
    return JSON.parse(await fs.readFile(contactsPath));
  }
  
  async function getContactById(contactId) {
    // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.

    return JSON.parse(await fs.readFile(contactsPath)).find(value => value.id === contactId) || null;
  }
  
  async function removeContact(contactId) {
    // Повертає об'єкт без видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.

    // search contact by id
    const deleteElement = await getContactById(contactId);

    // get full list from file
    const valueArray = await listContacts();

    // rewrite new array to file
    await fs.writeFile(contactsPath, JSON.stringify(valueArray.filter(value => value.id != contactId), null, 2));
    return deleteElement;
  }
  
  async function addContact(data) {

    // Повертає об'єкт доданого контакту. 
    const newContact = {id: nanoid(), ...data};

    // get full list from file
    const value = await listContacts();

    // add new contact to array
    value.push(newContact);

    // rewrite new array to file
    await fs.writeFile(contactsPath, JSON.stringify(value, null, 2));

    return newContact;
  }

  module.exports = {listContacts, getContactById, removeContact, addContact};
 