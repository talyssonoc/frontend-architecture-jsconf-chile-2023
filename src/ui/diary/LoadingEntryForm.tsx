import { Backdrop, Box, CircularProgress, LinearProgress } from '@mui/material';
import { Entry } from 'src/domain/Entry';
import { EntryForm } from './EntryForm';

const emptyIntent = Entry.createEmptyIntent();
const noop = () => null;

const LoadingEntryForm = () => (
  <Box sx={{ width: '100%', position: 'relative' }}>
    <Backdrop open sx={{ position: 'absolute' }}>
      <CircularProgress />
    </Backdrop>
    <EntryForm
      entryIntent={emptyIntent}
      onTitleChange={noop}
      onContentChange={noop}
      onDateChange={noop}
      onSubmit={noop}
      showErrors={false}
      disabled
    />
  </Box>
);

export { LoadingEntryForm };
