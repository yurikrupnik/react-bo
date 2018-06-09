import React, { Component, createContext } from 'react';

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
    toggleTheme: () => {},
    data: [],
    loading: false,
    fetch: () => {}
});

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

class ThemesConsumer extends Component {
    render() {
        if (typeof this.props.render === 'function') {
            console.log('render props');


        //     });
        }
        return (
            <Consumer>
                {(props) => {
                    // console.log('selectTheme', props.toggleTheme);
                    // console.log('mam', props.mam);
                    // console.log('theme', props.theme);

                    console.log('props', props);
                    const { data } = props;
                    return (
                        <div>
                            <button style={{ background: props.theme.background }} onClick={props.toggleTheme}>
                                clicks
                            </button>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}
// export { ThemesProvider, ThemesConsumer };
export { ThemesProvider, ThemesConsumer };
