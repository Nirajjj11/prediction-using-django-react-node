import { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
      const { login } = useContext(AuthContext);
      const navigate = useNavigate();

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const handleLogin = async () => {
            console.log("LOGIN CLICKED", email, password);

            try {
                  const res = await API.post("/auth/login", { email, password });

                  console.log("SUCCESS:", res.data);

                  login(res.data);
                  navigate("/dashboard");

            } catch (err) {
                  console.log("ERROR:", err.response?.data);
                  alert("Login failed");
            }
      };

      return (
            <div className="container mt-5">
                  <div className="card p-4 shadow">
                        <h3>Login</h3>

                        <input
                              className="form-control mb-2"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                              className="form-control mb-2"
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="btn btn-primary" onClick={handleLogin}>
                              Login
                        </button>
                  </div>
            </div>
      );
}

export default Login;