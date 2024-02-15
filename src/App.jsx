import { useState } from 'react'
import UserForm from './pages/UserForm'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Optimize from './pages/Optimize'

  
const router = createBrowserRouter(
  [
    {
    path: '/',
    element: <UserForm/>
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
