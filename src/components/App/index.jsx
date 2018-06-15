import React, { Component } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../routes';
import Nav from './Nav';
import UsersProvider from '../../api/users/provider';
import { Provider as ThemesProvider } from '../contexts/themes';

// const Providers = [ThemesProvider, UsersProvider];

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        // this.state = {
        //     appData: (global.window && global.window.appData) || {}
        // };
        // delete global.window.appData;
    }

    render() {
        // let data;
        // if (global.window && global.window.appData) {
        //     console.log('data', global.window.appData);
        //
        //     data = global.window.appData;
        //     delete global.window.appData;
        // } else {
        //     data = [];
        // }
        // const providers = Providers.map(V => {
        //     return <V />
        // });

        return (
            <UsersProvider>
                <ThemesProvider>
                    <Nav />
                    {routes.map(route => <Route key={route.key} {...route} />)}
                    <div>default footer</div>
                </ThemesProvider>
            </UsersProvider>
        );
    }
}

export default App;

// export { Consumer };
