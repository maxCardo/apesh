import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import { Bar } from "react-chartjs-2";
import dayjs from 'dayjs'
import {getIndexData} from '../../../actions/marketDash'
import './style.css'
import {Col, Container, Row} from "react-bootstrap";
import Sector from './Sector'
import Vix from './Vix'

const MarketDash = ({market:{list, loading}, getIndexData}) => {

    const [chartData, setChartData] = useState();
    const [chartOptions, setChartOptions] = useState({
        scales: {
            yAxes: [{
                id: 'A',
                type: 'linear',
                position: 'left',
            }, {
                id: 'B',
                type: 'linear',
                position: 'right',
            }]
        }
    })
    
    let allChartOptions  = list.map((idx, i) => {
        const arr = idx.historical
        const dataArr = arr[0].date > arr[1].date ? arr.reverse() : arr 
        const chartData = {
            labels: dataArr.map(x => dayjs(x.date).format('MM/DD/YY')),
            datasets: [
                {
                    label: 'Volume',
                    data: dataArr.map((x) => x.volume > 0 ? x.volume : x.avgVolume),
                    yAxisID: 'B',
                    order: 2,
                    backgroundColor: 'rgba(58, 121, 196, 0.2)',
                    //borderWidth: 4,
                    //barThickness: 50
                },
                {
                    type: 'line',
                    label: 'open',
                    data: dataArr.map(x => x.open),
                    yAxisID: 'A',
                    fill: false,
                    order: 1,
                    borderColor: 'rgba(180, 171, 227, 0.41)',
                    //borderWidth: 4,
                },
                {
                    type: 'line',
                    label: 'close',
                    data: dataArr.map(x => x.close),
                    yAxisID: 'A',
                    fill: false,
                    order: 1,
                    borderColor: 'rgba(255, 206, 86, 0.2)',
                    //borderWidth: 4,
                },
                {
                    type: 'line',
                    label: 'high',
                    data: dataArr.map(x => x.high),
                    yAxisID: 'A',
                    fill: false,
                    order: 1,
                    borderColor: 'rgba(75, 192, 192, 0.2)',
                    //borderWidth: 4,
                },
                {
                    type: 'line',
                    label: 'low',
                    data: dataArr.map(x => x.low),
                    yAxisID: 'A',
                    fill: false,
                    order: 1,
                    borderColor: 'rgba(120, 165, 200, 0.4)',
                    //borderWidth: 4,
                },
                {
                    type: 'line',
                    label: 'vwap',
                    data: dataArr.map(x => x.vwap),
                    yAxisID: 'A',
                    fill: false,
                    order: 1,
                    borderColor: 'rgba(180, 171, 227, 0.41)',
                    //borderWidth: 4,
                },
               
            ],

            name: idx.symbol,
        }



        return chartData
    })
    
    useEffect(() => {
        getIndexData()
        if (!chartData) {
            setChartData(allChartOptions[0])    
        }
    }, []);

    useEffect(() => {
        if (!chartData) {
            setChartData(allChartOptions[0])
        }
    }, [list]);


    const handleChartClick = (i) => {
        const data = allChartOptions[i]
        setChartData(data)
    }

    let allCharts = allChartOptions.map((item, i) => {
        const options = {
            legend: { display: false },
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
                        max: 4000000000,
                        min: 0
                    }
                }]
            }
        }

        return (
            <div className={`MarketDash__chartLink `} key={`chartLink-${i}`} onClick={() => handleChartClick(i)}>
                <h5>{item.name}</h5>
                {/* <Bar data={{datasets: item.datasets}} options={options}/> */}
            </div>

        )
    })


    return loading ? <div>...loading </div> : (
        <Container fluid className='MarketDash'>
            <h4>Market Analysis Dashboard</h4>
            <Row>
                <Col md={6}>
                    <div className="MarketDash__mainChart">
                        <Bar data={chartData} height={125} options={chartOptions}/>
                    </div>
                    <div className="MarketDash__chartNav">
                        {allCharts}
                    </div>
                    <div className="MarketDash__lowerCharts">
                        <Col xs={6}>
                            <Vix data={list.filter(x => x.symbol === '^VIX')}/>
                        </Col>
                        <Col xs={6}>
                            <Bar data={chartData} options={chartOptions}/>
                        </Col>
                    </div>
                </Col>
                <Col md={6}>
                    <Sector/>   
                </Col>
            </Row>
        </Container>
    )
}
const mapStateToProps = state => ({
    market: state.market
})


export default connect(mapStateToProps, {getIndexData})(MarketDash)
