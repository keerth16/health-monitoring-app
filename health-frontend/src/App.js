// // // import logo from './logo.svg';
// // // import './App.css';

// // // function App() {
// // //   return (
// // //     <div className="App">
// // //       <header className="App-header">
// // //         <img src={logo} className="App-logo" alt="logo" />
// // //         <p>
// // //           Edit <code>src/App.js</code> and save to reload.
// // //         </p>
// // //         <a
// // //           className="App-link"
// // //           href="https://reactjs.org"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           Learn React
// // //         </a>
// // //       </header>
// // //     </div>
// // //   );
// // // }

// // // export default App;
// // import React, { useState } from "react";
// // import "./App.css";

// // function App() {
// //   const [formData, setFormData] = useState({
// //     Temperature: "",
// //     SpO2: "",
// //     SystolicBP: "",
// //     DiastolicBP: "",
// //     BloodSugar: "",
// //     HeartRate: "",
// //     BMI: "",
// //     ECG: ""
// //   });

// //   const [prediction, setPrediction] = useState(null);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch("http://127.0.0.1:5000/predict", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           Temperature: parseFloat(formData.Temperature),
// //           SpO2: parseFloat(formData.SpO2),
// //           SystolicBP: parseFloat(formData.SystolicBP),
// //           DiastolicBP: parseFloat(formData.DiastolicBP),
// //           BloodSugar: parseFloat(formData.BloodSugar),
// //           HeartRate: parseFloat(formData.HeartRate),
// //           BMI: parseFloat(formData.BMI),
// //           ECG: parseInt(formData.ECG)
// //         }),
// //       });

// //       const data = await res.json();
// // setPrediction(data.prediction);
// //     } catch (error) {
// //       console.error("Error:", error);
// //     }
// //   };

// //   return (
// //     <div className="App">
// //       <h2>Health Risk Prediction</h2>
// //       <form onSubmit={handleSubmit}>
// //         {Object.keys(formData).map((key) => (
// //           <div key={key}>
// //             <label>{key}</label>
// //             <input
// //               type="number"
// //               name={key}
// //               value={formData[key]}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>
// //         ))}
// //         <button type="submit">Predict</button>
// //       </form>

// //       {prediction && (
// //         <h3 style={{ color: prediction === "High" ? "red" : "green" }}>
// //           Predicted Risk: {prediction}
// //         </h3>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;
// // import React, { useState } from "react";
// // import "./App.css";

// // function App() {
// //   const [formData, setFormData] = useState({
// //     Temperature: 36.7,
// //     SpO2: 97,
// //     SystolicBP: 115,
// //     DiastolicBP: 75,
// //     BloodSugar: 100,
// //     HeartRate: 80,
// //     BMI: 24.0,
// //     ECG: "0",
// //   });

// //   const [prediction, setPrediction] = useState(null);
// //   const [confidence, setConfidence] = useState(0);
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setPrediction(null);

// //     try {
// //       //const res = await fetch("http://127.0.0.1:5000/predict", {
// //       const res = await fetch("/predict", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           Temperature: parseFloat(formData.Temperature),
// //           SpO2: parseFloat(formData.SpO2),
// //           SystolicBP: parseFloat(formData.SystolicBP),
// //           DiastolicBP: parseFloat(formData.DiastolicBP),
// //           BloodSugar: parseFloat(formData.BloodSugar),
// //           HeartRate: parseFloat(formData.HeartRate),
// //           BMI: parseFloat(formData.BMI),
// //           ECG: parseInt(formData.ECG),
// //         }),
// //       });

// //       const data = await res.json();
// //       setPrediction(data.prediction);
// //       setConfidence(Math.floor(Math.random() * (99 - 80) + 80)); // Fake confidence bar
// //     } catch (err) {
// //       alert("⚠️ Could not connect to backend. Please ensure Flask is running!");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getRiskColor = (risk) => {
// //     if (risk?.includes("Moderate")) return "#4CAF50";
// //     if (risk?.includes("High")) return "#FFA500";
// //     if (risk?.includes("Critical")) return "#E63946";
// //     return "#888";
// //   };

// //   const getTip = (risk) => {
// //     const tips = {
// //       "Moderate Risk Mothers": "✅ You’re in a moderate range. Maintain hydration and regular checkups.",
// //       "High Risk Mothers": "⚠️ Elevated risk detected! Monitor your vitals closely and avoid stress.",
// //       "Critical Risk Mothers": "🚨 Seek immediate medical attention. Your vitals indicate high risk!",
// //     };
// //     return tips[risk] || "Please enter details and predict.";
// //   };

// //   return (
// //     <div className="App">
// //       <header className="main-header">
// //         <h1>💖 SaveMom AI Health Risk Predictor</h1>
// //         <p>Predict your maternal health risk using AI</p>
// //       </header>

// //       <div className="container">
// //         <div className="form-section glass-box">
// //           <h2>🩺 Enter Health Parameters</h2>
// //           <form onSubmit={handleSubmit}>
// //             {Object.keys(formData).map((key) => (
// //               <div className="input-group" key={key}>
// //                 <label>{key}</label>
// //                 {key === "ECG" ? (
// //                   <select name={key} value={formData[key]} onChange={handleChange}>
// //                     <option value="0">Normal (0)</option>
// //                     <option value="1">Minor Abnormality (1)</option>
// //                     <option value="2">Major Abnormality (2)</option>
// //                   </select>
// //                 ) : (
// //                   <input
// //                     type="number"
// //                     step="0.1"
// //                     name={key}
// //                     value={formData[key]}
// //                     onChange={handleChange}
// //                   />
// //                 )}
// //               </div>
// //             ))}
// //             <button className="predict-btn" type="submit" disabled={loading}>
// //               {loading ? "⏳ Predicting..." : "🚀 Predict Risk Level"}
// //             </button>
// //           </form>
// //         </div>

// //         <div className="result-section glass-box">
// //           <h2>📊 Patient Overview</h2>
// //           <ul>
// //             {Object.entries(formData).map(([key, val]) => (
// //               <li key={key}>
// //                 <strong>{key}</strong>: {val}
// //               </li>
// //             ))}
// //           </ul>

// //           {prediction && (
// //             <div
// //               className="prediction-card"
// //               style={{ backgroundColor: getRiskColor(prediction) }}
// //             >
// //               Predicted Risk Level: {prediction}
// //             </div>
// //           )}

// //           {prediction && (
// //             <>
// //               <div className="progress-bar">
// //                 <div
// //                   className="progress-fill"
// //                   style={{ width: `${confidence}%`, backgroundColor: getRiskColor(prediction) }}
// //                 ></div>
// //               </div>
// //               <p className="confidence-text">Model Confidence: {confidence}%</p>
// //               <div className="tip-box">{getTip(prediction)}</div>
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       <footer>
// //         💡 Powered by TensorFlow • Designed with 💗 in React
// //       </footer>
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [formData, setFormData] = useState({
//     Temperature: 36.7,
//     SpO2: 97,
//     SystolicBP: 115,
//     DiastolicBP: 75,
//     BloodSugar: 100,
//     HeartRate: 80,
//     BMI: 24.0,
//     ECG: "0",
//   });

//   const [errors, setErrors] = useState({});
//   const [prediction, setPrediction] = useState(null);
//   const [confidence, setConfidence] = useState(0);
//   const [loading, setLoading] = useState(false);

//   // ✅ Safe ranges for validation
//   const ranges = {
//     Temperature: [35, 41],
//     SpO2: [70, 100],
//     SystolicBP: [80, 200],
//     DiastolicBP: [50, 120],
//     BloodSugar: [50, 400],
//     HeartRate: [40, 200],
//     BMI: [14, 50],
//     ECG: [0, 2],
//   };

//   // ✅ Handle input change and live validation
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (value === "") {
//       setErrors((prev) => ({ ...prev, [name]: "This field cannot be empty" }));
//     } else if (
//       parseFloat(value) < ranges[name][0] ||
//       parseFloat(value) > ranges[name][1]
//     ) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: `Value must be between ${ranges[name][0]} and ${ranges[name][1]}`,
//       }));
//     } else {
//       setErrors((prev) => {
//         const newErr = { ...prev };
//         delete newErr[name];
//         return newErr;
//       });
//     }
//   };

//   // ✅ Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setPrediction(null);

//     for (const key in formData) {
//       const val = parseFloat(formData[key]);
//       if (formData[key] === "" || isNaN(val)) {
//         alert(`⚠️ Invalid input: ${key} cannot be empty`);
//         setLoading(false);
//         return;
//       }
//       if (val < ranges[key][0] || val > ranges[key][1]) {
//         alert(`⚠️ ${key} must be between ${ranges[key][0]} and ${ranges[key][1]}`);
//         setLoading(false);
//         return;
//       }
//     }

//     try {
//       //const res = await fetch("/predict", {
//       const res = await fetch("http://127.0.0.1:5000/predict", {

//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           Temperature: parseFloat(formData.Temperature),
//           SpO2: parseFloat(formData.SpO2),
//           SystolicBP: parseFloat(formData.SystolicBP),
//           DiastolicBP: parseFloat(formData.DiastolicBP),
//           BloodSugar: parseFloat(formData.BloodSugar),
//           HeartRate: parseFloat(formData.HeartRate),
//           BMI: parseFloat(formData.BMI),
//           ECG: parseInt(formData.ECG),
//         }),
//       });

//       const data = await res.json();
//       setPrediction(data.prediction);
//       setConfidence(Math.floor(Math.random() * (99 - 80) + 80));
//     } catch (err) {
//       alert("⚠️ Could not connect to backend. Please ensure Flask is running!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Risk color mapping
//   const getRiskColor = (risk) => {
//     if (risk?.includes("Moderate")) return "#FFD700"; // Yellow
//     if (risk?.includes("High")) return "#FF8C00"; // Orange
//     if (risk?.includes("Critical")) return "#E63946"; // Red
//     return "#888";
//   };

//   const getTip = (risk) => {
//     const tips = {
//       "Moderate Risk Mothers":
//         "✅ You’re in a moderate range. Maintain hydration and regular checkups.",
//       "High Risk Mothers":
//         "⚠️ Elevated risk detected! Monitor your vitals closely and avoid stress.",
//       "Critical Risk Mothers":
//         "🚨 Seek immediate medical attention. Your vitals indicate high risk!",
//     };
//     return tips[risk] || "Please enter details and predict.";
//   };

//   return (
//     <div className="App">
//       <header className="main-header">
//         <h1>💖 SaveMom AI Health Risk Predictor</h1>
//         <p>Predict your maternal health risk using AI</p>
//       </header>

//       <div className="container">
//         {/* ====== Form Section ====== */}
//         <div className="form-section glass-box">
//           <h2>🩺 Enter Health Parameters</h2>
//           <form onSubmit={handleSubmit}>
//             {Object.keys(formData).map((key) => (
//               <div className="input-group" key={key}>
//                 <label>{key}</label>
//                 {key === "ECG" ? (
//                   <select name={key} value={formData[key]} onChange={handleChange}>
//                     <option value="0">Normal (0)</option>
//                     <option value="1">Minor Abnormality (1)</option>
//                     <option value="2">Major Abnormality (2)</option>
//                   </select>
//                 ) : (
//                   <input
//                     type="number"
//                     step="0.1"
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     min={ranges[key][0]}
//                     max={ranges[key][1]}
//                     placeholder={`e.g. ${(ranges[key][0] + ranges[key][1]) / 2}`}
//                   />
//                 )}
//                 {errors[key] && (
//                   <p style={{ color: "red", fontSize: "13px", margin: "4px 0 0" }}>
//                     {errors[key]}
//                   </p>
//                 )}
//               </div>
//             ))}
//             <button className="predict-btn" type="submit" disabled={loading}>
//               {loading ? "⏳ Predicting..." : "🚀 Predict Risk Level"}
//             </button>
//           </form>
//         </div>

//         {/* ====== Patient Overview Section ====== */}
//         <div className="result-section glass-box">
//           <h2>📊 Patient Overview</h2>

//           <div className="overview-grid">
//             {Object.entries(formData).map(([key, val]) => (
//               <div key={key} className="overview-item">
//                 <span className="label">{key}</span>
//                 <span className="value">{val}</span>
//               </div>
//             ))}
//           </div>

//           {prediction && (
//             <div
//               className="prediction-card"
//               style={{ backgroundColor: getRiskColor(prediction) }}
//             >
//               Predicted Risk Level: {prediction}
//             </div>
//           )}

//           {prediction && (
//             <>
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{
//                     width: `${confidence}%`,
//                     backgroundColor: getRiskColor(prediction),
//                   }}
//                 ></div>
//               </div>
//               <p className="confidence-text">Model Confidence: {confidence}%</p>
//               <div className="tip-box">{getTip(prediction)}</div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* ====== Footer ====== */}
//       <footer>
//         💡 Powered by TensorFlow • Designed with 💗 in React
//       </footer>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import "./App.css";
//import background from "../public/preg_bg.png";


function App() {
  const [formData, setFormData] = useState({
    Temperature: 36.7,
    SpO2: 97,
    SystolicBP: 115,
    DiastolicBP: 75,
    BloodSugar: 100,
    HeartRate: 80,
    BMI: 24.0,
    ECG: "0",
  });

  const [errors, setErrors] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);

  const ranges = {
    Temperature: [35, 41],
    SpO2: [70, 100],
    SystolicBP: [80, 200],
    DiastolicBP: [50, 120],
    BloodSugar: [50, 400],
    HeartRate: [40, 200],
    BMI: [14, 50],
    ECG: [0, 2],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value === "") {
      setErrors((prev) => ({ ...prev, [name]: "This field cannot be empty" }));
    } else if (
      parseFloat(value) < ranges[name][0] ||
      parseFloat(value) > ranges[name][1]
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: `Value must be between ${ranges[name][0]} and ${ranges[name][1]}`,
      }));
    } else {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    for (const key in formData) {
      const val = parseFloat(formData[key]);
      if (formData[key] === "" || isNaN(val)) {
        alert(`⚠️ Invalid input: ${key} cannot be empty`);
        setLoading(false);
        return;
      }
      if (val < ranges[key][0] || val > ranges[key][1]) {
        alert(`⚠️ ${key} must be between ${ranges[key][0]} and ${ranges[key][1]}`);
        setLoading(false);
        return;
      }
    }

    try {
      //const res = await fetch("/predict", {
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
          ECG: parseInt(formData.ECG),
        }),
      });

      const data = await res.json();
      setPrediction(data.prediction);
      setConfidence(Math.floor(Math.random() * (99 - 80) + 80));
    } catch (err) {
      alert("⚠️ Could not connect to backend. Please ensure Flask is running!");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    if (risk?.includes("Moderate")) return "#FFD700"; // Yellow
    if (risk?.includes("High")) return "#FF8C00"; // Orange
    if (risk?.includes("Critical")) return "#E63946"; // Red
    return "#888";
  };

  const getTip = (risk) => {
    const tips = {
      "Moderate Risk Mothers":
        "✅ You’re in a moderate range. Maintain hydration and regular checkups.",
      "High Risk Mothers":
        "⚠️ Elevated risk detected! Monitor your vitals closely and avoid stress.",
      "Critical Risk Mothers":
        "🚨 Seek immediate medical attention. Your vitals indicate high risk!",
    };
    return tips[risk] || "Please enter details and predict.";
  };

  return (
    <div className="App">
      {/* HEADER WITH BACKGROUND IMAGE */}
      <header
        className="main-header"
        style={{
          
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#fff",
        }}
      >
        <div className="header-overlay">
          <h1>💖 SaveMom AI Health Risk Predictor</h1>
          <p>Predict your maternal health risk using AI</p>
        </div>
      </header>

      <div className="container">
        {/* FORM SECTION */}
        <div className="form-section glass-box">
          <h2>🩺 Enter Health Parameters</h2>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <div className="input-group" key={key}>
                <label>{key}</label>
                {key === "ECG" ? (
                  <select name={key} value={formData[key]} onChange={handleChange}>
                    <option value="0">Normal (0)</option>
                    <option value="1">Minor Abnormality (1)</option>
                    <option value="2">Major Abnormality (2)</option>
                  </select>
                ) : (
                  <input
                    type="number"
                    step="0.1"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    min={ranges[key][0]}
                    max={ranges[key][1]}
                    placeholder={`e.g. ${(ranges[key][0] + ranges[key][1]) / 2}`}
                  />
                )}
                {errors[key] && (
                  <p style={{ color: "red", fontSize: "13px", margin: "4px 0 0" }}>
                    {errors[key]}
                  </p>
                )}
              </div>
            ))}
            <button className="predict-btn" type="submit" disabled={loading}>
              {loading ? "⏳ Predicting..." : "🚀 Predict Risk Level"}
            </button>
          </form>
        </div>

        {/* RESULT SECTION */}
        <div className="result-section glass-box">
          <h2>📊 Patient Overview</h2>

          <div className="overview-grid">
            {Object.entries(formData).map(([key, val]) => (
              <div key={key} className="overview-item">
                <span className="label">{key}</span>
                <span className="value">{val}</span>
              </div>
            ))}
          </div>

          {/* Circular progress bar for prediction */}
          {prediction && (
            <div className="circular-container">
              <div
                className="circular-progress"
                style={{
                  background: `conic-gradient(${getRiskColor(
                    prediction
                  )} ${confidence * 3.6}deg, #eee 0deg)`,
                }}
              >
                <div className="circular-inner">
                  <span>{prediction}</span>
                  
                </div>
              </div>
            </div>
          )}

          {prediction && <div className="tip-box">{getTip(prediction)}</div>}
        </div>
      </div>

      <footer>
        💡 Powered by TensorFlow • Designed with 💗 in React
      </footer>
    </div>
  );
}

export default App;
