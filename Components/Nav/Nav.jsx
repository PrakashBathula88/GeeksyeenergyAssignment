import { Link } from "react-router-dom";
import "../Nav/Nav.css"
function Nav() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/company-info" className="nav-link">
            Company Info
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signin" className="nav-link">
            Signin
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
