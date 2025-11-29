import { useState } from "react";
import logo from "./pages/images/todoLogo.png";
import { Search, Moon, SunMedium, LogOut, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You are now logged out.");
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleColorMode = () => {
    setTheme(!theme);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddTask = () => {
    window.dispatchEvent(new Event('toggleAddTaskMenu'));
  };

  return (
    <header className="header">
      <img className="headerImg" src={logo} alt="Logo" />
      <div className="search-container">
        <input type="text" name="searchbar" id="searchbar" placeholder="Search Tasks"/>
        <div className="search-icon">
          <Search color="grey" size={24} />
        </div>
      </div>
      <div className="createandmenu">
        <div className="btn-create" onClick={handleAddTask}>
          <span>New Task</span>
        </div>
        <div className="dropdown-menu-toggle" onClick={toggleDropdown}>
          <Hamburger />
        </div>
      </div>
      <div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {theme && (
              <div className="menuChild" onClick={handleColorMode}>
                <SunMedium color="white" size={24} />
                <span>Light Mode</span>
              </div>
            )}
            {!theme && (
              <div className="menuChild" onClick={handleColorMode}>
                <Moon color="white" size={24} />
                <span>Dark Mode</span>
              </div>
            )}
            <div className="menuChild" onClick={() => navigate("/settings")}>
              <UserCog color="white" size={24} />
              <span>Settings</span>
            </div>
            <div className="menuChild" onClick={handleLogout}>
              <LogOut color="white" size={24} />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
