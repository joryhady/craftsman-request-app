import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          Craftsman
        </Link>

        <div className="nav-links">
          <Link to="/">New Request</Link>
          <Link to="/requests">Requests</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;