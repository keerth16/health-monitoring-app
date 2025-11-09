from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__, static_folder="health-frontend/build", static_url_path="")
CORS(app) 

model = joblib.load("model_dir/savemom_rf_model.pkl")
scaler = joblib.load("model_dir/scaler.save")

label_map = {
    0: "Moderate Risk Mothers",
    1: "High Risk Mothers",
    2: "Critical Risk Mothers"
}

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        features = pd.DataFrame([{
            "Temperature": data["Temperature"],
            "SpO2": data["SpO2"],
            "SystolicBP": data["SystolicBP"],
            "DiastolicBP": data["DiastolicBP"],
            "BloodSugar": data["BloodSugar"],
            "HeartRate": data["HeartRate"],
            "BMI": data["BMI"],
            "ECG": data["ECG"]
        }])
        cols = ["Temperature","SpO2","SystolicBP","DiastolicBP","BloodSugar","HeartRate","BMI","ECG"]
        X_scaled = scaler.transform(features[cols])
        pred = model.predict(X_scaled)[0]
        return jsonify({"prediction": label_map.get(pred, "Unknown Risk Level")})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(f"health-frontend/build/{path}"):
        return send_from_directory("health-frontend/build", path)
    return send_from_directory("health-frontend/build", "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
