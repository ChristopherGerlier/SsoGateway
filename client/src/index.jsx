import React from 'react';
import { render } from 'react-dom';

// hashHistory manages the routing history with the hash portion of the url.
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import HomePage from './containers/HomePage';
import Layout from './containers/Layout';
import LoginPage from './containers/LoginPage';

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


render(<Router history={hashHistory}>{routes}</Router>, app);
