import { useState } from "react";
import API from "../services/api";

function Register() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      // const handleRegister = async () => {
      //       try {
      //             await API.post("/auth/register", { email, password });
      //             alert("Registered");
      //       } catch (err) {
      //             console.log(err);
      //       }
      // };

      const handleRegister = async () => {
            console.log("EMAIL:", email);
            console.log("PASSWORD:", password);

            try {
                  const res = await API.post("/auth/register", { email, password });

                  console.log("REGISTER SUCCESS:", res.data);

            } catch (err) {
                  console.log("REGISTER ERROR:", err.response?.data);
            }
      };

      return (
            <div className="container mt-5">
                  <h2>Register</h2>

                  <input className="form-control mb-2"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                  />

                  <input className="form-control mb-2"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                  />

                  <button className="btn btn-success" onClick={handleRegister}>
                        Register
                  </button>
            </div>
      );
}

export default Register;