import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { SnackbarProvider} from 'notistack'
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Admin from './components/Admin/Admin.jsx';
import Employee from './components/Employee/Employee.jsx';
import AllQROfEmp from './components/AllQROfEmp/AllQROfEmp.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='admin' element={<Admin/>}/>
      <Route path='employee' element={<Employee/>}/>
      <Route path='questionnair' element={<AllQROfEmp/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider>
    <RouterProvider router={router} />
    </SnackbarProvider>
  </StrictMode>,
)
