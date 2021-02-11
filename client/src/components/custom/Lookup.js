import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Button from "react-bootstrap/Button";
import { Col, Container, Row, Badge, Tabs, TabContainer, Tab, Nav } from "react-bootstrap";
import dayjs from 'dayjs'


import {setSelectedCompany} from '../../actions/watchlist'
import News from './wacthlist/detailsModal/News'
import PriceVolChart from './wacthlist/detailsModal/PriceVolChart'


const Lookup = ({selectedCompany:{loading, details: {company, pricing,news}}, setSelectedCompany}) => {
  const [searchString, setSearchString] = useState('')
  const [showModal, setShowModal] = useState(false);

  const loadCompany = () => {
    console.log('load company running');
    setSelectedCompany({symbol: searchString.toUpperCase()})
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false);
    setSelectedCompany({});
  }

  function formatNum(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div style={{ flex: .1, overflow: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: 'blue' }}>
        <div style = {{ display: 'flex', marginLeft: '10px' , marginTop: '10px'}}>
          <input type="text" placeholder='Search Stock' onChange={(e) => setSearchString(e.target.value)} />
          <Button style={{ marginLeft: '10px' }} onClick={loadCompany}> Search </Button>
        </div>
               
      </div>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column'}}>
        {company && (
          <Container fluid>
            <Row>
              <Col style={{ fontSize: 'small' }}>
                <ul>
                  <li>Company Name: <a rel="noopener noreferrer" target='_blank'
                    href={company.website}>
                    {company.companyName}
                  </a>
                  </li>
                  <li>Sector: {company.sector}</li>
                  <li>Industry: {company.industry}</li>
                  <li>Price: {company.lastClose && company.lastClose.price} (last close)</li>
                  <br />
                  <li>Cash: {`$${formatNum(company.cash)}`}</li>
                  <li>Debt: {`$${formatNum(company.debt)}`}</li>
                  <li>Cash/Debt Ratio: {`${(company.cashDebtRatio * 100).toFixed(1)}%`}</li>
                  <br />
                  <li>Mentions - Last 24hr: {company.mentions.last_24}</li>
                  <li>Mentions - Last 7/15/30 days: {company.mentions.last_7}/{company.mentions.last_15}/{company.mentions.last_30}</li>
                  <br />
                  <li>Last Earnings: {company.lastReporting && dayjs(company.lastReporting.date).format('MM/DD/YYYY')}</li>
                  <li>EPS Expected: {company.lastReporting && `${company.lastReporting.estEPS.toFixed(2)} | Actual: ${company.lastReporting.actEPS.toFixed(2)} `} </li>
                  <li>Next Earnings: {company.nextReporting ? dayjs(company.nextReporting.date).format('MM/DD/YYYY') : 'n/a'}</li>
                  {company.nextReporting ? <li>Expectations: {company.nextReporting.estEPS.toFixed(2)}</li> : null}
                  <br />
                  <li>Growth (3 yr Avg): {(company.growth * 100).toFixed(1)}%</li>
                  <li>peRatio (3 yr Avg): {company.peRatio.toFixed(1)}</li>
                  <li>EPS (last full year): {company.eps.toFixed(1)}</li>
                </ul>
              </Col>
              <Col style={{ fontSize: 'small' }}>
                <ul>
                  <li><b>5-Day</b></li>
                  <li>Low-High: {company.average_5.low} - {company.average_5.high} </li>
                  <li>V-Wap: {company.average_5.vwap}</li>
                  <li>Volume: {company.average_5.volume}</li>
                  <li>Volatility: {company.average_5.volatPct} / {company.average_5.avgDayValatPct} </li>
                  <br />
                  <li><b>10-Day</b></li>
                  <li>Low-High: {company.average_10.low} - {company.average_10.high} </li>
                  <li>V-Wap: {company.average_10.vwap}</li>
                  <li>Volume: {company.average_10.volume}</li>
                  <li>Volatility: {company.average_10.volatPct} / {company.average_10.avgDayValatPct} </li>
                  <br />
                  <li><b>22-Day</b></li>
                  <li>Low-High: {company.average_22.low} - {company.average_22.high} </li>
                  <li>V-Wap: {company.average_22.vwap}</li>
                  <li>Volume: {company.average_22.volume}</li>
                  <li>Volatility: {company.average_22.volatPct} / {company.average_22.avgDayValatPct} </li>

                </ul>
              </Col>
              <Col xs={6}>
                {loading ? <div>...loading</div> : <PriceVolChart pricing={pricing} />}
              </Col>

              <Col className='DetailsModal__tabsWrap' xs={12}>
                <Tab.Container defaultActiveKey="description">
                  <Nav className='nav-tabs'>
                    <Nav.Item>
                      <Nav.Link eventKey="description">Company Description</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="news">News</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="description">
                      <p className='DetailsModal__description'>{company.description}</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="news">
                      {loading ? <div>...loading</div> : <News news={news} />}
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Col>
            </Row>
          </Container>
        )}
        
      </div>
      
      
    </div>
    
    
  );
};

const mapStateToProps = state => ({
  selectedCompany: state.watchlist.selectedCompany
})

export default connect(mapStateToProps, {setSelectedCompany})(Lookup);
