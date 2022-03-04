
import Button from "./Button"
import { useLocation } from "react-router-dom";
const Header = ({ showAdd }) => {

    // Here we can make the add task buttin disappear if the address it no home
    const location = useLocation()

    return (
        <header className="header">
            <h1>Task Master App</h1>

            {location.pathname ==='/' && (<Button text="Add Task" color="green" onClick={showAdd} />)}
        </header>
    );
}

export default Header;