import React from 'react';
import {Switch, Route } from "react-router-dom";
import {AuthProvider} from './authcontext';
import Login from './Components/Login';
import Register from './Components/Register';
import PrivateRoute from './Components/PrivateRoute';
import Game from './Components/Game';
import ForgotPassword from "./Components/ForgotPassword.jsx";
import UpdateProfile from './Components/Updateprofile';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
        <Switch>
        <PrivateRoute exact path="/" component={Game} />
        <PrivateRoute path="/updateprofile" component={UpdateProfile} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />  
          <Route path="/forgotpassword" component={ForgotPassword} />      
        </Switch>
    </AuthProvider>
  );
};

export default App;
