import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import {Home, Welcome, About, Contact} from './components';

const routes = (
    <Router history={browserHistory}>
        <Route path='/' component={Home} >
            <IndexRoute component={Welcome} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
        </Route>
    </Router>
);

export default routes;