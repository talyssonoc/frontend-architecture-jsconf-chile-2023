import { Entry } from 'src/domain/Entry';
import { useContainer } from '../di/useContainer';
import { EntryForm } from './EntryForm';
import { LoadingEntryForm } from './LoadingEntryForm';

type UpdateEntryFormProps = {
  entryId: number;
  onCancel: () => void;
};

const UpdateEntryForm = ({ entryId, onCancel }: UpdateEntryFormProps) => {
  const { useEntry } = useContainer();

  const { data: entry, isLoading } = useEntry(entryId);

  if (isLoading) {
    return <LoadingEntryForm />;
  }

  return <LoadedEntryForm entry={entry!} onCancel={onCancel} />;
};

type LoadedEntryFormProps = {
  entry: Entry.Type;
  onCancel: () => void;
};

const LoadedEntryForm = ({ entry, onCancel }: LoadedEntryFormProps) => {
  const { useUpdateEntry } = useContainer();
  const { entryIntent, isUpdating, changeTitle, changeContent, updateEntry } = useUpdateEntry(entry);

  return (
    <EntryForm
      entryIntent={entryIntent}
      onTitleChange={changeTitle}
      onContentChange={changeContent}
      onSubmit={updateEntry}
      onCancel={onCancel}
      submitText="Update"
      disabled={isUpdating}
    />
  );
};

export { UpdateEntryForm };
