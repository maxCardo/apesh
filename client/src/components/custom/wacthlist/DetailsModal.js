import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {getWatchlist, likeItem, removeItem} from "../../../actions/watchlist";
import {Col, Container, Row, Badge, Tabs, TabContainer, Tab, Nav} from "react-bootstrap";
import {AreaChart} from "@carbon/charts-react";

import "@carbon/charts/styles.css";
import {Bar} from "react-chartjs-2";


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

    const [chartData, setChartData] = useState();

    const chart = () => {
        setChartData({
            labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            datasets: [
                {
                    label: 'level of thickness',
                    data: [32, 45, 12, 76, 69],
                    yAxisID: 'B',
                    order: 2,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderWidth: 4,
                    //barThickness: 50
                },
                {
                    type: 'line',
                    label: 'line data',
                    data: [332, 145, 212, 716, 619],
                    yAxisID: 'A',
                    fill: false,
                    order: 1,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderWidth: 4,
                },
            ],
        });
    };

    useEffect(() => {
        chart();
    }, []);

    const BarSection = () => {
        return (
            <>
                <Bar data={chartData} options={
                    {
                        scales: {
                            yAxes: [{
                                id: 'A',
                                type: 'linear',
                                position: 'left',
                            }, {
                                id: 'B',
                                type: 'linear',
                                position: 'right',
                                ticks: {
                                    max: 100,
                                    min: 0
                                }
                            }]
                        }
                    }
                } />
            </>
        )
    }

    company && company.company && company.company.companyName && console.log(company);

    return (
        <Modal size="xl" onClose={() => closeModal()} onHide={() => closeModal()} show={showModal}
               className='DetailsModal'>
            <Modal.Header closeButton>
                <img src={company && company.company && company.company.image} alt=""/>
                <Modal.Title>{company && company.company && company.company.companyName} Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col>
                            <div>
                                {company && company.company && company.company.symbol}
                                <Badge variant='secondary'>{company && company.status}</Badge>
                            </div>
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
                        <Col>
                            <BarSection />
                        </Col>
                        <Col className='DetailsModal__tabsWrap' xs={12}>
                            <Tab.Container defaultActiveKey="description">
                                <Nav className='nav-tabs'>
                                    <Nav.Item>
                                        <Nav.Link eventKey="description">Company Description</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="other">Other things</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="longTermAnalysis">Analytics</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="description">
                                        <p className='DetailsModal__description'>{company && company.company && company.company.description && company.company.description}</p>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="other">
                                        <p className='DetailsModal__description'>Stuff</p>
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

export default DetailsModal;
