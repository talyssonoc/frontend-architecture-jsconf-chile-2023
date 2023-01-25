import { EntryRepository } from 'src/domain/EntryRepository';
import { StatefulUseCase } from 'src/_lib/useCases/StatefulUseCase';
import { Entry } from '../../domain/Entry';

type UpdateEntry = StatefulUseCase<UpdateEntryInterface, UpdateEntryState, Entry.Type>;

type UpdateEntryInterface = {
  entryIntent: Entry.Intent;
  changeTitle: (newTitle: string) => void;
  changeContent: (newContent: string) => void;
  updateEntry: () => Promise<void>;
  isUpdating: boolean;
};

type UpdateEntryState = {
  entryIntent: Entry.Intent;
  isUpdating: boolean;
};

type Dependencies = {
  entryRepository: EntryRepository;
};

const makeUpdateEntry = ({ entryRepository }: Dependencies): UpdateEntry => ({
  initialState: (entry) => ({
    isUpdating: false,
    entryIntent: Entry.createIntentFrom(entry),
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

    const updateEntry = async () => {
      setState({ ...state, isUpdating: true });
      await entryRepository.store(state.entryIntent);
      setState({ ...state, isUpdating: false });
    };

    return {
      entryIntent: state.entryIntent,
      isUpdating: state.isUpdating,
      changeTitle,
      changeContent,
      updateEntry,
    };
  },
});

export { makeUpdateEntry };
