import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import { Provider } from 'react-redux';
import App from './JS/App.js';
import store from './JS/store/store.js';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
