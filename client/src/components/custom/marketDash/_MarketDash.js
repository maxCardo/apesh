
import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './style.css'

const MarketDash = () => {
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

    return (
        <>
            <div className="main_container">
                <div className="section_one">
                    <div className="chart_one" >

                        <BarSection />
                    </div>
                    <div className="chart_section_two" >
                        <div><BarSection /></div>
                        <div><BarSection /></div>
                        <div><BarSection /></div>
                    </div>

                    <div className="chart_section_three">
                        <div><BarSection /></div>
                        <div><BarSection /></div>
                    </div>
                </div>
                <div className="section_two">
                    <h1>Here goes the table</h1>
                </div>

            </div>



        </>
    )
}

export default MarketDash






    return (
        <div>
            test
        </div>
    );
};

export default MarketDash;



