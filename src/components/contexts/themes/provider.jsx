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
            data: [],
            loading: false
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

        this.fetch = (params, cb) => {
            return usersApi.read(params).then((res) => {
                console.log('res', res);
                this.setState(() => {
                    return {
                        data: res
                    };
                }, cb);
            });
        };
    }

    render() {
        const { theme, data } = this.state;
        return (
            <Provider value={{
                data,
                theme,
                toggleTheme: this.toggleTheme
            }} >
                {this.props.children}
            </Provider>
        );
    }
}

export default ThemesProvider;
