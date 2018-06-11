import React, { Component } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../routes';
import Nav from './Nav';
// import UsersProvider from '../../api/users/provider';
import { Consumer as ThemesConsumer, Provider as ThemesProvider } from '../contexts/themes';

class App extends React.Component {
    constructor(props, context) {
        // console.log('App constuctor props', props);
        // console.log('this.props', props);
        // console.log('this.props', context);
        super(props, context);
    }

    // componentDidMount() {
    //     this.fetch();
    // }

    // getChileContext() {
    //     return {
    //         data: [{name: 's'}]
    //     };
    // }

    render() {
        // The ThemedButton button inside the ThemeProvider
        // uses the theme from state while the one outside uses
        // the default dark theme
        // const { theme, data, loading } = this.state;
        // console.log('initValue', this.props);

        // console.log('this.props', this.props);

        return (
            <div>
                <Route render={() => {
                    return (
                        <UsersProvider>
                            <ThemesProvider>
                                <Nav />
                                {routes.map(route => <Route key={route.key} {...route} />)}
                                <div>default footer</div>
                            </ThemesProvider>
                        </UsersProvider>
                    );
                }}
                />

            </div>
        );
    }
}

export default App;

// export { Consumer };
