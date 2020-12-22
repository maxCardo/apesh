import React, {useState, useEffect} from 'react'
import {Line, Bar} from 'react-chartjs-2'


const Landing = () => {

    const [chartData, setChartData] = useState()

    const chart = () => {
        setChartData({
            labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            datasets: [
                {
                    label: 'level of thickness',
                    data: [32, 45, 12, 76, 69], 
                    backgroundColor: ['rgba(75, 192, 192, 0.6)'],
                    borderWidth: 4
                }
            ]
        })
    }

    useEffect(() => {
        chart()
    }, [])

    return(
        <div>
            <p>this is the landing page</p>
            
        </div>
    )
}

export default Landing