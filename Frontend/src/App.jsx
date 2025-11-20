import { Button } from "@/components/ui/button"
import Navbar from "./components/components_lite/Navbar.jsx"
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./components/components_lite/Home"
import Candidates from "./components/components_lite/Candidates.jsx"
import Scribes from "./components/components_lite/Scribes.jsx"
import NGO from "./components/components_lite/NGO.jsx"

const appRouter = createBrowserRouter([
  {path:'/',
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/Candidates",
    element: <Candidates/>
  },
  {
    path: "/Scribes",
    element: <Scribes/>
  },
  {
    path: "/ngos",
    element: <NGO/>
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}

export default App