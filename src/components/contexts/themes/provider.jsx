import React, { Component } from 'react';
import { Provider } from './context';

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

class ThemesProvider extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            theme: themes.light,
        };
        //
        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };
    }

    render() {
        const { theme, data } = this.state;
        return (
            <Provider value={{
                theme,
                toggleTheme: this.toggleTheme
            }} >
                {this.props.children}
            </Provider>
        );
    }
}

export default ThemesProvider;
