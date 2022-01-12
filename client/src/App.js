import React, {Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/common/navbar/Navbar';
import Landing from './components/custom/Landing'
import Lookup from './components/custom/Lookup'
import CompanyProfile from './components/custom/companyProfile/_profile'
import MarketDash from "./components/custom/marketDash/_MarketDash"
import Watchlist from './components/custom/wacthlist/_Watchlist'
import Reporting from './components/custom/reporting/_Reporting'
import Scanner from './components/custom/scaner/_scaner';

const App = () => {
  


  return (
    <Router>
      <Fragment>
        <Navbar />
        <section className='container-b'>
          <Route exact path='/' component={Landing} />
          <Route exact path='/lookup' component={Lookup} />
          {/* <Route exact path='/company_profile' component={CompanyProfile} /> */}
          <Route exact path="/market_dash" component={MarketDash} />
          <Route exact path='/watchlist' component={Watchlist} />
          <Route exact path='/reporting' component={Reporting} />
          <Route exact path='/scanner' component={Scanner} />
        </section>
      </Fragment>
    </Router>
  );
}


export default App;
