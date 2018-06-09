import { createContext } from 'react';

const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
        color: 'red'
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
        color: 'green'
    },
};

const { Provider, Consumer } = createContext({
    theme: themes.dark,
    toggleTheme: () => {}
});

export { Provider, Consumer, themes };
