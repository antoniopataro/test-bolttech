import "styled-components";

declare module "styled-components" {
  export type DefaultThemeColorPalette = {
    "8": string;
    "9": string;
    "10": string;
    default: string;
    hover: string;
  };

  export interface DefaultTheme {
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    colors: {
      black: string;
      primary: DefaultThemeColorPalette;
      text: DefaultThemeColorPalette;
      white: string;
    };
  }
}
