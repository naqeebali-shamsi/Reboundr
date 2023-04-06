import { createTheme } from "@mui/material";

// --charcoal: #264653ff;
// --persian-green: #2a9d8fff;
// --saffron: #e9c46aff;
// --sandy-brown: #f4a261ff;
// --burnt-sienna: #e76f51ff;

const primary = "#264653";
const secondary = "#2A9D8F";

const theme = createTheme({
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  overrides: {
    MuiDialogActions: {
      root: {
        padding: "8px 24px 16px 24px",
      },
    },
    MuiButton: {
      root: {
        fontWeight: 600,
        textTransform: "none",
        color: secondary,
        padding: "6px 24px",
        ":hover": {
          textDecoration: "underline",
        },
      },
      outlined: {
        borderRadius: "35px",
        borderColor: secondary,
        padding: "6px 20px",
      },
    },
    MuiSelect: {
      filled: {
        padding: "15px 0 15px 15px",
      },
    },
    MuiFilledInput: {
      input: {
        height: "49px",
        padding: "0px 0 0 10px",
      },
    },
  },
  Menu:{
    hover: {
      textDecoration: "underline"
    }
  }
});

export default theme