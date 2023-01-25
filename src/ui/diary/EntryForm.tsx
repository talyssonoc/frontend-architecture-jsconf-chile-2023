import { Button, ButtonGroup, Grid, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { FormEventHandler } from 'react';
import { Entry } from 'src/domain/Entry';

type Props = {
  entryIntent: Entry.Intent;
  onTitleChange: (newTitle: string) => void;
  onContentChange: (newContent: string) => void;
  onDateChange?: (newDate: DateTime) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitText?: string;
  showErrors?: boolean;
  disabled: boolean;
};

const EntryForm = ({
  entryIntent,
  onTitleChange,
  onContentChange,
  onDateChange,
  onSubmit,
  onCancel,
  submitText,
  showErrors = true,
  disabled,
}: Props) => {
  const { isValid, errors } = Entry.validateIntent(entryIntent);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Grid container sx={{ padding: '0 1rem' }} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <TextField
          id="title"
          value={entryIntent.title}
          onChange={(event) => onTitleChange(event.target.value)}
          error={showErrors && Boolean(errors.title)}
          helperText={showErrors && errors.title}
          label="Title"
          margin="normal"
          variant="outlined"
          fullWidth
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="content"
          value={entryIntent.content}
          onChange={(event) => onContentChange(event.target.value)}
          error={showErrors && Boolean(errors.content)}
          helperText={showErrors && errors.content}
          label="Content"
          placeholder="..."
          multiline
          margin="normal"
          fullWidth
          rows={10}
          sx={{ minHeight: '15rem' }}
          disabled={disabled}
        />
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={6}>
          <DesktopDatePicker
            value={entryIntent.date}
            onChange={(dateTime) => {
              if (!onDateChange) {
                return;
              }

              onDateChange(dateTime as DateTime);
            }}
            disabled={disabled}
            readOnly={!onDateChange}
            disableMaskedInput
            renderInput={(params) => (
              <TextField
                id="date"
                error={showErrors && Boolean(errors.date)}
                helperText={showErrors && errors.date}
                margin="normal"
                {...params}
              />
            )}
          />
        </Grid>

        {submitText && (
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <ButtonGroup disabled={!isValid || disabled}>
              {onCancel && <Button onClick={() => onCancel()}>Cancel</Button>}

              <Button variant="contained" size="large" type="submit">
                {submitText}
              </Button>
            </ButtonGroup>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export { EntryForm };
