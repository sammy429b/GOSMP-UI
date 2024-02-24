import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"

export default function Optimize() {

    const [investmentAmount, setInvestmentAmount] = useState(100000)
    const [duration, setDuration] = useState(1)
    
    const [diversifyPortfolio, setDiversifyPortfolio] = useState(false)

    const [sectors, setSectors] = useState([])

    const [optimizedData, setOptimizedData] = useState({
        loading: false,
        data: null
    })

    const getDateWithDuration = (duration) => { 
        const startDate = Date.now()
        const endDate = new Date(startDate) + duration * 30 * 24 * 60 * 60 * 1000
        const newEndDate = new Date(endDate)
        return newEndDate.toDateString()
    }

    const dialogRef = useRef()



    const optimize = async () => { 
        if (investmentAmount === 0) { 
            alert("Please enter the amount you want to invest")
            return
        }
        if (duration === 0) { 
            alert("Please select a duration to invest")
            return
        }
        if (diversifyPortfolio) { 
            // set sectors
        }
        setOptimizedData({
            ...optimizedData,
            loading: true
        })

        await fetch("http://localhost:8000/optimize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                risk_category: "Low risk",
                risk_score: 0.4,
                invest_amount: investmentAmount,
                duration: duration * 30
            })
        }).then(response => response.json())
            .then(data => {
                setOptimizedData({
                    loading: false,
                    data: data
                })
            })
            .catch(error => { 
                console.error(error)
                setOptimizedData({
                    loading: false,
                    data: null
                })
            })
    }




    useEffect(() => { 
        const question = document.querySelector("#question")
        const span = dialogRef.current
        question.addEventListener("mouseover", () => {            
            span.style.left = question.parentElement.offsetLeft + question.parentElement.offsetWidth + "px" 
            span.style.top = question.parentElement.offsetTop + "px"
            console.log(span.style.left, span.style.top);
            span.hidden = false
        })
        question.addEventListener("mouseout", () => {
            span.hidden = true
        })
        return () => { 
            question.removeEventListener("mouseover", () => {
                span.hidden = false
            })
            question.removeEventListener("mouseover", () => {
                span.hidden = true
            })
        }
    }, [])
    
    
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">

                <h1 className="text-4xl font-semibold mt-24">Portfolio Optimization</h1>

                <div className="w-full flex flex-col items-center">
                  
                    <div className="my-1 w-1/2 flex justify-center">
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className="label-text text-base">Enter the amount you want to invest</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} />
                        </label>
                    </div>

                    <div className="my-1 w-1/2 self-center flex flex-col items-center">
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className="label-text text-base">Select duration to invest</span>
                            </div>
                            <select className="select select-bordered w-full max-w-lg" value={duration} onChange={(e) => setDuration(e.target.value)}>
                                <option value={1}>1 month</option>
                                <option value={2}>2 months</option>
                                <option value={6}>6 months</option>
                                <option value={6}>12 months</option>
                                <option value={7}>18 months</option>
                                <option value={8}>24 months</option>
                            </select>
                        <p className="italic text-sm self-start">
                            {
                                duration === 0 ? "Select a duration to invest" : `duration end date is ${getDateWithDuration(duration)}`
                            }
                        </p>
                        </label>

                    </div>

                    <div className="my-1 w-1/2 flex justify-center">
                        <div className="form-control w-full max-w-lg">
                            <div className="mt-2 flex flex-row justify-start">
                                <label htmlFor="diversify" className="cursor-pointer label">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="diversify" className="toggle toggle-primary" value={diversifyPortfolio} onChange={(e) => setDiversifyPortfolio(e.target.checked)} />
                                    </div>
                                </label>
                                <span className="ml-2 flex justify-center items-center gap-x-2 hover:cursor-pointer">
                                    Diversify portfolio
                                    <svg id="question" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512" className="text-white w-6" fill="currentColor"><path fillRule="nonzero" d="M256 0c70.69 0 134.7 28.66 181.02 74.98C483.34 121.31 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.7 483.34 326.69 512 256 512c-70.69 0-134.69-28.66-181.02-74.98C28.66 390.7 0 326.69 0 256c0-70.69 28.66-134.69 74.98-181.02C121.31 28.66 185.31 0 256 0zm-21.49 301.51v-2.03c.16-13.46 1.48-24.12 4.07-32.05 2.54-7.92 6.19-14.37 10.97-19.25 4.77-4.92 10.51-9.39 17.22-13.46 4.31-2.74 8.22-5.78 11.68-9.18 3.45-3.36 6.19-7.27 8.23-11.69 2.02-4.37 3.04-9.24 3.04-14.62 0-6.4-1.52-11.94-4.57-16.66-3-4.68-7.06-8.28-12.04-10.87-5.03-2.54-10.61-3.81-16.76-3.81-5.53 0-10.81 1.11-15.89 3.45-5.03 2.29-9.25 5.89-12.55 10.77-3.3 4.87-5.23 11.12-5.74 18.74h-32.91c.51-12.95 3.81-23.92 9.85-32.91 6.1-8.99 14.13-15.8 24.08-20.42 10.01-4.62 21.08-6.9 33.16-6.9 13.31 0 24.89 2.43 34.84 7.41 9.96 4.93 17.73 11.83 23.27 20.67 5.48 8.84 8.28 19.1 8.28 30.88 0 8.08-1.27 15.34-3.81 21.79-2.54 6.45-6.1 12.24-10.77 17.27-4.68 5.08-10.21 9.54-16.71 13.41-6.15 3.86-11.12 7.82-14.88 11.93-3.81 4.11-6.56 8.99-8.28 14.58-1.73 5.63-2.69 12.59-2.84 20.92v2.03h-30.94zm16.36 65.82c-5.94-.04-11.02-2.13-15.29-6.35-4.26-4.21-6.35-9.34-6.35-15.33 0-5.89 2.09-10.97 6.35-15.19 4.27-4.21 9.35-6.35 15.29-6.35 5.84 0 10.92 2.14 15.18 6.35 4.32 4.22 6.45 9.3 6.45 15.19 0 3.96-1.01 7.62-2.99 10.87-1.98 3.3-4.57 5.94-7.82 7.87-3.25 1.93-6.86 2.9-10.82 2.94zM417.71 94.29C376.33 52.92 319.15 27.32 256 27.32c-63.15 0-120.32 25.6-161.71 66.97C52.92 135.68 27.32 192.85 27.32 256c0 63.15 25.6 120.33 66.97 161.71 41.39 41.37 98.56 66.97 161.71 66.97 63.15 0 120.33-25.6 161.71-66.97 41.37-41.38 66.97-98.56 66.97-161.71 0-63.15-25.6-120.32-66.97-161.71z" /></svg>
                                </span>
                                <div className="absolute z-10 w-48 p-2 bg-white rounded-md shadow-md" hidden id="dialogHelper" ref={dialogRef}>
                                    <p className="text-sm">Diversifying your portfolio means spreading your investments across a variety of asset sectors.</p>
                                </div>
                            </div>    
                        </div>
                    </div>

                    {
                        diversifyPortfolio && (
                            <div className="my-1">
                                <label className="form-control w-full max-w-lg">
                                    <div className="label">
                                        <span className="label-text text-base">Select from the following assets with invest percentage</span>
                                    </div>
                                </label>                                        

                                <div className="flex flex-col gap-y-2">
                                    
                                    <div className="flex flex-row gap-x-2 items-center">
                                        <label htmlFor="stocks" className="cursor-pointer label">
                                            <div className="flex items-center">
                                                <input type="checkbox" id="stocks" className="toggle toggle-primary" />
                                            </div>
                                        </label>
                                        <span className="ml-2 flex justify-center items-center gap-x-2 hover:cursor-pointer">
                                            Healthcare
                                        </span>
                                        <input type="text" placeholder="Type here" className="input input-bordered w-1/2" />
                                        <span>%</span>
                                    </div>

                                    </div>
                            </div>
                            
                        )
                    }

                    <div className="my-1 mb-8 w-1/2 flex justify-center">
                        <div className="padding-class form-control w-full max-w-lg">
                        <button className="btn btn-neutral w-32" onClick={optimize}>
                            Optimize
                        </button>
                        </div>
                    </div>

                    {
                        optimizedData.loading && (
                            <div className="my-2 w-full flex justify-center items-center">
                                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12">
                                    
                                </div>
                            </div>
                        )
                    }

                    {
                        !optimizedData.data && (
                            <>
                                {/* Fill optimizedData.data */}
                                <div className="my-2 w-2/3">
                                    <p className="text-4xl font-semibold">Optimized Results</p>

                                    <span className="divider"></span>

                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-2xl">Equal weights results</p>
                                        <div className="flex flex-row gap-x-2">
                                            <span>Portfolio variance</span>
                                            <span>{(optimizedData.data.equal_weights_results.portfolio_variance * 100).toFixed(2)}%</span>
                                        </div>
                                        <div className="flex flex-row gap-x-2">
                                            <span>Portfolio volatility</span>
                                            <span>{(optimizedData.data.equal_weights_results.portfolio_volatility * 100).toFixed(2)}%</span>
                                        </div>
                                        <div className="flex flex-row gap-x-2">
                                            <span>Portfolio annual return</span>
                                            <span>{(optimizedData.data.equal_weights_results.portfolio_annual_return * 100).toFixed(2)}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-2 w-2/3">
                                    <h2 className="text-2xl font-semibold">Optimized Results</h2>
                                    <div className="flex flex-col gap-y-2">
                                        {
                                            <div className="flex flex-col gap-y-2">
                                                <div className="flex flex-row gap-x-2">
                                                    <span>Expected returns</span>
                                                    <span>{(optimizedData.data.optimized_results.performance.expected_returns * 100).toFixed(2)}%</span>
                                                </div>
                                                <div className="flex flex-row gap-x-2">
                                                    <span>Volatility</span>
                                                    <span>{(optimizedData.data.optimized_results.performance.volatility * 100).toFixed(2)}%</span>
                                                </div>
                                                <div className="flex flex-row gap-x-2">
                                                    <span>Sharpe ratio</span>
                                                    <span>{optimizedData.data.optimized_results.performance.sharpe_ratio}</span>
                                                </div>
                                            </div>
                                        }                                           
                                    </div>
                                </div>

                                {/* Insert an editable table with invested and weights */}
                                <div className="my-2 w-2/3">
                                    <h2 className="text-xl font-semibold">Invested</h2>
                                    <table className="table w-full">
                                        <thead>
                                            <tr>
                                                <th>Stock</th>
                                                <th>Price</th>
                                                <th>Units</th>
                                                <th>Allocated</th>
                                                <th>Percentage</th>
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
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )
                    }

                </div>
            </div>
        </>
    )
}