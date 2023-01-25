import { EntryRepository } from '../domain/EntryRepository';
import { ReduxStore } from '../readModel/redux/reduxStore';
import { entryApiSlice } from '../readModel/entry';

type Dependencies = {
  reduxStore: ReduxStore;
};

const makeRTKEntryRepository = ({ reduxStore }: Dependencies): EntryRepository => {
  return {
    async store(entry) {
      const response =
        'id' in entry
          ? await reduxStore.dispatch(entryApiSlice.endpoints.updateEntry.initiate(entry))
          : await reduxStore.dispatch(entryApiSlice.endpoints.addEntry.initiate(entry));

      console.log(response);

      if ('data' in response) {
        return response.data;
      }

      throw response.error;
    },
  };
};

export { makeRTKEntryRepository };
