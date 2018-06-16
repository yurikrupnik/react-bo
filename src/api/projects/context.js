import { createContext } from 'react';

const { Provider, Consumer } = createContext({
    data: [],
    loading: false,
    selected: {}
});

export { Provider, Consumer };
