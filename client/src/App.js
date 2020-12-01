import React, {Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';


import Navbar from './components/common/navbar/Navbar';
import Landing from './components/custom/Landing'
import Lookup from './components/custom/Lookup'
import CompanyProfile from './components/custom/companyProfile/_profile'

const App = () => {
  


  return (
    <Router>
      <Fragment>
        <Navbar />
        <section className='container-b' style={{ position: 'relative', overflow: 'hidden' }}>
          <Route exact path='/' component={Landing} />
          <Route exact path='/lookup' component={Lookup} />
          <Route exact path='/company_profile' component={CompanyProfile} />
        </section>
      </Fragment>
    </Router>
  );
}


export default App;
