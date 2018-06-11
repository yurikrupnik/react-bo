import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import App from './components/App';
import './services/socket/client';
import './_styles.scss';

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
const { appData } = global.window;

Loadable.preloadReady().then(() => {
    renderMethod(
        <BrowserRouter>
            <App appData={appData} />
        </BrowserRouter>,
        global.document.getElementById('root'),
    );
});

