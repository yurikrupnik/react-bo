import React, { Component, Fragment, cloneElement, createElement } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../routes';
import Nav from './Nav';
import UsersProvider from '../../api/users/provider';
import ProjectsProvider from '../../api/projects/provider';
import { Provider as ThemesProvider } from '../contexts/themes';

const Providers = [UsersProvider, ProjectsProvider];

class DataProviders extends Component {

    constructor(props) {
        super();
        // this.prepare = this.prepare.bind(this);
    }

    prepare() {
        return Providers.reduce((acc, C) => {
            if (acc.props.children) {
                const { children } = acc.props;
                return cloneElement(acc, {}, cloneElement(children, {}, createElement(C, {}, this.props.children)));
            }
            return cloneElement(acc, {}, createElement(C, {}, this.props.children));
        }, <Fragment />);
    }

    render() {
        console.log('this.props', this.props);

        return Providers.reduce((acc, C) => {
            if (acc.props.children) {
                const { children } = acc.props;
                return cloneElement(acc, {}, cloneElement(children, {}, createElement(C, {}, this.props.children)));
            }
            return cloneElement(acc, {}, createElement(C, {}, this.props.children));
        }, <Fragment />);
        // return this.prepare();
        // console.log('s', s);

        // console.log('S', S);

        // return s/**/;
        // return (
        //     <Fragment>
        //         <ProjectsProvider>
        //             <UsersProvider>
        //                 {this.props.children}
        //             </UsersProvider>
        //         </ProjectsProvider>
        //     </Fragment>
        // );
    }
}

class ConfigProviders extends Component {
    render() {
        return (
            <Fragment>
                <ThemesProvider>
                    {this.props.children}
                </ThemesProvider>
            </Fragment>
        );
    }
}

class Layout extends Component {
    render() {
        return (
            <Fragment>
                <Nav />
                {routes.map(route => <Route key={route.key} {...route} />)}
                <div>default footer</div>
            </Fragment>
        );
    }
}

class App extends Component {
    render() {
        return (
            <DataProviders>
                <ConfigProviders>
                    <Layout />
                </ConfigProviders>
            </DataProviders>
        );
    }
}

export default App;
