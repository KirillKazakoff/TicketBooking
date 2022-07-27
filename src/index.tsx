import * as smoothscroll from 'smoothscroll-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/App';

import './css/fonts.css';
import './css/defaultStyle.css';
import './css/svgIcons.css';
import './css/style.css';
import { store } from './app/redux/store';

smoothscroll.polyfill();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
