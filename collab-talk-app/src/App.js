import './App.css';
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";

const App = () => {
  return (
      <Routes>
        <Route path="/auth/*">
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
  );
}

export default App;
