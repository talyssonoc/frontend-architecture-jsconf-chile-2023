import { DateTime } from 'luxon';
import { EntryRepository } from 'src/domain/EntryRepository';
import { StatefulUseCase } from 'src/_lib/useCases/StatefulUseCase';
import { Entry } from '../../domain/Entry';

type CreateEntry = StatefulUseCase<CreateEntryInterface, CreateEntryState>;

type CreateEntryInterface = {
  entryIntent: Entry.Intent;
  isCreating: boolean;
  changeTitle: (newTitle: string) => void;
  changeContent: (newContent: string) => void;
  changeDate: (newDate: DateTime) => void;
  createEntry: () => Promise<Entry.Type>;
};

type CreateEntryState = {
  entryIntent: Entry.Intent;
  isCreating: boolean;
};

type Dependencies = {
  entryRepository: EntryRepository;
};

const makeCreateEntry = ({ entryRepository }: Dependencies): CreateEntry => ({
  initialState: () => ({
    isCreating: false,
    entryIntent: Entry.createEmptyIntent(),
  }),

  interface: ({ state, setState }) => {
    const changeTitle = (newTitle: string) => {
      setState({
        ...state,
        entryIntent: Entry.changeIntentTitle(state.entryIntent, newTitle),
      });
    };

    const changeContent = (newContent: string) => {
      setState({
        ...state,
        entryIntent: Entry.changeIntentContent(state.entryIntent, newContent),
      });
    };

    const changeDate = (newDate: DateTime) => {
      setState({
        ...state,
        entryIntent: Entry.changeIntentDate(state.entryIntent, newDate),
      });
    };

    const createEntry = async () => {
      setState({ ...state, isCreating: true });
      const newEntry = await entryRepository.store(state.entryIntent);
      setState({ ...state, isCreating: false });

      return newEntry;
    };

    return {
      entryIntent: state.entryIntent,
      isCreating: state.isCreating,
      changeTitle,
      changeContent,
      changeDate,
      createEntry,
    };
  },
});

export { makeCreateEntry };
