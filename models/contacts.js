const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const allContactsRead = await fs.readFile(contactsPath);

  const contacts = JSON.parse(allContactsRead);

  return contacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();

  const contact = allContacts.find((el) => el.id === contactId);

  if (!contact) return null;

  return contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();

  const idxRemoveContact = allContacts.findIndex((el) => el.id === contactId);

  if (idxRemoveContact === -1) return null;

  const [deletedContact] = allContacts.splice(idxRemoveContact, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();

  const addedContact = { id: v4(), name, email, phone };

  allContacts.push(addedContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return addedContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();

  const updateIndex = allContacts.findIndex(({ id }) => id === contactId);

  if (updateIndex === -1) return null;

  const { id } = allContacts[updateIndex];

  const updatedContact = { id, ...body };

  allContacts.splice(updateIndex, 1, updatedContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
