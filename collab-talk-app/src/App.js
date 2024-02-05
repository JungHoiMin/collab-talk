import './App.css';
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";
import Home from "./pages/home/Home";
import Init from "./pages/home/init/Init";

const App = () => {
  return (
      <Routes>
        <Route path="/auth/*">
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/home/*">
          <Route path="" element={<Home />} />
          <Route path="init" element={<Init /> } />
        </Route>
      </Routes>
  );
}

export default App;
