import { useEffect, useState } from "react";
import logo from "./pages/images/todoLogo.png";
import { Search, Moon, SunMedium, LogOut, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";

type HeaderProps = {
  onSearchChange: (searchTerm: string) => void;
};

const Header = ({ onSearchChange }: HeaderProps) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const initialThemeIsLight = localStorage.getItem('theme') === 'light';
  const [theme, setTheme] = useState(initialThemeIsLight);
  const [searchContent, setSearchContent] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You are now logged out.");
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleColorMode = () => {
    setTheme(!theme);
    const body = document.getElementById('body');
    if (body){
      body.classList.toggle('light-mode');
      if (body.classList.contains('light-mode')){
        localStorage.setItem("theme", "light");
      } else {
        localStorage.setItem("theme", "dark");
      }
    }
  };

  useEffect(() =>{
    const savedTheme = localStorage.getItem('theme');
    const body = document.getElementById('body');
    if (body && savedTheme === 'light') {
        body.classList.add('light-mode');
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddTask = () => {
    window.dispatchEvent(new Event('toggleAddTaskMenu'));
  };

  async function handleSearch (){
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/todos/title/${searchContent}`, {
      method: "GET",
      headers: {"Content-Type": "application/json",
      Authorization: `Bearer ${token}`,},
    });
    if (!response.ok) {
      alert("You are now disconnected");
      navigate("/login");
    }
    const data = await response.json();
    console.log(data)
  }

  useEffect(() => {
    onSearchChange(searchContent);
  }, [searchContent, onSearchChange]);


  return (
    <header className="header">
      <img className="headerImg" src={logo} alt="Logo" />
      <div className="search-container">
        <input type="text" name="searchbar" id="searchbar" placeholder="Search Tasks" value={searchContent} onChange={(e) => setSearchContent(e.target.value)}/>
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
