import React, { Component, Fragment } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../routes';
import Nav from './Nav';
import UsersProvider from '../../api/users/provider';
import ProjectsProvider from '../../api/projects/provider';
import { Provider as ThemesProvider } from '../contexts/themes';

// const Providers = [ThemesProvider, UsersProvider];

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            appData: (global.window && global.window.appData) || {}
        };
        if (global.window) {
            delete global.window.appData;
        }
    }

    render() {
        const { appData } = this.state;
        return (
            <ProjectsProvider data={appData.Projects}>
                <UsersProvider data={appData.Users}>
                    <ThemesProvider>
                        <Fragment>
                            <Nav />
                            {routes.map(route => <Route key={route.key} {...route} />)}
                            <div>default footer</div>
                        </Fragment>
                    </ThemesProvider>
                </UsersProvider>
            </ProjectsProvider>
        );
    }
}

export default App;
