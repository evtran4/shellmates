import { Link } from "react-router-dom"
export default function NavBar(){
    return(
        <div className = "navBar">
            <Link className = "navBarButton" to ="/">Home</Link>
            <Link className = "navBarButton" to ="/Notifications">Notifications</Link>
            <Link to = "/Settings" className = "navBarButton">Settings</Link>
        </div>
    )
}