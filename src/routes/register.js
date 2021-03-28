import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Splash from 'components/Loading/Splash'

import Pages from 'pages'

import PrivateRoute from './private'

const Router = () => {
  return (
    <React.Suspense fallback={<Splash />}>
      <Switch>
        <Redirect exact from='/' to='/auth' />
        <Route path='/auth/:token' component={Pages.Auth} />
        <Route path='/auth' component={Pages.Auth} />
        <PrivateRoute path='/logout' component={Pages.Logout} />
        <PrivateRoute exact path='/dashboard' component={Pages.Dashboard} />
        <PrivateRoute exact path='/start-farm' component={Pages.StartFarm} />
        <PrivateRoute exact path='/farms/:id' component={Pages.Farm} />
        {/* <PrivateRoute
          exact
          path='/documents/receipt'
          component={Pages.Receipt}
        /> */}
        <PrivateRoute
          exact
          path='/start-farm/individual'
          component={Pages.Individual}
        />
        <PrivateRoute
          exact
          path='/start-farm/cooperative'
          component={Pages.Cooperative}
        />
        <PrivateRoute path='/marketplace' component={Pages.Marketplace} />
        <PrivateRoute path='/warehouses' component={Pages.Warehouse} />
        <PrivateRoute path='/farms' component={Pages.FarmBoard} />
        <PrivateRoute path='/profile' component={Pages.Profile} />
        <PrivateRoute path='/guide' component={Pages.Guide} />
        <PrivateRoute path='/notfound' component={Pages.NotFound} />
        <Redirect from='*' to='/404' />
      </Switch>
    </React.Suspense>
  )
}

export default Router
