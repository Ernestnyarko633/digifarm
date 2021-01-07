import { Text } from '@chakra-ui/react'
import { Switch, Redirect, Route } from 'react-router-dom'
import React from 'react'
import Pages from 'pages'
import PrivateRoute from './PrivateRoute'
import Auth from 'pages/auth'

const Router = () => (
  <React.Suspense fallback={<Text>Loading....</Text>}>
    <Switch>
      <Redirect exact from='/' to='/auth' />
      <Route path='/auth/:token' component={Auth} />
      <Route path='/auth' component={Auth} />
      <PrivateRoute exact path='/dashboard' component={Pages.Dashboard} />
      <PrivateRoute exact path='/profile' component={Pages.Profile} />
      <PrivateRoute exact path='/startfarm' component={Pages.StartFarm} />
      <PrivateRoute exact
        path='/startfarm/individual'
        component={Pages.Individual} />
      <PrivateRoute exact
        path='/startfarm/cooperative'
        component={Pages.Cooperative} />
      <PrivateRoute path='/marketplace' component={Pages.Marketplace} />
      <PrivateRoute path='/document' component={Pages.Document} />
      <PrivateRoute path='/farms' component={Pages.FarmBoard} />
      <PrivateRoute path='/notfound' component={Pages.NotFound} />
      <Redirect from='*' to='/404' />
    </Switch>
  </React.Suspense>
)

export default Router
