import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {getWatchlist, likeItem, removeItem} from "../../../actions/watchlist";
import {Col, Container, Row, Badge, Tabs, TabContainer} from "react-bootstrap";
import {AreaChart} from "@carbon/charts-react";

import "@carbon/charts/styles.css";
import Tab from "@carbon/charts/styles/vendor/carbon-components/es/components/tabs/tabs";


const DetailsModal = ({closeModal, showModal, company}) => {
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

    company && company.company && company.company.companyName && console.log(company);

    return (
        <Modal size="xl" onClose={() => closeModal()} onHide={() => closeModal()} show={showModal}
               className='DetailsModal'>
            <Modal.Header closeButton>
                <Modal.Title>{company && company.company && company.company.companyName} Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="details" id="uncontrolled-tab-example">
                    <Tab eventKey="details" title="Details">
                        <TabContainer>
                            <Row>
                                <Col xs={12}>
                                    {company && company.company && company.company.symbol}
                                    <Badge variant='secondary'>{company && company.status}</Badge>
                                </Col>
                                <Col>
                                    <img style={{maxHeight: '80px', width: 'auto'}}
                                         src={company && company.company && company.company.image} alt=""/>
                                    <ul>
                                        <li>Company Name: <a rel="noopener noreferrer" target='_blank'
                                                             href={company && company.company && company.company.website}>
                                            {company && company.company && company.company.companyName}
                                        </a>
                                        </li>
                                        <li>Industry: {company && company.company && company.company.industry}</li>
                                        <li>Sector: {company && company.company && company.company.sector}</li>
                                        <li>Price: {company && company.company && company.company.lastClose && company.company.lastClose.price} -
                                            this is last close
                                        </li>
                                        <li>52 Week High/Low</li>
                                        <li>Cash: cant find</li>
                                        <li>Debt: cant find</li>
                                        <li>Cash/Debt Ratio n/a</li>
                                        <li></li>
                                    </ul>
                                </Col>

                            </Row>

                        </TabContainer>
                    </Tab>
                    <Tab eventKey="description" title="Description">
                        <p className='DetailsModal__description'>{company && company.company && company.company.description && company.company.description}</p>
                    </Tab>
                    <Tab eventKey="longTermAnalysis" title="Long term analysis">
                        <Row>
                            <Col xs={12}>
                                <h4>Some more</h4>
                                <p>stuff</p>
                                <AreaChart
                                    data={data}
                                    options={options}>
                                </AreaChart>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={closeModal} variant="secondary">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailsModal;
