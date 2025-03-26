import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './Login';
import Cadastro from './Cadastro';
import ForgotPassword from './ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
