# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # import joblib
# # import numpy as np

# # app = Flask(__name__)
# # CORS(app)

# # # Load model and scaler (you saved them as)
# # model = joblib.load("model_dir/savemom_rf_model.pkl")
# # scaler = joblib.load("model_dir/scaler.save")

# # @app.route("/")
# # def home():
# #     return "Maternal Health Risk Prediction API is running ✅"

# # import pandas as pd

# # @app.route("/predict", methods=["POST"])
# # def predict():
# #     data = request.json
# #     try:
# #         # Build DataFrame to match training columns
# #         features = pd.DataFrame([{
# #             "Temperature": data["Temperature"],
# #             "SpO2": data["SpO2"],
# #             "SystolicBP": data["SystolicBP"],
# #             "DiastolicBP": data["DiastolicBP"],
# #             "BloodSugar": data["BloodSugar"],
# #             "HeartRate": data["HeartRate"],
# #             "BMI": data["BMI"],
# #             "ECG": data["ECG"]
# #         }])

# #         prediction = model.predict(features)[0]
# #         return jsonify({"Predicted Risk": str(prediction)})

# #     except Exception as e:
# #         return jsonify({"error": str(e)})


# # if __name__ == "__main__":
# #     app.run(port=5000, debug=True)
# from flask import Flask, request, jsonify
# import joblib
# import pandas as pd
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load model and scaler
# model = joblib.load("model_dir/savemom_rf_model.pkl")
# scaler = joblib.load("model_dir/scaler.save")

# # Label mapping (same as used during training)
# label_map = {0: "Moderate Risk Mothers", 1: "High Risk Mothers", 2: "Critical Risk Mothers"}

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json
#         print("Received data:", data)

#         # Convert to DataFrame with correct feature order
#         features = pd.DataFrame([{
#             "Temperature": data["Temperature"],
#             "SpO2": data["SpO2"],
#             "SystolicBP": data["SystolicBP"],
#             "DiastolicBP": data["DiastolicBP"],
#             "BloodSugar": data["BloodSugar"],
#             "HeartRate": data["HeartRate"],
#             "BMI": data["BMI"],
#             "ECG": data["ECG"]
#         }])
# # Ensure DataFrame column order matches training
#         columns = ["Temperature", "SpO2", "SystolicBP", "DiastolicBP", "BloodSugar", "HeartRate", "BMI", "ECG"]
#         features = features[columns]

# # Scale and predict (preserving column names)
#         features_scaled = pd.DataFrame(scaler.transform(features), columns=columns)
#         prediction = model.predict(features_scaled)[0]


#         # Convert numeric label → readable name
#         risk_label = label_map.get(prediction, "Unknown Risk Level")

#         return jsonify({"prediction": risk_label})

#     except Exception as e:
#         print("Error:", str(e))
#         return jsonify({"error": str(e)})


# if __name__ == "__main__":
#     app.run(port=5000, debug=True)
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__, static_folder="health-frontend/build", static_url_path="")
CORS(app)

# Load your model and scaler
model = joblib.load("model_dir/savemom_rf_model.pkl")
scaler = joblib.load("model_dir/scaler.save")

# Label mapping
label_map = {
    0: "Moderate Risk Mothers",
    1: "High Risk Mothers",
    2: "Critical Risk Mothers"
}

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
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
        columns = ["Temperature", "SpO2", "SystolicBP", "DiastolicBP", "BloodSugar", "HeartRate", "BMI", "ECG"]
        features = features[columns]
        features_scaled = pd.DataFrame(scaler.transform(features), columns=columns)
        prediction = model.predict(features_scaled)[0]
        risk_label = label_map.get(prediction, "Unknown Risk Level")

        return jsonify({"prediction": risk_label})
    except Exception as e:
        return jsonify({"error": str(e)})

# Serve React frontend
@app.route("/", defaults={'path': ''})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(f"health-frontend/build/{path}"):
        return send_from_directory("health-frontend/build", path)
    else:
        return send_from_directory("health-frontend/build", "index.html")

if __name__ == "__main__":
    app.run(debug=True)
