import React, {useState, useEffect} from 'react'
import { Bar } from "react-chartjs-2";

const PriceVolChart = ({pricing}) => {

    const [chartData, setChartData] = useState();

    const chart = () => {
        console.log('pricing', pricing);


        setChartData({
            labels: pricing.map(rec => rec.date).reverse(),
            datasets: [
                {
                    label: 'volume',
                    data: pricing.map(rec => rec.volume/10000).reverse(),
                    yAxisID: 'B',
                    order: 4,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 4,
                    //barThickness: 50
                },
                {
                    type: 'line',
                    label: 'V-Wap',
                    data: pricing.map(rec => rec.vwap).reverse(),
                    yAxisID: 'A',
                    fill: false,
                    order: 3,
                    borderColor: 'rgba(180, 171, 227, 0.41)',
                    borderWidth: 4,
                },
                {
                    type: 'line',
                    label: 'High',
                    data: pricing.map(rec => rec.high).reverse(),
                    yAxisID: 'A',
                    fill: false,
                    order: 2,
                    borderColor: 'rgba(255, 206, 86, 0.2)',
                    borderWidth: 4,
                },
                {
                    type: 'line',
                    label: 'Low',
                    data: pricing.map(rec => rec.low).reverse(),
                    yAxisID: 'A',
                    fill: false,
                    order: 1,
                    borderColor: 'rgba(75, 192, 192, 0.2)',
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

    return <BarSection/>



    
}

export default PriceVolChart