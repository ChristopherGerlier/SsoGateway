import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

// import index.js file from ../reducers
import reducers from '../reducers.js';

const middleware = applyMiddleware(thunk);
const devToolsExt = window.devToolsExtension ? window.devToolsExtension() : f => f;
/*
  Building Redux store
  - devToolsExtension required to get Redux DevTools work
    details: https://github.com/gaearon/redux-devtools
*/
let enhancer;
if (process.env.NODE_ENV !== 'production') {
  enhancer = compose(middleware, devToolsExt);
} else {
  enhancer = middleware;
}

export default createStore(reducers, enhancer);
