
import { colors } from '@material-ui/core';
import { switcheo, zilliqa } from "./colors";

const TEXT_COLORS = {
  primary: "#DEFFFF",
  secondary: "rgba(222, 255, 255, 0.5)",
};

const theme = {
  type: "dark",
  toolbar: {
    main: "#0D1B24",
  },
  primary: {
    contrastText: "#FAFAFA",
    dark: "#111111",
    main: "#000000",
    light: "rgba(222, 255, 255, 0.5)",
  },
  error: {
    contrastText: TEXT_COLORS.secondary,
    dark: colors.red[900],
    main: zilliqa.danger,
    light: colors.red[400]
  },
  success: {
    contrastText: TEXT_COLORS.secondary,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  text: {
    primary: TEXT_COLORS.primary,
    secondary: TEXT_COLORS.secondary,
    disabled: "rgba(222, 255, 255, 0.5)",
  },
  button: {
    primary: "#00FFB0",
  },
  background: {
    default: "#010101",
    gradient: "radial-gradient(50% 50% at 50% 0%, #000111 -800%, rgba(0, 255, 176, 0) 85%), radial-gradient(50% 50% at 50% 100%, #000AAA -800%, rgba(0, 255, 176, 0) 85%), #000000",
    contrast: "rgba(222, 255, 255, 0.1)",
    contrastAlternate: "#222222",
    paper: zilliqa.black,
    paperOpposite: zilliqa.neutral[100],
    tooltip: "#13222C",
    readOnly: zilliqa.neutral["195"]
  },
  action: {
    active: "#13222C",
    disabled: "rgba(222, 255, 255, 0.5)",
    disabledBackground: "#003340",
    selected: "#00FFB0"
  },
  tab: {
    active: "#111111",
    disabled: "rgba(222, 255, 255, 0.5)",
    disabledBackground: "#0D1B24",
    selected: "#DEFFFF"
  },
  mainBoxShadow: "none",
  cardBoxShadow: "0 4px 8px 1px rgba(0, 0, 0, 0.2)",
  navbar: "#000000",
  switcheoLogo: switcheo.logoDark,
  colors: { zilliqa, switcheo },
  currencyInput: "rgba(255, 255, 255, 0.1)",
  icon: "#00FFB0",
  label: "rgba(222, 255, 255, 0.5)",
  warning: {
    main: "#FFDF6B",
    light: "#FFDF6B"
  },
  link: "#FAFAFA",
  border: "1px solid #2A2A2A",
  borderColor: "#AAAAAA",
};

export default theme;
