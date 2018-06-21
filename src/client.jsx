import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './services/socket/client';
import './_styles.scss';

const renderMethod = module.hot ? render : hydrate;

renderMethod(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    global.document.getElementById('root'),
);

