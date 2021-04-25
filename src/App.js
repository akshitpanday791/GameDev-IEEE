import React from 'react';
import {Switch, Route } from "react-router-dom";
import {AuthProvider} from './authcontext';
import Login from './Components/Login';
import Register from './Components/Register';
import PrivateRoute from './Components/PrivateRoute';
import Game from './Components/Game';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
        <Switch>
        <PrivateRoute exact path="/" component={Game} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />        
        </Switch>
    </AuthProvider>
  );
};

export default App;
