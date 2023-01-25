import { Entry } from './Entry';

type EntryRepository = {
  store(entry: Entry.Any): Promise<Entry.Type>;
};

export { EntryRepository };
