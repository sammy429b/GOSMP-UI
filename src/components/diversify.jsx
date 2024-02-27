export default function Diversify({sectors, selectedSectors, setSelectedSectors}) { 



    return (
        <div className="my-1">
            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text text-base">Select from the following assets with invest percentage</span>
                </div>
            </label>

            <div className="flex flex-col gap-y-2">

                {
                    sectors.map((sector, index) => {
                        return (
                            <div key={index} className="flex flex-row gap-x-2 items-center">
                                <div className="flex w-full">
                                    <label htmlFor={sector} className="cursor-pointer label">
                                        <div className="flex items-center">
                                            <input type="checkbox" id={sector} className="toggle toggle-primary" value={selectedSectors[sector] ? true : false} onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedSectors({ ...selectedSectors, [sector]: 0 })
                                                } else {
                                                    const temp = selectedSectors
                                                    delete temp[sector]
                                                    setSelectedSectors(temp)
                                                    document.getElementById(`${sector}_num`).value = ""
                                                }
                                            }
                                            } />
                                        </div>
                                    </label>
                                    <span className="ml-2 flex justify-center items-center gap-x-2 hover:cursor-pointer">
                                        {sector}
                                    </span>
                                </div>

                                <input type="number" id={`${sector}_num`} placeholder="Type here" max={100} min={0} className="input input-bordered w-1/2" value={selectedSectors[sector] ? selectedSectors[sector] : ""} onChange={(e) => { setSelectedSectors({ ...selectedSectors, [sector]: Number(e.target.value) }); document.getElementById(sector).checked = true; }} onWheel={(e) => e.target.blur()} />
                                <span>%</span>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}