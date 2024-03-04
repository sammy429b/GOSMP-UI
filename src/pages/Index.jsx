import React from 'react'
import hero from '/public/hero.jpg'
const Index = () => {
  return (
    <>
      <div className='flex'>
        <img src={hero} className='relative w-[100%] h-[38rem]' />
        <div className='ml-4 absolute text-white my-24'>
          <h1 className='font-bold text-6xl'>Finiancial Portfolios</h1>
          <h1 className='font-bold text-3xl'>Invest in future trend</h1>
          <h1 className='font-bold text-xl'>BE RICH, BE COOL</h1>
          <button className='w-32 h-12 my-10 bg-blue-600 text-white font-bold text-lg'>Get Started</button>
        </div>
      </div>
      <section>
        <h1></h1>
      </section>

    </>
  )
}

export default Index