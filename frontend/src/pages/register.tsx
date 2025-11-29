import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css";
import logo from "./images/todoLogo.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstname, setSurname] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: any) {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, firstname}),
      });
      const data = await response.json();
      if (!response.ok) {
        alert("Registration failed");
        throw new Error(`Erreur HTTP: ${response.status}`);
      } else {
      localStorage.setItem("token", data.token);
      navigate("/todo");
      alert("Sucess !");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="title">Register</h2>
          <div className="input-group">
            <label htmlFor="name">Name :</label>
            <input id="name" type="text" className="text-black font-bold" required onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="surname">Surname :</label>
            <input id="surname" type="text" className="text-black font-bold" required onChange={(e) => setSurname(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email :</label>
            <input id="email" type="email" className="text-black font-bold" required onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password :</label>
            <input id="password" type="password" className="text-black font-bold" required onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="button">Sign up</button>
          <button className="register-login" onClick={() => navigate("/login")}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
