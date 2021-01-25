import {Bar} from "react-chartjs-2";
import React from "react";

const BarSection = ({newData}) => {
    return (
        <>
            <Bar data={newData} options={
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
            }/>
        </>
    )
}

export default BarSection
