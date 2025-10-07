import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: { mode: 'dark' },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          width: '100%',
          height: '100dvh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        おめえほんとか？
      </Box>
    </ThemeProvider>
  );
};
