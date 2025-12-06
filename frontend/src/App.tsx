import "./App.css";
import { SetDragAndDrop } from "./DragAndDrop"
import Header from "./Header"; 
import './index.css'
import Login from "./pages/Login";
import Register from "./pages/register";
import Settings from "./pages/settings";
import Login_Register from "./pages/Login-Register"
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

const NotFoundContainer = () => (
  <div className="mainContainer">
    <NotFound />
  </div>
);

const TodoContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="mainContainer">
      <Header onSearchChange={handleSearchChange} />
      <SetDragAndDrop searchTerm={searchTerm} />
    </div>
  );
};

const LoginContainer = () => (
  <div className="mainContainer">
    <Login />
  </div>
);

const RegisterContainer = () => (
  <div className="mainContainer">
    <Register />
  </div>
);

const SettingsContainer = () => (
  <div className="mainContainer">
    <Settings />
  </div>
);

const LoginRegisterContainer = () => (
  <div className="mainContainer">
    <Login_Register />
  </div>
)

const AppRouter = () => (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegisterContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/settings" element={<SettingsContainer />}/>
        <Route path="/todo" element={<TodoContainer />} />
        <Route path="*" element={<NotFoundContainer />} />
      </Routes>
  </BrowserRouter>
);

export default AppRouter;