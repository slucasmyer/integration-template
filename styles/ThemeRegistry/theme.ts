import { Orbitron, Roboto_Mono, Ubuntu_Mono } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

// export const orbitron = Orbitron({
//   weight: ['400', '500', '600', '700', '800', '900'],
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['Helvetica', 'Arial', 'sans-serif'],
// });

// const font = Roboto_Mono({
//   weight: ['400', '500', '600', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['Helvetica', 'Arial', 'sans-serif'],
// });

const font = Ubuntu_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  });

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: font.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;