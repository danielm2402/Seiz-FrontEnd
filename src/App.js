import React, { Component } from 'react';
import { Provider } from 'react-redux';
import history from './redux/utils/history'
import { PersistGate } from 'redux-persist/integration/react'
import { Route, Switch, BrowserRouter,withRouter, Redirect } from 'react-router-dom';
import configureStore from './redux/configStore';
import './App.css';
//Pages components
import ComponentPrueba from '../src/components/Component'


const initialState = {}
const {persistor, store} = configureStore(initialState, history);
class App extends Component {
  render() {
    return (
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
      <BrowserRouter history={ history }>
        <Route exact path="/" render={()=><Redirect to="/dashboard"/>}/>
        <Route path="/dashboard" component={ComponentPrueba}/>
      </BrowserRouter>
    </PersistGate>
</Provider>
    );
  }
}

export default App;
