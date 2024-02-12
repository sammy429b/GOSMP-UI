import { useState } from 'react'
import FormPage from './formPage'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Optimize from './optimize'

  
const router = createBrowserRouter(
  [
    {
    path: '/',
    element: <FormPage/>
  },
  {
    path: '/optimize',
    element: <Optimize/>
  }
]
  
)



function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router}/>
  )
}

export default App
