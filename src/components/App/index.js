import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import Account from '../Account';
import Admin from '../Admin';
import Home from '../Home';
import Landing from '../Landing';
import Navigation from '../Navigation';
import PasswordForget from '../PasswordForget';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.LANDING} component={Landing} />

      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.ADMIN} component={Admin} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForget}
      />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
    </div>
  </Router>
);

export default App;
