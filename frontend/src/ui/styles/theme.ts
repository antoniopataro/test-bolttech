import type { DefaultTheme } from "styled-components";

class DefaultThemeColorPalette {
  public readonly default!: string;
  public readonly hover!: string;

  public readonly "8": string;
  public readonly "9": string;
  public readonly "10": string;

  constructor(colors: { "8": string; "9": string; "10": string }) {
    this[8] = colors[8];
    this[9] = colors[9];
    this[10] = colors[10];

    this.default = this[9];
    this.hover = this[10];
  }
}

export const theme: DefaultTheme = {
  breakpoints: {
    xs: "425px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  colors: {
    black: "#000000",
    primary: new DefaultThemeColorPalette({
      "8": "#94c1cc",
      "9": "#458293",
      "10": "#365968",
    }),
    text: new DefaultThemeColorPalette({
      "8": "#454545",
      "9": "#282828",
      "10": "#000000",
    }),
    white: "#FFFFFF",
  },
};
