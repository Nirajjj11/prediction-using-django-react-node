import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
      const { user, logout } = useContext(AuthContext);
      const navigate = useNavigate();
      const [dark, setDark] = useState(false);

      const handleLogout = () => {
            logout();
            navigate("/login");
      };

      const toggleTheme = () => {
            setDark(!dark);
            document.body.style.background = dark ? "white" : "#121212";
            document.body.style.color = dark ? "black" : "white";
      };

      return (
            <nav className="navbar bg-dark navbar-dark px-3">
                  <Link className="navbar-brand" to="/">ML Dashboard</Link>

                  <div>
                        <button className="btn btn-secondary me-2" onClick={toggleTheme}>
                              Mode
                        </button>

                        {!user ? (
                              <>
                                    <Link className="btn btn-success me-2" to="/register">Register</Link>
                                    <Link className="btn btn-primary" to="/login">Login</Link>
                              </>
                        ) : (
                              <>
                                    <span className="text-white me-3">{user.email}</span>
                                    <button className="btn btn-danger" onClick={handleLogout}>
                                          Logout
                                    </button>
                              </>
                        )}
                  </div>
            </nav>
      );
}

export default Navbar;