
import './App.css';
import Home from './components/Home';
import Login from './components/Login';


import Register from './components/Register';
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
      <Routes>
      <Route  path="/home"  element={<Home />}exact />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={ <Register />} />
     
      </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
