import {Bar} from "react-chartjs-2";
import React from "react";

const BarSection = ({newData, options}) => {
    return (
        <>
            <Bar data={newData} options={options}/>
        </>
    )
}

export default BarSection
