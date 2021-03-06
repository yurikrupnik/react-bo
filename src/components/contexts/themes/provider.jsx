import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, themes } from './context';

class ThemesProvider extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            theme: themes.light,
        };

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
        const { theme } = this.state;
        const { children } = this.props;
        return (
            <Provider value={{
                theme,
                toggleTheme: this.toggleTheme
            }}
            >
                {children}
            </Provider>
        );
    }
}

ThemesProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export default ThemesProvider;
