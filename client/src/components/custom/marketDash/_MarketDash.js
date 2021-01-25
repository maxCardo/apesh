import React, {useState, useEffect} from 'react';
import {Line, Bar, Doughnut} from 'react-chartjs-2';
import './style.css'
import {Col, Container, Row, Table} from "react-bootstrap";
import BarSection from "./BarSection";

const MarketDash = () => {
    const [chartData, setChartData] = useState();
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
    const [chartLinkData, setChartLinkData] = useState([]);

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
                <BarSection newData={item}/>
                <h5> woohoo</h5>
            </div>
        )
    })

    return (
        <Container fluid className='MarketDash'>
            <h4>Market Analysis Dashboard</h4>
            <Row>
                <Col md={6}>
                    <div className="MarketDash__mainChart">
                        <BarSection newData={chartData}/>
                    </div>
                    <div className="MarketDash__lowerCharts">
                        <Col xs={6}>
                            <BarSection newData={chartData}/>
                        </Col>
                        <Col xs={6}><BarSection  newData={chartData}/></Col>
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
                <div className="MarketDash__chartNav">
                    {allCharts}
                </div>
            </Row>
        </Container>
    )
}

export default MarketDash
