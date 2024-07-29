import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from './redux/store';
import App from './App.jsx';
import Login from './components/Login';
import Header from './components/Header';
import Register from './components/Register';
import Account from './components/Account';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />, // Renders Navbar. The Header component includes <Outlet /> to render other components below "/"
    children: [
      // Renders Home page at "/"
      {
        path: "/",
        element: <div className="container">
          <App />
        </div>,
      },
      {
        // Renders Login form at "/login"
        path: "/login",
        element: <div className='container'>
          <Login />
        </div>
      },
      {
        // Renders Register form at "/register"
        path: "/register",
        element: <div className='container'>
          <Register />
        </div>
      },
      {
        // Renders Account component that displays user data at "/user"
        path: "/user",
        element: <div className='container'>
          <Account />
        </div>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Global redux store for the app for state management */}
      <RouterProvider router={router} /> {/* Use React router for routing. */}
    </Provider>
  </StrictMode>,
)
