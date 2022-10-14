import { createTheme } from "@mui/material/styles";

/**
 * PrimePsyche brand colors prime-psyche
 */
const Colors = {
  //prime_psyche darker green variations
  prime_psyche_darker_green: "#014138",
  prime_psyche_darker_green2: "#275E56",
  prime_psyche_darker_green3: "#41716A",
  prime_psyche_darker_green4: "#739792",
  prime_psyche_darker_green5: "#99B3AF",
  //prime_psyche mid green variations
  prime_psyche_mid_green: "#176554",
  prime_psyche_mid_green2: "#3A7C6E",
  prime_psyche_mid_green3: "#5D9387",
  prime_psyche_mid_green4: "#7FAAA1",
  prime_psyche_mid_green5: "#A2C1BB",
  //prime_psyche light green variations
  prime_psyche_light_green: "#4d826c",
  prime_psyche_light_green2: "#689582",
  prime_psyche_light_green3: "#82A898",
  prime_psyche_light_green4: "#9DBAAE",
  prime_psyche_light_green5: "#B8CDC4",
  //prime_psyche charcoal variations
  prime_psyche_charcoal: "#333333",
  prime_psyche_charcoal2: "#4E4B48",
  prime_psyche_charcoal3: "#807D7B",
  prime_psyche_charcoal4: "#BBB9B8",
  prime_psyche_charcoal5: "#EDEDEC",
  //prime_psyche common variations
  prime_psyche_black: "#232323",
  prime_psyche_white: "#ffffff",
  prime_psyche_green: "#1CAA49",
  prime_psyche_error: "#f00e0e",
  prime_psyche_warning: "#d48a49",
  prime_psyche_info: "#4b81d1",
  //prime_psyche grey variations
  prime_psyche_light_grey: "#e9e8e9",
  prime_psyche_light_grey2: "#F1F1F0",
  prime_psyche_light_grey3: "#F8F8F7",
  prime_psyche_light_grey4: "#FDFDFD",
  prime_psyche_light_grey5: "#fff",
  prime_psyche_gradient: "linear-gradient(-43deg, #005221 0%, #11251a 100%)",
  prime_psyche_blue: "#051e28",
  prime_psyche_light_green1: "#4d826c",
  prime_psyche_dark: "#232323",

  prime_psyche_secondary: "#232323",
  prime_psyche_dark_secondary: "#232323",
  prime_psyche_light_secondary: "#464443",
};

const Gutter = {
  spacing: 12,
};

const Font = {
  primary: ["Roboto", "BlinkMacSystemFont", "sans-serif"].join(","),
};
/**
 * prime_psyche Theme
 */
const PrimePsycheTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: "light",
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      main: Colors.prime_psyche_darker_green,
      second: Colors.prime_psyche_mid_green,
    },
    secondary: {
      main: "#ffffff",
      second: Colors.prime_psyche_charcoal5,
      third: Colors.prime_psyche_light_grey5,
    },
    error: {
      main: "#f00e0e",
      second: "#f00e0e",
    },
    warning: {
      main: "#ed6c02",
    },
    success: {
      main: "#2e7d32",
      second: "#59B300",
    },
    info: {
      main: "#0288d1",
    },
    prime_psycheColors: Colors,
    charcoal: {
      prime_psyche_charcoal: "#333333",
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: Font.primary,
    fontSize: 12,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBoldSemi: 600,
    fontWeightBold: 700,
    h1: {
      fontFamily: Font.primary,
    },
    h2: {
      fontFamily: Font.primary,
    },
    h3: {
      fontFamily: Font.primary,
    },
    button: {
      fontFamily: Font.primary,
    },
    link: {
      fontFamily: Font.primary,
      fontSize: 14,
    },
    body1: {
      fontFamily: Font.primary,
      fontSize: 14,
      fontWeight: 600,
    },
    body: {
      fontFamily: Font.primary,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "2.4rem",
    },
    label: {
      fontFamily: Font.primary,
      fontSize: 14,
      fontWeight: 600,
      marginBottom: "6px",
      color: "#9e9e9e",
      display: "inline-block",
    },
  },
  // spacing: Gutter.spacing,
  // drawerWidth: 280,
  /**
   * Components overrides
   */
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          // maxHeight: 2,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          padding: "10px 12px",
          background: Colors.prime_psyche_error,
          margin: 0,
          color: "#fff",
          "&.Mui-error": {
            color: "#fff",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "footer" },
          style: {
            // border: `1px solid ${Colors.prime_psyche_charcoal}`,
            background: `${Colors.prime_psyche_darker_green2}`,
            // "&:hover": {
            //   background: "#fff",
            //   color: `${Colors.prime_psyche_darker_green2}`,
            // },
          },
        },

        {
          props: { variant: "isLoading" },
          style: {
            color: "#fff",
            backgroundColor: `${Colors.prime_psyche_darker_green3}`,
            border: `1px solid ${Colors.prime_psyche_darker_green3}`,
          },
        },
        {
          props: { variant: "danger" },
          style: {
            textTransform: "none",
            fontSize: "16px",
            minHeight: "48px",
            lineHeight: "48px",
            paddingBottom: "0px",
            minWidth: "48px",
            paddingTop: "0px",
            fontFamily: Font.primary,
            backgroundColor: `${Colors.prime_psyche_error}`,
            color: "#fff",

            "&:hover": {
              color: "#fff",
              backgroundColor: `${Colors.prime_psyche_error}`,
              boxShadow: "0px 0px 5px rgba(0,0,0,.25)",
            },
          },
        },
        {
          props: { variant: "light" },
          style: {
            textTransform: "none",
            fontSize: "16px",
            minHeight: "48px",
            lineHeight: "48px",
            width: "48px",
            minWidth: "48px",
            padding: "0px",
            paddingTop: "0px",
            fontFamily: Font.primary,
            backgroundColor: "#fff",
            color: `${Colors.prime_psyche_darker_green}`,

            "&:hover": {
              backgroundColor: "#fff",
              boxShadow: "none",
              color: `${Colors.prime_psyche_darker_green2}`,
            },
          },
        },

        {
          props: { variant: "icon" },
          style: {
            textTransform: "none",
            fontSize: "16px",
            minHeight: "44px",
            lineHeight: "44px",
            width: "44px",
            minWidth: "44px",
            padding: "0px",

            paddingTop: "0px",
            fontFamily: Font.primary,
            backgroundColor: "transparent",
            color: `${Colors.prime_psyche_darker_green}`,
            "&:hover": {
              color: `${Colors.prime_psyche_darker_green4}`,
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          },
        },
        {
          props: { variant: "medium" },
          style: { height: "40px", minHeight: "40px" },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          fontSize: "16px",
          minHeight: "48px",
          minWidth: "48px",
          lineHeight: "48px",
          fontWeight: 500,
          padding: "0px 24px",
          fontFamily: Font.primary,
          backgroundColor: `${Colors.prime_psyche_darker_green}`,
          color: "#fff",

          "&.MuiButton-outlined": {
            color: `${Colors.prime_psyche_darker_green}`,
            backgroundColor: `${Colors.prime_psyche_darker_green}00`,
            "&:hover": {
              backgroundColor: `${Colors.prime_psyche_darker_green}`,
            },
          },
          "&.Mui-disabled": {
            color: "#fff",
          },

          "&:hover": {
            color: "#fff",
            backgroundColor: `${Colors.prime_psyche_darker_green2}`,
            boxShadow: "0px 0px 5px rgba(0,0,0,.25)",
          },
          "&:active": {
            color: "#fff",
            backgroundColor: `${Colors.prime_psyche_darker_green4}`,
            boxShadow: "0px 0px 5px rgba(0,0,0,.25)",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "1.2rem",
          fontWeight: 400,
          background: Colors.prime_psyche_light_green5,
        },
      },
    },

    MuiTypography: {
      root: {
        fontFamily: Font.primary,
      },
      variants: [
        {
          props: { variant: "PageHeader" },
          style: {
            fontWeight: 700,
            fontSize: 30,
            textTransform: "uppercase",
            textAlign: "center",
            padding: "0px 0px",
            color: `${Colors.prime_psyche_darker_green}`,
          },
        },
      ],
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: Colors.prime_psyche_charcoal,
          color: Colors.prime_psyche_white,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: 18,
          textTransform: "uppercase",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: Colors.prime_psyche_black,
        },
      },
    },
    //Mui icon button
    MuiIconButton: {
      variants: [
        {
          props: { variant: "drawerButton" },
          style: {
            color: Colors.prime_psyche_light_grey,
          },
        },
        {
          props: {
            color: "primary",
            style: {
              backgroundColor: `${Colors.prime_psyche_darker_green}`,
              color: "#fff",

              "&.Mui-disabled": {
                color: "#fff",
              },

              "&:hover": {
                color: "#fff",
                backgroundColor: `${Colors.prime_psyche_darker_green2}`,
                boxShadow: "0px 0px 5px rgba(0,0,0,.25)",
              },
              "&:active": {
                color: "#fff",
                backgroundColor: `${Colors.prime_psyche_darker_green4}`,
                boxShadow: "0px 0px 5px rgba(0,0,0,.25)",
              },
            },
          },
        },
      ],
    },

    MuiContainer: {
      variants: [
        {
          props: { variant: "outletContainer" },
          style: {
            backgroundColor: `${Colors.prime_psyche_darker_green4}`,
            borderRadius: 15,
            paddingTop: "20px",
            paddingBottom: "20px",
            maxWidth: "940px",
          },
        },
        {
          props: { variant: "sourcePageContainer" },
          style: {
            paddingTop: `${Gutter.spacing * 2}px`,
            paddingLeft: `${Gutter.spacing * 2}px`,
          },
        },
      ],
    },
  },
});

export { PrimePsycheTheme, Colors, Gutter, Font };
