import React from 'react';
import { render, hydrate } from 'react-dom';
// import App from './components/App';
import routes from './components/routes';
import Loadable from './components/Loadable';
import './services/socket/client';
import './_styles.scss';

const App = Loadable({
    loader: () => import(/* webpackChunkName: "app" */ './components/App'),
});

const renderMethod = module.hot ? render : hydrate;

renderMethod(<App routes={routes} />, global.document.getElementById('root'));

