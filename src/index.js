import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import Info from './containers/Info/Info.js';
import TimersTable from './containers/TimersTable/TimersTable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, createStore} from 'redux';

import {Route, Router} from 'react-router-dom';
// import {Router} from 'react-router';
import thunk from 'redux-thunk';
import reducer from './reducers';
import createBrowserHistory from 'history/createBrowserHistory';


const history = createBrowserHistory();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
syncHistoryWithStore(history, store);

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store} >
            <Router history={history}>
                <App>
                    <Route exact path="/" component={TimersTable} />
                    <Route path="/info/:id" component={Info} />
                </App>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'));
