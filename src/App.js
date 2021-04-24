import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {AuthProvider} from './Contexts/AuthContect';
import HomeScreen from './Components/HomeScreen';
import Login from './Components/Login';
import Register from './Components/Register';

import './App.css';

const App = () => {
  return (
    <React.Fragment>
      <AuthProvider>
            <Switch>
                <Route exact path="/" component={HomeScreen} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />        
            </Switch>
      </AuthProvider>
    </React.Fragment>
  );
};

export default App;
