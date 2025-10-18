import { Box, Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ShadowCorridorMap } from './map/ShadowCorridorMap';
import { StageSelect } from './StageSelect';
import { useStageValue } from './state/stage';
import { useSetMap } from './state/map';
import { defaultMap } from './utils/localStorage';
import { useSetCurrentPos } from './state/currentPos';
import { AreaDetail } from './AreaDetail';
import { SettingDialogWithOpenButton } from './SettingDialogWithOpenButton';

const theme = createTheme({
  palette: { mode: 'dark' },
});

export const App = () => {
  const stage = useStageValue();
  const setMap = useSetMap();
  const setCurrentPos = useSetCurrentPos();
  const reset = () => {
    setMap(defaultMap[stage].map);
    setCurrentPos(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main" sx={{ width: '100%' }}>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              gap: 2,
              mt: 4,
            }}
          >
            <SettingDialogWithOpenButton />
            <StageSelect />
            <Button variant="outlined" size="large" onClick={reset}>
              リセット
            </Button>
          </Box>
          <ShadowCorridorMap />
          <AreaDetail />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
