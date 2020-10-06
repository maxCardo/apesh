import React, {Fragment} from 'react';
import './App.css';
import { Router } from 'express';
import { Route } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Landing from './components/custom/Landing'

const App = () => {
  


  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Route exact path = '/'  component = {Landing}/>
      </Fragment>
    </Router>
  );
}




export default App;
