import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';

// hashHistory manages the routing history with the hash portion of the url.
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import HomePage from './containers/HomePage';
import Layout from './containers/Layout';
import LoginPage from './containers/LoginPage';
// import store from './store';

require('./index.scss');

const app = document.getElementById('app');

const routes =
  (<Route path="/" component={Layout}>
    {/* IndexRoute has no path. It becomes the this.props.children of the parent when no
    other child of the parent matches, or in other words when the parent's route matches
    exactly */}
    <IndexRoute component={LoginPage} />
    {/* make them children of 'App' */}
    {/* add the new route: <Route path="/Languages/:language/:subcategory" component={Repo}/> */}
    {/* to make kanguage optional <Route path="/Languages(/:language)" component={Language} /> */}
    {/* <Route path="/Languages/:language" component={LanguagePage} />*/}
    <Route path="Home" component={HomePage} />
  </Route>);

render(
//  <Provider store={store}>
  <Router history={browserHistory}>{routes}</Router>
//  </Provider>
, app
);
