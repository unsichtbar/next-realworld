import React from "react";
import {
  ThemeProvider as StyledThemeProvivider,
  createGlobalStyle,
} from "styled-components";

export interface Theme {
  primary: string;
  secondary: string;
}

const defaultTheme: Theme = {
  primary: "mediumseagreen",
  secondary: "mediumpurple",
};
const ThemeContext = React.createContext<{ theme: Theme }>({
  theme: defaultTheme,
});

export const ThemeProvider: React.FC<any> = (props) => {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);

  return (
    <>
      <GlobalStyles />
      <ThemeContext.Provider value={{ theme }}>
        <StyledThemeProvivider theme={theme}>
          {props.children}
        </StyledThemeProvivider>
      </ThemeContext.Provider>
    </>
  );
};

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
    }
    html {
      font-family: 'Inter', sans-serif;
    }

    @supports (font-variation-settings: normal) {
      html {
        font-family: 'Inter var', sans-serif;
      }
    }
`;
