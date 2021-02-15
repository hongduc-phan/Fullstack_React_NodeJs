import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),

    h1: {},
    h5: {
      lineHeight: 1.167
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: "0.15px"
    },
    body1: {
      fontSize: "1.125rem",
      lineHeight: "28px",
      letterSpacing: "0.5px"
    },
    subtitle1: {
      fontWeight: 500,
      lineHeight: 1.5
    },
    subtitle2: {
      fontWeight: 600
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.046875rem"
    },
    overline: {
      fontWeight: 600,
      fontSize: "0.625rem",
      lineHeight: 1.6,
      letterSpacing: "1.5px"
    },
    caption: {
      lineHeight: 1.333,
      letterSpacing: "0.03334em"
    }
  },
  overrides: {
    MuiToolbar: {
      regular: {
        minHeight: "56px",
        "@media (min-width: 600px)": {
          minHeight: "56px"
        }
      },
      gutters: {
        paddingLeft: "16px",
        paddingRight: "16px",
        "@media (min-width: 600px)": {
          paddingLeft: "16px",
          paddingRight: "16px"
        }
      }
    },
    MuiButton: {
      root: {
        borderRadius: "2em"
      }
    },

    MuiInputBase: {
      input: {
        lineHeight: 1.5
      }
    },

    MuiInputLabel: {
      filled: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.5
      }
    },

    MuiDialog: {
      paper: {
        borderRadius: 16
      }
    },

    MuiListSubheader: {
      root: {
        fontWeight: 500,
        fontSize: "1rem",
        lineHeight: 1.5,
        color: "rgba(0, 0, 0, 0.87)",
        height: 36,
        letterSpacing: "0.15px"
      }
    },

    MuiChip: {
      label: {
        fontSize: "0.875rem",
        padding: "6px 12px 6px 12px"
      }
    },

    MuiTypography: {
      gutterBottom: {
        marginBottom: 16
      }
    },

    MuiFilledInput: {
      root: {
        color: "rgba(0, 0, 0, 0.6)",
        backgroundColor: "rgb(250,250,250)",
        "&$disabled": {
          color: "rgba(0, 0, 0, 0.38)",
          backgroundColor: "rgb(240,240,240)"
        },
        "&:hover": {
          backgroundColor: "rgb(237,237,237)"
        }
      }
    },

    MuiLink: {
      root: {
        color: "#385B97"
      }
    }
  },
  palette: {
    primary: { main: "#f90057" },
    secondary: { main: "#385B97" },
    background: {
      default: "#fff"
    }
  }
});

export default theme;
