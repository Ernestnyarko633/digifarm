import { Text } from '@chakra-ui/react'
import { Switch, Route, Redirect } from 'react-router-dom'
import React from 'react'
import Pages from 'pages'

const Router = () => (
  <React.Suspense fallback={<Text>Loading....</Text>}>
    <Switch>
      <Redirect exact from='/' to='/dashboard' />
      <Route exact path='/dashboard' component={Pages.Dashboard} />
      <Redirect exact from='/' to='/dashboard' />
      <Route exact path='/startfarm' component={Pages.StartFarm} />
      <Route exact path='/startfarm/individual' component={Pages.Individual} />
      <Route exact
        path='/startfarm/cooperative'
        component={Pages.Cooperative} />
      <Route path='/marketplace' component={Pages.Marketplace} />
      <Route path='/document' component={Pages.Document}/>
      <Route path='/farms' component={Pages.FarmBoard} />
      <Route path='/notfound' component={Pages.NotFound} />
      <Redirect from='*' to='/404' />
    </Switch>
  </React.Suspense>
)

export default Router
