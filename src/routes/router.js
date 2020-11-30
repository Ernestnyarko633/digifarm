import { Text } from '@chakra-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Pages from 'pages';

const Router = () => (
  <React.Suspense fallback={<Text>Loading....</Text>}>
    <Switch>
      <Route exact path='/dashboard' component={Pages.Dashboard} />
      <Redirect exact from='/' to='/dashboard' />
      <Route exact path='/startfarm' component={Pages.StartFarm} />
      <Route exact path='/startfarm/:id' component={Pages.StartFarmDetails} />
      <Route path='/marketplace' component={Pages.Marketplace} />
      <Route path='/document' component={Pages.Document}/>
      <Route path='/notfound' component={Pages.NotFound} />
      <Redirect from='*' to='/404' />
    </Switch>
  </React.Suspense>
);

export default Router;
