import { Entry } from 'src/domain/Entry';
import { useContainer } from '../di/useContainer';
import { EntryForm } from './EntryForm';

type CreateEntryFormProps = {
  onCreate: (entry: Entry.Type) => void;
};

const CreateEntryForm = ({ onCreate }: CreateEntryFormProps) => {
  const { useCreateEntry } = useContainer();
  const { entryIntent, isCreating, changeTitle, changeContent, changeDate, createEntry } = useCreateEntry();

  const handleSubmit = () => {
    createEntry().then(onCreate);
  };

  return (
    <EntryForm
      entryIntent={entryIntent}
      onTitleChange={changeTitle}
      onContentChange={changeContent}
      onDateChange={changeDate}
      onSubmit={handleSubmit}
      submitText="Add"
      disabled={isCreating}
    />
  );
};

export { CreateEntryForm };
