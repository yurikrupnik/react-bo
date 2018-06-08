import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './services/socket/client';
import './_styles.scss';

hydrate(
    <BrowserRouter>
        <App
            userAgent={global.navigator.userAgent}
            initialState={{}}
        />
    </BrowserRouter>,
    global.document.getElementById('root'),
);

