import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './services/socket/client';
import './_styles.scss';

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
    <BrowserRouter>
        <App
            userAgent={global.navigator.userAgent}
            initialState={{}}
        />
    </BrowserRouter>,
    global.document.getElementById('root'),
);
