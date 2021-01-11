import { Text } from '@chakra-ui/react'
import { Switch, Redirect, Route } from 'react-router-dom'
import React from 'react'
import Pages from 'pages'
import PrivateRoute from './PrivateRoute'

const Router = () => (
  <React.Suspense fallback={<Text>Loading....</Text>}>
    <Switch>
      <Redirect exact from='/' to='/auth' />
      <Route path='/auth/:token' component={Pages.Auth} />
      <Route path='/auth' component={Pages.Auth} />
      <PrivateRoute exact path='/dashboard' component={Pages.Dashboard} />
      <PrivateRoute exact path='/start-farm' component={Pages.StartFarm} />
      <PrivateRoute exact path='/start-farm/individual' component={Pages.Individual} />
      <PrivateRoute exact path='/start-farm/cooperative' component={Pages.Cooperative} />
      <PrivateRoute path='/marketplace' component={Pages.Marketplace} />
      <PrivateRoute path='/document' component={Pages.Document} />
      <PrivateRoute path='/farms' component={Pages.FarmBoard} />
      <PrivateRoute path='/notfound' component={Pages.NotFound} />
      <Redirect from='*' to='/404' />
    </Switch>
  </React.Suspense>
)

export default Router
