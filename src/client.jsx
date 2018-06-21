import React from 'react';
import { render, hydrate } from 'react-dom';
import App from './components/App';
import routes from './components/routes';
import './services/socket/client';
import './_styles.scss';

const renderMethod = module.hot ? render : hydrate;

renderMethod(<App routes={routes} />, global.document.getElementById('root'));

