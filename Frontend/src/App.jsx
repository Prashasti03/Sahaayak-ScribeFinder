import { Button } from "@/components/ui/button"
import Navbar from "./components/components_lite/Navbar.jsx"
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./components/components_lite/Home"
import Candidates from "./components/components_lite/Candidates.jsx"
import Scribes from "./components/components_lite/Scribes.jsx"
import NGO from "./components/components_lite/NGO.jsx"
import RequestStatus from "./components/components_lite/RequestStatus.jsx"
import IncomingRequests from "./components/components_lite/IncomingRequests.jsx"
import UpdateProfile from "./components/components_lite/UpdateProfile.jsx"
import History from "./components/components_lite/History.jsx"

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
    path: "/Ngos",
    element: <NGO/>
  },
  {
    path: '/request-status',
    element: <RequestStatus/>
  },
  {
    path: '/incoming-requests',
    element: <IncomingRequests/>
  },
  {
    path: '/update-profile',
    element: <UpdateProfile/>
  },
  {
    path: '/history',
    element: <History/>
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