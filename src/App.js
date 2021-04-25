import React from 'react';
import {Switch, Route } from "react-router-dom";
import {AuthProvider} from './authcontext';
import HomeScreen from './Components/HomeScreen';
import Login from './Components/Login';
import Register from './Components/Register';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />        
        </Switch>
    </AuthProvider>
  );
};

export default App;
