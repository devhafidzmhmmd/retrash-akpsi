import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import { shadows } from "./Shadows";

const baselightTheme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#2E7D32',     // Green Forest
      light: '#A5D6A7',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#FBC02D',     // Amber Gold
      light: '#FFF59D',
      dark: '#F9A825',
    },
    success: {
      main: '#66BB6A',
      light: '#C8E6C9',
      dark: '#388E3C',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0288D1',     // Sky Blue
      light: '#B3E5FC',
      dark: '#01579B',
      contrastText: '#ffffff',
    },
    error: {
      main: '#E53935',
      light: '#FFCDD2',
      dark: '#B71C1C',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFA726',
      light: '#FFE0B2',
      dark: '#FB8C00',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#EBF3FE',
      A100: '#6610f2',
      A200: '#557fb9',
    },
    grey: {
      100: '#F2F6FA',
      200: '#EAEFF4',
      300: '#DFE5EF',
      400: '#7C8FAC',
      500: '#5A6A85',
      600: '#263238',      // Charcoal
    },
    text: {
      primary: '#263238',  // Charcoal
      secondary: '#757575' // Light Grey
    },
    background: {
      default: '#FAFAFA',  // Soft White
      paper: '#F1F1F1'     // Light Grey for cards
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: '#F1F1F1',
    },
    divider: '#e5eaef',
  },
  typography,
  shadows,
});


export { baselightTheme };
