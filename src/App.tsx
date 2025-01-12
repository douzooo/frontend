import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import './Duyio.css';



import AuthProvider from './utils/AuthProvider';
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './components/Dashboard';

function App() {

  return (


    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/login'} element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  )


}

export default App;
