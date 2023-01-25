import { useState } from 'react';
import { Box, Grid, Typography, MenuList, MenuItem, Paper, Divider, Chip } from '@mui/material';
import { useContainer } from '../di/useContainer';
import { CreateEntryForm } from './CreateEntryForm';
import { UpdateEntryForm } from './UpdateEntryForm';

const Diary = () => {
  const { useEntries } = useContainer();
  const { currentData: entries, isLoading } = useEntries();

  const [selectedEntryId, setSelectedEntryId] = useState<number | null>(null);
  const clearSelectedEntryId = () => setSelectedEntryId(null);

  return (
    <Box>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        sx={{ color: 'white', backgroundColor: 'black', paddingBottom: '0.2rem' }}
      >
        Diary
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={9}>
          {selectedEntryId ? (
            <UpdateEntryForm key={selectedEntryId} entryId={selectedEntryId} onCancel={clearSelectedEntryId} />
          ) : (
            <CreateEntryForm key="new" onCreate={(entry) => setSelectedEntryId(entry.id)} />
          )}
        </Grid>

        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            padding: '1rem',
            paddingLeft: { sm: '0' },
          }}
        >
          <Paper variant="outlined">
            {isLoading ? (
              'Loading'
            ) : (
              <MenuList>
                <MenuItem onClick={clearSelectedEntryId}>New entry</MenuItem>
                <Divider />
                {entries!.map((entry) => (
                  <MenuItem key={entry.id} onClick={() => setSelectedEntryId(entry.id)}>
                    <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <Chip label={entry.date.toFormat('yyyy LLL dd')} size="small" /> {entry.title}
                    </Box>
                  </MenuItem>
                ))}
              </MenuList>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export { Diary };
