import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

function Dashboard() {
      const { user } = useContext(AuthContext);

      const [income, setIncome] = useState("");
      const [age, setAge] = useState("");
      const [result, setResult] = useState(null);
      const [loading, setLoading] = useState(false);

      // 🔍 Debug user
      console.log("DASHBOARD USER:", user);

      const handlePredict = async () => {
            console.log("INPUT VALUES:", income, age);

            if (!income || !age) {
                  alert("Please enter all fields");
                  return;
            }

            try {
                  setLoading(true);

                  const features = [Number(income), Number(age)];

                  console.log("SENDING FEATURES:", features);

                  const res = await API.post("/predict", { features });

                  console.log("PREDICTION RESPONSE:", res.data);

                  setResult(res.data.prediction);

            } catch (err) {
                  console.log("PREDICTION ERROR:", err.response?.data || err.message);
                  alert("Prediction failed");
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="container mt-5">

                  {/* 🔷 HEADER */}
                  <div className="card p-4 shadow mb-4">
                        <h2>Dashboard</h2>
                        <h5>Welcome, {user?.email}</h5>
                  </div>

                  {/* 🔷 ML PREDICTION FORM */}
                  <div className="card p-4 shadow">
                        <h4>ML Prediction</h4>

                        <div className="mb-3">
                              <label>Income</label>
                              <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter income"
                                    value={income}
                                    onChange={(e) => setIncome(e.target.value)}
                              />
                        </div>

                        <div className="mb-3">
                              <label>Age</label>
                              <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                              />
                        </div>

                        <button
                              className="btn btn-success"
                              onClick={handlePredict}
                              disabled={loading}
                        >
                              {loading ? "Predicting..." : "Predict"}
                        </button>

                        {/* 🔷 RESULT */}
                        {result !== null && (
                              <div className="alert alert-info mt-3">
                                    Prediction Result: <strong>{result}</strong>
                              </div>
                        )}
                  </div>
            </div>
      );
}

export default Dashboard;