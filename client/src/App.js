import logo from './logo.svg';
import './App.css';
import {Button} from 'antd';
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path="/test" element={<ProtectedRoutes><Test /></ProtectedRoutes>} />
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ProtectedRoutes(props) {
  if (localStorage.getItem('expense-tracker-user')) {
    return props.children;
  }
  else {
    return <Navigate to={'/login'}></Navigate>
  }
}

export default App;
