import { container } from '../container';
import { ContainerProvider } from './di/ContainerContext';
import { ReduxProvider } from './redux/ReduxProvider';
import { Diary } from './diary/Diary';
import CssBaseline from '@mui/material/CssBaseline';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const App = () => (
  <ContainerProvider value={container}>
    <CssBaseline />
    <ReduxProvider>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Diary />
      </LocalizationProvider>
    </ReduxProvider>
  </ContainerProvider>
);

export { App };
