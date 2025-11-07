// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    Temperature: "",
    SpO2: "",
    SystolicBP: "",
    DiastolicBP: "",
    BloodSugar: "",
    HeartRate: "",
    BMI: "",
    ECG: ""
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Temperature: parseFloat(formData.Temperature),
          SpO2: parseFloat(formData.SpO2),
          SystolicBP: parseFloat(formData.SystolicBP),
          DiastolicBP: parseFloat(formData.DiastolicBP),
          BloodSugar: parseFloat(formData.BloodSugar),
          HeartRate: parseFloat(formData.HeartRate),
          BMI: parseFloat(formData.BMI),
          ECG: parseInt(formData.ECG)
        }),
      });

      const data = await res.json();
setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h2>Health Risk Prediction</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>

      {prediction && (
        <h3 style={{ color: prediction === "High" ? "red" : "green" }}>
          Predicted Risk: {prediction}
        </h3>
      )}
    </div>
  );
}

export default App;
