// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './HomePage';
import PaymentPage from './PaymentPage';
import CertificationPage from './CertificationPage';

import routes from '../constants/routes';

export default () => (
  <Switch>
    <Route path={routes.PAYMENT} component={PaymentPage} />
    <Route path={routes.CERTIFICATION} component={CertificationPage} />
    <Route path="" component={HomePage} />
  </Switch>
);
