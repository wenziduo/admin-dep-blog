import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Layout from './layout/Layout';
import { routerData } from './utils/router';

const RooterContainer = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route
          path="/"
          component={() => (
            <Layout>
              <Switch>
                {routerData.map(item => (
                  <Route
                    exact
                    path={item.path}
                    component={item.component}
                    key={item.path}
                  />
                ))}
              </Switch>
            </Layout>
          )}
        />
      </Switch>
    </Router>
  );
};

export default RooterContainer;
