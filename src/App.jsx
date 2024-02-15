import { Children, useState } from 'react'
import UserForm from './pages/UserForm'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Optimize from './pages/Optimize'
import App_Layout from './layout/layout'

  
const router = createBrowserRouter([
  {
    element:<App_Layout/>,
  children: [
  {
    path: '/',
    element: <UserForm/>
  },
  {
    path: '/optimize',
    element: <Optimize/>
  }
]
}]
)



function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router}/>
  )
}

export default App
