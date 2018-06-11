import { createContext } from 'react';

const { Provider, Consumer } = createContext({
    data: [],
    loading: false,
    toggleLoading: () => {},
    getData: () => {}
    // theme: themes.dark,
    // toggleTheme: () => {}
});

export { Provider, Consumer };
