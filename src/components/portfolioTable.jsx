import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import Card from './Card';


export default function PortfolioTable({ optimizedData }) {
    return (
        <>
            {/* Fill optimizedData.data */}
            <div className="my-2 w-2/3">
                <p className="text-4xl font-semibold">Portfilo Results</p>

                <span className="divider"></span>

                <div className="flex flex-col gap-y-2 my-2 mx-3">
                    <h2 className="text-2xl font-semibold">Equal weights Portfolio</h2>
                    {

                        <div className="stats stats-vertical lg:stats-horizontal shadow-xl">

                            <div className="stat">
                                <div className="stat-title">Volatility</div>
                                <div className="stat-value">{(optimizedData.data.equal_weights_results.portfolio_volatility * 100).toFixed(2)}%</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Sharpe ratio</div>
                                <div className="stat-value">{optimizedData.data.equal_weights_results.sharpe_ratio}</div>
                            </div>


                            <div className="stat">
                                <div className="stat-title">Annual return</div>
                                <div className="stat-value">{(optimizedData.data.equal_weights_results.portfolio_annual_return * 100).toFixed(2)}%</div>
                            </div>

                        </div>

                    }
                </div>
            </div>

            <div className="my-2 w-2/3">
                <h2 className="text-2xl font-semibold">Optimized Portfolio</h2>
                <div className="flex flex-col gap-y-2 my-2 mx-3">
                    {
                        <div className="stats stats-vertical lg:stats-horizontal shadow-xl ">

                            <div className="stat">
                                <div className="stat-title">Volatility</div>
                                <div className="stat-value">{(optimizedData.data.optimized_results.performance.volatility * 100).toFixed(2)}%</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Sharpe ratio</div>
                                <div className="stat-value">{optimizedData.data.optimized_results.performance.sharpe_ratio.toFixed(2)}</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Annual returns</div>
                                <div className="stat-value">{(optimizedData.data.optimized_results.performance.expected_returns * 100).toFixed(2)}%</div>
                            </div>

                        </div>
                    }

                </div>
            </div>

            <div className="my-2 w-2/3">
                <div className="divider"></div>
                <h2 className="text-xl font-semibold">Invested</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Units</th>
                            <th>Allocated</th>
                            <th>Percentage</th>
                            <th>sector</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(optimizedData.data.optimized_results.invested).map((key, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{key}</td>
                                        <td>{optimizedData.data.optimized_results.invested[key].price.toFixed(2)}</td>
                                        <td>{optimizedData.data.optimized_results.invested[key].units}</td>
                                        <td>{optimizedData.data.optimized_results.invested[key].allocated.toFixed(2)}</td>
                                        <td>{(optimizedData.data.optimized_results.weights[key]).toFixed(2)}%</td>
                                        <td>{optimizedData.data.optimized_results.sector_allocation[key]}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="divider"></div>
                <Bar className="w-full"
                    data={{
                        labels: Object.keys(optimizedData.data.optimized_results.invested),
                        datasets: [
                            {
                                data: Object.values(optimizedData.data.optimized_results.weights),
                                backgroundColor: 'lightblue',
                                borderColor: 'black',
                                borderWidth: 1,
                            },
                        ],
                    }}
                    height={400}
                    width={600}
                    options={{
                        elements: {
                            bar: {
                                borderWidth: 2,
                            },
                        },
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Invested',
                            },
                            legend: {
                                display: false
                            }

                        },
                    }}
                />
            </div>
        </>

    )
}