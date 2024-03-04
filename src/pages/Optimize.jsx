import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import Diversify from "../components/diversify"
import PortfolioTable from "../components/portfolioTable"
import BackTest from "../components/backtest"
import GenerateReport from "../util/report"

export default function Optimize() {

    const [investmentAmount, setInvestmentAmount] = useState(100000)
    const [duration, setDuration] = useState(1)

    const [diversifyPortfolio, setDiversifyPortfolio] = useState(false)

    const [sectors, setSectors] = useState({})

    const [selectedSectors, setSelectedSectors] = useState({})

    const [optimizedData, setOptimizedData] = useState({
        loading: false,
        data: null
    })

    const [riskCategory, setRiskCategory] = useState("Low risk")

    const [backtestData, setBacktestData] = useState({
        loading: false,
        data: null
    })

    const dialogRef = useRef()
    const [portfolio_variation_data, setPOrtfolios] = useState({
        loading: false,
        data: {
            "monte": {},
            "backlitter": {},
            "efficient": {}
        }
    })
    
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

        const sectorValues = {}

        for (const key in selectedSectors) {
            sectorValues[key] = selectedSectors[key] / 100
        }

        await fetch("http://localhost:8000/optimize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                risk_category: riskCategory,
                invest_amount: investmentAmount,
                duration: duration * 30,
                sectors: sectorValues
            })
        }).then(response => response.json())
            .then(data => {
                setOptimizedData({
                    loading: false,
                    data: data
                })
                setPOrtfolios({
                    loading: false,
                    data: {
                        "monte": data,
                        "backlitter": data,
                        "efficient": data
                    }
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

    const backtest = async () => {
        setBacktestData({
            ...backtestData,
            loading: true
        })
        await fetch("http://localhost:8000/backtest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                risk_category: riskCategory,
                invest_amount: investmentAmount,
                duration: duration * 30,
                invested: optimizedData.data.optimized_results.invested,
                weights: optimizedData.data.optimized_results.weights,
                start_date: optimizedData.data.start_date
            })
        }).then(response => response.json())
            .then(data => {
                setBacktestData({
                    loading: false,
                    data: data
                })
            })
            .catch(error => {
                console.error(error)
                setBacktestData({
                    loading: false,
                    data: null
                })
            })
    }



    const getSectors = async () => {
        await fetch("http://localhost:8000/sectors/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "index": "nifty500"
            })

        })
            .then(response => response.json())
            .then(data => {
                setSectors(data.sectors)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const selectPortfolio = (port_type) => {
        if (port_type === 1) setOptimizedData(portfolio_variation_data.data["monte"])
        else if (port_type === 2) setOptimizedData(portfolio_variation_data.data["backlitter"])
        else setOptimizedData(portfolio_variation_data.data["efficient"])
    }

    useEffect(() => {
        const question = document.querySelector("#question")
        const span = dialogRef.current
        question.addEventListener("mouseover", () => {
            span.style.left = question.parentElement.offsetLeft + question.parentElement.offsetWidth + "px"
            span.style.top = question.parentElement.offsetTop + "px"
            span.hidden = false
        })
        question.addEventListener("mouseout", () => {
            span.hidden = true
        })
        const risk = JSON.parse(localStorage.getItem('risk_score'))

        if (risk) {
            setRiskCategory(risk.risk_category)
        }

        getSectors()

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
                                <option value={12}>12 months</option>
                                <option value={18}>18 months</option>
                                <option value={24}>24 months</option>
                            </select>
                            <p className="italic text-sm self-start">
                                {
                                    duration === 0 ? "Select a duration to invest" : `duration end date is ${(new Date(Date.now() + duration * 30 * 24 * 60 * 60 * 1000)).toDateString()}`
                                }
                            </p>
                        </label>

                    </div>

                    <div className="my-1 w-1/2 self-center flex flex-col items-center">
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className="label-text text-base">Your risk category</span>
                            </div>
                            <select className="select select-bordered w-full max-w-lg" value={riskCategory} onChange={(e) => setRiskCategory(e.target.value)}>
                                <option value="Low risk">Low risk</option>
                                <option value="Moderate risk">Moderate risk</option>
                                <option value="High risk">High risk</option>
                                <option value="Very high risk">Very high risk</option>

                            </select>
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
                            <Diversify sectors={sectors} selectedSectors={selectedSectors} setSelectedSectors={setSelectedSectors} />
                        )
                    }

                    <div className="my-1 mb-8 w-1/2 flex justify-center">
                        <div className="padding-class form-control w-full max-w-lg">
                            <button className="btn btn-primary w-32" onClick={optimize} disabled={optimizedData.loading}>
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

                    <div className="mx-auto w-[40%] flex flex-row justify-between items-center">
                        <button className="bg-blue-500 w-32 rounded-md h-12 font-bold text-white hover:bg-blue-600" onClick={selectPortfolio(1)}>Portfolio 1</button>
                        <button className="bg-blue-500 w-32 rounded-md h-12 font-bold text-white hover:bg-blue-600" onClick={selectPortfolio(2)}>Portfolio 2</button>
                        <button className="bg-blue-500 w-32 rounded-md h-12 font-bold text-white hover:bg-blue-600" onClick={selectPortfolio(3)}>Portfolio 3</button>
                    </div>

                    {
                        optimizedData.data && (
                            <>
                                <div className="my-2 w-2/3">
                                    <p className="text-2xl font-semibold">Date</p>
                                    <p>{optimizedData.data.start_date}</p>
                                </div>
                                <PortfolioTable optimizedData={optimizedData} />
                                <div className="my-2 w-2/3">
                                    <button className="btn btn-neutral w-32" onClick={backtest} disabled={backtestData.loading}> Backtest</button>
                                </div>
                            </>
                        )
                    }


                    {
                        backtestData.data && (
                            <>
                                <BackTest backtestData={backtestData.data} />

                                <div className="w-full my-2">
                                    <button className="btn btn-neutral w-32"
                                        onClick={() => {
                                            GenerateReport(optimizedData.data, backtestData.data)
                                        }}
                                    >Download portfolio
                                    </button>
                                </div>
                            </>
                        )
                    }



                </div>
            </div>
        </>
    )
}