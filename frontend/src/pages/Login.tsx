import {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css";
import logo from "./images/todoLogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password })});
      const data = await response.json();
      if (response.ok){   
        localStorage.setItem("token", data.token);
        navigate("/todo");
        alert("Sucess !");
      } else {
      alert("invalid email or password");
      }
    } catch (err) {   
      console.log(err);
    }
  }

  return (
    <div>
      <div className="logo-container">
        <img src={logo} alt="Logo"/>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="title">Login</h2>
          <div className="input-group">
            <label htmlFor="email">Email :</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password :</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="button">Sign in</button>
          <button className="register-login" onClick={() => navigate("/register")}>Register</button>
        </form>
      </div>
    </div>
  );
};
 
export default Login;
