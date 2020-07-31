import React,{Fragment} from 'react';
import Navbar from './components/layout/navbar';
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom';
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ContactState from './context/contact/contactState'
import AuthState from './context/auth/authState'
import AlertState from './context/alert/alertState'
import Alerts from './components/layout/alerts';
import './App.css';
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute'
if(localStorage.token)
  setAuthToken(localStorage.token);

const  App=()=> {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <Router>
    <Fragment className="App">
     <Navbar/>
      <div className="container">
      <Alerts/>
       <Switch>
         <PrivateRoute exact path="/" component={Home}/>
         <Route exact path="/about" component={About}/>
         <Route exact path="/register" component={Register}/>
         <Route exact path="/login" component={Login}/>
       </Switch>
      </div>
    </Fragment>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
