import React, {Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Navbar from './components/common/navbar/Navbar';
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
