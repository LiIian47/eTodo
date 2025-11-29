import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css";
import logo from "./images/todoLogo.png";

const Users = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [userId, setUserId] = useState("");

  async function getUser() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/user`, {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const datas = await response.json();
      const data = datas[0];
      setEmail(data.email);
      setName(data.name);
      setFirstname(data.firstname);
      setUserId(data.id);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteUser() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      alert("User deleted successfully!");
      localStorage.removeItem("token");
      navigate("/register");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  async function handleSubmit(event: any) {
    try {
      event.preventDefault();
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT", 
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`,},
        body: JSON.stringify({email, password, name, firstname}),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      alert("Information updated successfully!");
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
          <h2 className="title">Settings</h2>
          <div className="input-group">
            <label htmlFor="name">Name :</label>
            <input id="name" type="text" value={name} required onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="surname">Surname :</label>
            <input id="surname" type="text" value={firstname} required onChange={(e) => setFirstname(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email :</label>
            <input id="email" type="email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">New Password :</label>
            <input id="password" type="password" required onChange={(e) => setNewPassword(e.target.value)}/>
          </div>
          <button type="submit" className="button">Confirm</button>
          <button className="register-login" onClick={deleteUser}>Delete Account</button>
          <button className="register-login" onClick={() => navigate("/todo")}>Todo</button>
        </form>
      </div>
    </div>
  );
};

export default Users;
