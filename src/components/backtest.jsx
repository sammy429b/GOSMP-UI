import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export default function BackTest({backtestData}) {
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Percentage change vs Date',
            },
            scales: {
                y: {
                    min: -100,
                    max: 100,
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return value + '%';
                        }
                    },
                    step: 10
                }
            }
        },
    };

    return (
        <>
            {
                // Draw chart of equal weights results and nifty pct change

                <div className="my-2 w-2/3">
                    <h2 className="text-2xl font-semibold">Results</h2>
                    <Line 
                        data={{
                            labels: Object.values(backtestData.equal_weights_results.Date),
                            datasets: [
                                {
                                    label: 'Portfolio',
                                    data: Object.values(backtestData.optimized_results.PctChange),
                                    fill: false,
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderColor: 'rgba(255, 99, 132, 0.2)',
                                },
                                {
                                    label: 'Nifty',
                                    data: Object.values(backtestData.equal_weights_results.niftyPctChange),
                                    fill: false,
                                    backgroundColor: 'rgb(54, 162, 235)',
                                    borderColor: 'rgba(54, 162, 235, 0.2)',
                                },
                                {
                                    label: "equal weights",
                                    data: Object.values(backtestData.equal_weights_results.PctChange),
                                    fill: false,
                                    backgroundColor: 'rgb(255, 159, 64)',
                                    borderColor: 'rgba(255, 99, 132, 0.2)',
                                }
                            ]
                        }}
                        height={400}
                        width={600}
                        options={options}
                    />
                </div>
            }
        </>
    )
}