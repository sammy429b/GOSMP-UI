import React from 'react'
import img from "../assets/trading.jpg"
import img1 from "../assets/logo.jpg"
const Index = () => {
  return (
    <>
        <div className='w-full flex flex-row h-full'>
          <div className='w-[50%] flex flex-col justify-center gap-y-2 items-start px-8'>
            <h1 className='text-[4rem] font-semibold'>
              Your Fiancial Status Is Our Goal
            </h1>
            <button className="btn btn-primary text-lg ">Get Started</button>
          </div>
          <div className='w-[50%]  flex justify-center items-center'>
            <img src={img1} alt="" className='bg-blend-color'/>
          </div>
        </div>
    </>
  )
}

export default Index