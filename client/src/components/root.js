import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from './Layout'
import App from '../App'
import PageCreateCompanyForm from './Forms/create-company'
import PageCreateUnityForm from './Forms/create-unity'
import PageCreateAssetForm from './Forms/create-asset'
import PageCreateResponsibleForm from './Forms/create-responsible'
import Sidebar from './Sidebar'

const Root = () => {
  return (
    <Router>
      <Layout>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/create-company" component={PageCreateCompanyForm} />
          <Route path="/create-unity" component={PageCreateUnityForm} />
          <Route path="/create-asset" component={PageCreateAssetForm} />
          <Route path="/create-responsible" component={PageCreateResponsibleForm} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default Root
