import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import ChartCard from "../components/ChartCard";

function Dashboard() {
      const { user } = useContext(AuthContext);

      const [income, setIncome] = useState("");
      const [age, setAge] = useState("");
      const [result, setResult] = useState(null);
      const [history, setHistory] = useState([]);
      const [dark, setDark] = useState(false);

      const toggleTheme = () => {
            setDark(!dark);
            document.body.style.background = dark ? "white" : "#121212";
            document.body.style.color = dark ? "black" : "white";
      };

      const handlePredict = async () => {
            console.log("INPUT:", income, age);

            if (!income || !age) return alert("Enter all fields");

            try {
                  const features = [Number(income), Number(age)];

                  const res = await API.post("/predict", { features });

                  console.log("RESULT:", res.data);

                  const prediction = res.data.prediction;

                  setResult(prediction);

                  // store history
                  setHistory((prev) => [...prev, prediction]);

            } catch (err) {
                  console.log(err);
                  alert("Prediction failed");
            }
      };

      return (
            <div className="container mt-4">

                  {/* HEADER */}
                  <div className="card p-4 shadow mb-4">
                        <div className="d-flex justify-content-between">
                              <h3>Dashboard</h3>
                              <button className="btn btn-secondary" onClick={toggleTheme}>
                                    Toggle Mode
                              </button>
                        </div>

                        <p>Welcome: <strong>{user?.email}</strong></p>
                  </div>

                  {/* STATS */}
                  <div className="row mb-4">
                        <div className="col-md-4">
                              <div className="card p-3 shadow">
                                    <h5>Total Predictions</h5>
                                    <h3>{history.length}</h3>
                              </div>
                        </div>

                        <div className="col-md-4">
                              <div className="card p-3 shadow">
                                    <h5>Last Result</h5>
                                    <h3>{result !== null ? result : "N/A"}</h3>
                              </div>
                        </div>
                  </div>

                  {/* FORM */}
                  <div className="card p-4 shadow">
                        <h4>ML Prediction</h4>

                        <input
                              className="form-control mb-2"
                              placeholder="Income"
                              value={income}
                              onChange={(e) => setIncome(e.target.value)}
                        />

                        <input
                              className="form-control mb-2"
                              placeholder="Age"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                        />

                        <button className="btn btn-success" onClick={handlePredict}>
                              Predict
                        </button>

                        {result !== null && (
                              <div className="alert alert-info mt-3">
                                    Result: {result}
                              </div>
                        )}
                  </div>

                  {/* HISTORY */}
                  <div className="card p-4 shadow mt-4">
                        <h5>Prediction History</h5>

                        {history.length === 0 ? (
                              <p>No data yet</p>
                        ) : (
                              <ul>
                                    {history.map((item, index) => (
                                          <li key={index}>Prediction {index + 1}: {item}</li>
                                    ))}
                              </ul>
                        )}
                  </div>

                  {/* CHART */}
                  {history.length > 0 && <ChartCard data={history} />}

            </div>
      );
}

export default Dashboard;