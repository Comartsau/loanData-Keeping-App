
import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";

import CheckRouter from './Routers/CheckRouter';
import Login from './auth/Login'

function App() {

  const token = "q1we";
 

  return (
    <div>
    {token ? (
      <CheckRouter />
    ) : (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )}
  </div>
  )
}

export default App
