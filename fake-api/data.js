let currentEntryId = 1;

const data = {
  entries: [
    {
      id: currentEntryId++,
      title: 'Hello, diary',
      text: 'Today I wrote my first diary entry and I ran out of ideas to add to it',
      date: '2023-01-01',
    },
    {
      id: currentEntryId++,
      title: 'Ok, I will try again',
      text: 'So this is my second attempt on writing something cool here. Ok, here goes something cool: 🧊',
      date: '2023-01-02',
    },
    {
      id: currentEntryId++,
      title: 'My yesterday joke makes me cringe',
      text: 'Dear diary, I actually think my joke is funny, I regret nothing.',
      date: '2023-01-03',
    },
  ],
};

const addEntry = (newEntry) => {
  const entry = {
    ...newEntry,
    id: currentEntryId + 1,
  };

  validateEntry(entry);

  data.entries.push(entry);
  currentEntryId++;

  return entry;
};

const updateEntry = (entryId, changeset) => {
  const idExists = data.entries.some((entry) => entry.id === entryId);

  if (!idExists) {
    throw notFoundError(entryId);
  }

  const updatedEntry = {
    id: entryId,
    ...changeset,
  };

  validateEntry(updatedEntry);

  data.entries = data.entries.map((entry) => {
    if (entry.id !== entryId) {
      return entry;
    }

    return updatedEntry;
  });

  return updatedEntry;
};

const getAllEntries = () => data.entries;

const getEntryById = (id) => {
  const entry = data.entries.find((entry) => entry.id === id);

  if (!entry) {
    throw notFoundError(id);
  }

  return entry;
};

const validateEntry = (entry) => {
  if (typeof entry.id !== 'number') {
    throw validationError('Invalid id');
  }

  if (typeof entry.title !== 'string' || entry.title.length <= 5) {
    throw validationError(`Invalid title: ${entry.title}`);
  }

  if (typeof entry.text !== 'string' || entry.text.length <= 60) {
    throw validationError(`Invalid text ${entry.text}`);
  }
};

const validationError = (message) => {
  const error = Error(message);
  error.type = VALIDATION_ERROR;
  return error;
};

const notFoundError = (id) => {
  const error = Error(`Entry ${id} not found`);
  error.type = NOT_FOUND_ERROR;
  return error;
};

const VALIDATION_ERROR = 'VALIDATION_ERROR';
const NOT_FOUND_ERROR = 'NOT_FOUND_ERROR';

module.exports = {
  addEntry,
  updateEntry,
  getAllEntries,
  getEntryById,
  VALIDATION_ERROR,
  NOT_FOUND_ERROR,
};
