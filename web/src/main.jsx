import React from 'react';
//routing...
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Link
} from 'react-router-dom';

//pages
import AppLayout from './AppLayout/AppLayout';
import Error_404 from './Pages/Error/Error_404/Error_404';
import Error_500 from './Pages/Error/Error_500/Error_500';
import Home from './Pages/App/Home/Home';
//css files
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from "./Pages/App/Login/Login";
import Signup from './Pages/App/Signup/Signup';


// router and routes
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error_500 />,

    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        index: true,
        element: <Login />,
      },
      {
        path: "/signup",
        index: true,
        element: <Signup />,
      },
      

      {
        path: "*",
        element: <Error_404 />
      },
    ]
  }
]
);

function App() {
  return (
    <RouterProvider router={router} />
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

