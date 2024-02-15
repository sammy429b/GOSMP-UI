


const dates = {
    startDate_dataframe: "2021-01-01",
    endDate_dataframe: "2021-12-31",
    startDate_optimization: "2021-01-01",
    endDate_optimization: "2021-12-31"

}

export default function Optimize() {

    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">

                <h1 className="text-4xl font-semibold mt-24">Portfolio Optimization</h1>

                <div className="w-[40%]">
                    <div className="my-1">
                        <label className="form-control w-full max-w-xl">
                            <div className="label">
                                <span className="label-text text-base">Upload a CSV file</span>
                            </div>
                            <input type="file" className="file-input file-input-bordered w-full max-w-lg" />
                        </label>
                    </div>

                    <div className="my-1">
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className="label-text text-base">Enter the start date for DataFrame</span>
                            </div>
                            <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-lg" value={dates.startDate_dataframe} />
                        </label>
                    </div>

                    <div className="my-1">
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className="label-text text-base">Enter the start date for DataFrame</span>
                            </div>
                            <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-lg" value={dates.endDate_dataframe} />
                        </label>
                    </div>

                    <div className="my-1">
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className="label-text text-base">Enter the amount you want to invest</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg" />
                        </label>
                    </div>

                    <div className="my-1">
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className="label-text text-base">Enter the start date for optimization</span>
                            </div>
                            <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-lg" value={dates.startDate_optimization} />
                        </label>
                    </div>
                    <div className="my-1">
                        <label className="form-control w-full max-w-lg">
                            <div className="label">
                                <span className="label-text text-base">Enter the end date for optimization</span>
                            </div>
                            <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-lg" value={dates.endDate_optimization} />
                        </label>
                    </div>

                    <div className="my-1">
                        <p>
                            Number of days: 1860
                        </p>
                    </div>

                    <div>
                        <button className="btn btn-neutral">
                            Optimize
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}