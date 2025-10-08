import { Box, Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ShadowCorridorMap } from './map/ShadowCorridorMap';
import { StageSelect } from './StageSelect';
import { useStageValue } from './state/stage';
import { useSetMap } from './state/map';
import { defaultMap } from './utils/localStorage';
import { useSetCurrentPos } from './state/currentPos';

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
      <Box
        component="main"
        sx={{
          width: '100%',
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              mb: 2,
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%, calc(-100% - 16px))',
            }}
          >
            <StageSelect />
          </Box>
          <ShadowCorridorMap />
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              bottom: 0,
              transform: 'translate(-50%, calc(100% + 16px))',
            }}
          >
            <Button variant="outlined" size="large" onClick={reset}>
              リセット
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
