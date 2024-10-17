import './App.css';
import Forgot from './components/ForgotPass';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import Register from './components/Register';
import { Routes, Route, BrowserRouter} from "react-router-dom";
import ResetPassword from './components/ResetPassword';
function App() {
  
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={ <Register />} />
      <Route path="/forgotpassword" element={ <Forgot />} />
      <Route path="/reset-password/:token" element={ <ResetPassword />} />
      <Route element={<ProtectedRoutes/>} >
      <Route  path="/home"  element={<Home />}exact />
      </Route>
      </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
