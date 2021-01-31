import React, { useEffect, useState } from "react";
import {connect} from 'react-redux'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Col, Container, Row, Badge, Tabs, TabContainer, Tab, Nav} from "react-bootstrap";
import dayjs from 'dayjs'


import {AreaChart} from "@carbon/charts-react";
import "@carbon/charts/styles.css";

import {setSelectedCompany} from '../../../../actions/watchlist'
import News from './News'
import PriceVolChart from './PriceVolChart'


const DetailsModal = ({closeModal, showModal, company, selectedCompany:{details:{news, pricing}, loading}, setSelectedCompany}) => {

    const [data, setData] = useState([
        {
            "group": "Dataset 1",
            "date": "2018-12-31T23:00:00.000Z",
            "value": 0
        },
        {
            "group": "Dataset 1",
            "date": "2019-01-05T23:00:00.000Z",
            "value": -37312
        },
        {
            "group": "Dataset 1",
            "date": "2019-01-07T23:00:00.000Z",
            "value": -22392
        },
        {
            "group": "Dataset 1",
            "date": "2019-01-14T23:00:00.000Z",
            "value": -52576
        },
        {
            "group": "Dataset 1",
            "date": "2019-01-18T23:00:00.000Z",
            "value": 20135
        },
        {
            "group": "Dataset 2",
            "date": "2018-12-31T23:00:00.000Z",
            "value": 47263
        },
        {
            "group": "Dataset 2",
            "date": "2019-01-04T23:00:00.000Z",
            "value": 14178
        },
        {
            "group": "Dataset 2",
            "date": "2019-01-07T23:00:00.000Z",
            "value": 23094
        },
        {
            "group": "Dataset 2",
            "date": "2019-01-12T23:00:00.000Z",
            "value": 45281
        },
        {
            "group": "Dataset 2",
            "date": "2019-01-18T23:00:00.000Z",
            "value": -63954
        }
    ]);

    const [options, setOptions] = useState({
        "title": "Area (time series - natural curve)",
        "axes": {
            "bottom": {
                "title": "2019 Annual Sales Figures",
                "mapsTo": "date",
                "scaleType": "time"
            },
            "left": {
                "mapsTo": "value",
                "scaleType": "linear"
            }
        },
        "curve": "curveNatural",
        "height": "400px"
    });

    useEffect(() => {
        if (Object.keys(company).length){
            console.log('is not empty');
            setSelectedCompany(company)
        }
    }, [company]);

    return (
        <Modal size="xl" onClose={() => closeModal()} onHide={() => closeModal()} show={showModal}
               className='DetailsModal'>
            <Modal.Header closeButton>
                <img src={company && company.company && company.company.image} alt=""/>
                <Modal.Title>{company && company.company && company.company.companyName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <div>
                        {company && company.company && company.company.symbol}
                        {/* <Badge variant='secondary'>{company && company.status}</Badge> */}
                    </div>
                    <Row>
                        <Col>
                            <ul>
                                <li>Company Name: <a rel="noopener noreferrer" target='_blank'
                                                     href={company && company.company && company.company.website}>
                                    {company && company.company && company.company.companyName}
                                </a>
                                </li>
                                <li>Sector: {company && company.company && company.company.sector}</li>
                                <li>Industry: {company && company.company && company.company.industry}</li>
                                <li>Price: {company && company.company && company.company.lastClose && company.company.lastClose.price} (last close)</li>
                                <li>Cash: cant find</li>
                                <li>Debt: cant find</li>
                                <li>Cash/Debt Ratio: n/a</li>
                                <li>Mentions - Last 24hr: {company && company.company && company.company.mentions.last_24}</li>
                                <li>Mentions - Last 7/15/30 days: {company && company.company && company.company.mentions.last_7}/{company && company.company && company.company.mentions.last_15}/{company && company.company && company.company.mentions.last_30}</li>
                                <li>Last Earnings: {company && company.company && dayjs(company.company.lastEarnings).format('MM/DD/YYYY')}</li>
                                <li></li>
                            </ul>
                        </Col>
                        <Col style={{ fontSize: 'small' }}>
                            <ul>
                                <li>5-Day</li>
                                <li><b>Low-High:</b> {company && company.company && company.company.average_5.low} - {company && company.company && company.company.average_5.high} </li>
                                <li>V-Wap: {company && company.company && company.company.average_5.vwap}</li>
                                <li>Volume: {company && company.company && company.company.average_5.volume}</li>
                                <li>Volatility: {company && company.company && company.company.average_5.volatPct} / {company && company.company && company.company.average_5.avgDayValatPct} </li>
                                <br/>
                                <li>10-Day</li>
                                <li>Low-High: {company && company.company && company.company.average_10.low} - {company && company.company && company.company.average_10.high} </li>
                                <li>V-Wap: {company && company.company && company.company.average_10.vwap}</li>
                                <li>Volume: {company && company.company && company.company.average_10.volume}</li>
                                <li>Volatility: {company && company.company && company.company.average_10.volatPct} / {company && company.company && company.company.average_10.avgDayValatPct} </li>
                                <br />
                                <li>22-Day</li>
                                <li>Low-High: {company && company.company && company.company.average_22.low} - {company && company.company && company.company.average_22.high} </li>
                                <li>V-Wap: {company && company.company && company.company.average_22.vwap}</li>
                                <li>Volume: {company && company.company && company.company.average_22.volume}</li>
                                <li>Volatility: {company && company.company && company.company.average_22.volatPct} / {company && company.company && company.company.average_22.avgDayValatPct} </li>
                                
                            </ul>
                        </Col>
                        <Col xs={6}>
                            {loading ? <div>...loading</div> : <PriceVolChart pricing={pricing}/>}
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
                                        <p className='DetailsModal__description'>{company && company.company && company.company.description && company.company.description}</p>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="news">
                                        {loading ? <div>...loading</div> : <News news={news}/> }
                                        {/* <p className='DetailsModal__description'>This is the news</p> */}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="longTermAnalysis" title="Long term analysis">
                                        <p className='DetailsModal__description'>Things</p>
                                        <div className="flex">
                                            <AreaChart
                                                data={data}
                                                options={options}>
                                            </AreaChart>
                                            <AreaChart
                                                data={data}
                                                options={options}>
                                            </AreaChart>
                                            <AreaChart
                                                data={data}
                                                options={options}>
                                            </AreaChart>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Col>
                    </Row>

                </Container>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={closeModal} variant="secondary">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = state => ({
    selectedCompany: state.watchlist.selectedCompany
})

export default connect(mapStateToProps, {setSelectedCompany})(DetailsModal);
  