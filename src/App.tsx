import { Box, Button, Checkbox, CssBaseline, FormControlLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ShadowCorridorMap } from './map/ShadowCorridorMap';
import { StageSelect } from './StageSelect';
import { useStageValue } from './state/stage';
import { useSetMap } from './state/map';
import { defaultMap } from './utils/localStorage';
import { useSetCurrentPos } from './state/currentPos';
import { AreaDetail } from './AreaDetail';
import { useMainFloor } from './state/mainFloor';

const theme = createTheme({
  palette: { mode: 'dark' },
});

export const App = () => {
  const stage = useStageValue();
  const setMap = useSetMap();
  const setCurrentPos = useSetCurrentPos();
  const [mainFloor, setMainFloor] = useMainFloor();
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
          height: { xs: 'auto', sm: '100dvh' },
          display: { xs: 'block', sm: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
              mt: { xs: 2, sm: 0 },
              mb: { xs: 0, sm: 2 },
              position: { xs: 'relative', sm: 'absolute' },
              top: { xs: 'auto', sm: '0' },
              left: { xs: 'auto', sm: '0' },
              transform: { xs: 'none', sm: 'translateY(calc(-100% - 16px))' },
            }}
          >
            <StageSelect />
            <Button variant="outlined" size="large" onClick={reset}>
              リセット
            </Button>
            {stage === 'gaien' && (
              <FormControlLabel
                label="地下表記"
                control={
                  <Checkbox
                    checked={mainFloor === 'B'}
                    onChange={(e) => setMainFloor(e.target.checked ? 'B' : '1')}
                    size="large"
                  />
                }
              />
            )}
          </Box>
          <ShadowCorridorMap />
          <AreaDetail />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
