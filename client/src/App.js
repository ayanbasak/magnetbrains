import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AddSales } from "./components/add/AddSales";
import { Home } from "./components/home/Home";
import { Login } from "./components/login/Login";
import { Registration } from "./components/registration/Registration";
import { Sales } from "./components/sales/Sales";
import { PrivateRoute } from "./security/PrivateRoute";

function App() {
  return (
    <Router> 
        <Routes>   
          <Route element={<PrivateRoute />}>
            <Route path="/add" element={<AddSales />} />
            <Route path="/all" element={<Sales />} />
          </Route>
          
          <Route path="/" element={<Home /> } />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Router>
  );
}

export default App;
