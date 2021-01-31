import React, {useState, useEffect} from 'react';
import {Line, Bar, Doughnut} from 'react-chartjs-2';
import './style.css'
import {Col, Container, Row, Table, Select, Form} from "react-bootstrap";
import BarSection from "./BarSection";

const MarketDash = () => {

    const [chartData, setChartData] = useState( {
        labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        datasets: [
            {
                label: 'level of thickness',
                data: [32, 45, 12, 76, 69],
                yAxisID: 'B',
                order: 2,
                backgroundColor: [
                    'rgba(2, 2, 2, 0.2)',
                    'rgba(29, 60, 98, 0.2)',
                    'rgba(58, 121, 196, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(156, 188, 225, 0.2)',
                    'rgba(190, 215, 255, 0.2)'
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

    const [selectedChart, setSelectedChart] = useState( {
        name: 'Nasdaq',
        label: 'Select a chart',
        data: [0, 0, 0, 0, 0],
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
    });

    let allChartOptions = [
        {
            labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            datasets: [
                {
                    label: 'level of thickness',
                    data: [32, 45, 12, 76, 69],
                    yAxisID: 'B',
                    order: 2,
                    backgroundColor: [
                        'rgba(2, 2, 2, 0.2)',
                        'rgba(29, 60, 98, 0.2)',
                        'rgba(58, 121, 196, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(156, 188, 225, 0.2)',
                        'rgba(190, 215, 255, 0.2)'
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
            name: 'Nikkei',
        },
        {
            labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            datasets: [
                {
                    label: 'level of thickness',
                    data: [0, 11, 22, 33, 44],
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
            name: 'S&P500',
        },
        {
            labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            datasets: [
                {
                    label: 'level of thickness',
                    data: [95, 77, 52, 45, 27],
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
            name: 'Nasdaq'
        },
        {
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
            name: 'Else',
        },
        {
            labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            datasets: [
                {
                    label: 'level of thickness',
                    data: [0, 11, 22, 33, 44],
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
            name: 'Another One',
        },
        {
            labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            datasets: [
                {
                    label: 'level of thickness',
                    data: [95, 77, 52, 45, 27],
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
            name: 'Different'
        },
    ]

    const chart = () => {
        setChartData(selectedChart);
    }

    useEffect(() => {

        chart();
    }, []);



    const handleChartClick = (index) => {
        setChartData(allChartOptions[index])
    }

    let allCharts = allChartOptions.map((item, thenumber) => {
        return (
            <div className={`MarketDash__chartLink `} key={`chartLink-${thenumber}`} onClick={() => handleChartClick(thenumber)}>
                <h5>{item.name}</h5>
                <BarSection newData={item} options={{
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
                }}/>
            </div>
        )
    })

    const onSelectChange = () => {
        console.log('changed')
    }

    return (
        <Container fluid className='MarketDash'>
            <h4>Market Analysis Dashboard</h4>
            <Row>
                <Col md={6}>
                    <div>
                        <Form.Label>Example select</Form.Label>
                        <Form.Control as="select" onChange={() => onSelectChange()}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </div>
                    <div className="MarketDash__mainChart">
                        <BarSection newData={chartData} options={{
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
                        }}/>
                    </div>
                    <div className="MarketDash__chartNav">
                        {allCharts}
                    </div>
                    <div className="MarketDash__lowerCharts">
                        <Col xs={6}>
                            <BarSection newData={chartData} options={{
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
                            }}/>
                        </Col>
                        <Col xs={6}><BarSection  newData={chartData} options={{
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
                        }}/></Col>
                    </div>
                </Col>
                <Col md={6}>
                    <h2 className='text-center'>Teh table name</h2>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default MarketDash
