import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from './Layout'
import App from '../App'
import PageCreateCompanyForm from './Forms/create-company'
import PageCreateUnityForm from './Forms/create-unity'
import PageCreateAssetForm from './Forms/create-asset'
import PageCreateResponsibleForm from './Forms/create-responsible'
import PageUpdateCompanyForm from './Forms/update-company'
import PageUpdateUnityForm from './Forms/update-unity'
import PageUpdateAssetForm from './Forms/update-asset'
import PageUpdateResponsiblestForm from './Forms/update-responsible'
import PageDeleteCompanyForm from './Forms/delete-company'
import PageDeleteUnityForm from './Forms/delete-unity'
import PageDeleteResponsibleForm from './Forms/delete-responsible'
import PageDeleteAssetForm from './Forms/delete-asset'
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
          <Route path="/update-company" component={PageUpdateCompanyForm} />
          <Route path="/update-unity" component={PageUpdateUnityForm} />
          <Route path="/update-asset" component={PageUpdateAssetForm} />
          <Route path="/update-responsible" component={PageUpdateResponsiblestForm} />
          <Route path="/delete-company" component={PageDeleteCompanyForm} />
          <Route path="/delete-unity" component={PageDeleteUnityForm} />
          <Route path="/delete-responsible" component={PageDeleteResponsibleForm} />
          <Route path="/delete-asset" component={PageDeleteAssetForm} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default Root
