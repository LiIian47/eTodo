import { useNavigate } from "react-router-dom";
import logo from "./images/404.png";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="notFound">
            <img src={logo} alt="404"/>
            <div>Page Not Found</div>
            <button onClick={()=> {navigate("/")}}>Return</button>
        </div>      
    );
}

export default NotFound;