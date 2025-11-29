import logo from "./images/todoLogo.png";
import "./forms.css";
import { useNavigate } from "react-router-dom";

const Login_Register = () => {
  const navigate = useNavigate();
    return (
      <div>
        <div className="logo-container">
            <img src={logo} alt="Logo"/>
          </div>
        <div className="container">
          <div className="form">
            <h2 className="title">Etodo</h2>
            <button className="button" onClick={() => navigate("/login")}>Login</button>
            <button className="button" onClick={() => navigate("/register")}>Register</button>
          </div>
        </div>
      </div>
    
  );
}

export default Login_Register