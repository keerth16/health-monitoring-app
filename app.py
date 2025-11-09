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
# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# from flask_cors import CORS, cross_origin

# import joblib
# import pandas as pd
# import os

# app = Flask(__name__, static_folder="health-frontend/build", static_url_path="")

# # ✅ Allow both your deployed frontend and localhost (for testing)
# CORS(app, resources={r"/*": {"origins": ["https://savemom-health-app.onrender.com", "http://localhost:3000"]}})


# # Load your model and scaler
# model = joblib.load("model_dir/savemom_rf_model.pkl")
# scaler = joblib.load("model_dir/scaler.save")

# # Label mapping
# label_map = {
#     0: "Moderate Risk Mothers",
#     1: "High Risk Mothers",
#     2: "Critical Risk Mothers"
# }

# @app.route("/predict", methods=["POST"])
# @cross_origin(origins=["https://savemom-health-app.onrender.com", "http://localhost:3000"])
# def predict():
#     try:
#         data = request.json
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
#         columns = ["Temperature", "SpO2", "SystolicBP", "DiastolicBP", "BloodSugar", "HeartRate", "BMI", "ECG"]
#         features = features[columns]
#         features_scaled = pd.DataFrame(scaler.transform(features), columns=columns)
#         prediction = model.predict(features_scaled)[0]
#         risk_label = label_map.get(prediction, "Unknown Risk Level")

#         return jsonify({"prediction": risk_label})
#     except Exception as e:
#         return jsonify({"error": str(e)})

# # Serve React frontend
# @app.route("/", defaults={'path': ''})
# @app.route("/<path:path>")
# def serve(path):
#     if path != "" and os.path.exists(f"health-frontend/build/{path}"):
#         return send_from_directory("health-frontend/build", path)
#     else:
#         return send_from_directory("health-frontend/build", "index.html")

# if __name__ == "__main__":
#     app.run(debug=True)

#renderrror
# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# import joblib
# import pandas as pd
# import os

# app = Flask(__name__, static_folder="health-frontend/build", static_url_path="")

# # ✅ Allow both local + deployed frontend
# CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "https://savemom-health-app.onrender.com"]}})

# # ✅ Load model + scaler
# model = joblib.load("model_dir/savemom_rf_model.pkl")
# scaler = joblib.load("model_dir/scaler.save")

# label_map = {
#     0: "Moderate Risk Mothers",
#     1: "High Risk Mothers",
#     2: "Critical Risk Mothers"
# }


# @app.route("/predict", methods=["POST", "OPTIONS"])
# def predict():
#     if request.method == "OPTIONS":
#         # Handle preflight
#         response = jsonify({"message": "CORS preflight OK"})
#         response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
#         response.headers["Access-Control-Allow-Headers"] = "Content-Type"
#         response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
#         return response

#     try:
#         data = request.json
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

#         columns = ["Temperature", "SpO2", "SystolicBP", "DiastolicBP", "BloodSugar", "HeartRate", "BMI", "ECG"]
#         features_scaled = pd.DataFrame(scaler.transform(features), columns=columns)
#         prediction = model.predict(features_scaled)[0]
#         risk_label = label_map.get(prediction, "Unknown Risk Level")

#         response = jsonify({"prediction": risk_label})
#         response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
#         return response

#     except Exception as e:
#         response = jsonify({"error": str(e)})
#         response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
#         return response, 500


# @app.route("/", defaults={"path": ""})
# @app.route("/<path:path>")
# def serve(path):
#     if path != "" and os.path.exists(f"health-frontend/build/{path}"):
#         return send_from_directory("health-frontend/build", path)
#     else:
#         return send_from_directory("health-frontend/build", "index.html")


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import pandas as pd
import os

# Flask setup
app = Flask(__name__, static_folder="health-frontend/build", static_url_path="")

# Enable CORS for local dev (Render won’t trigger CORS when frontend + backend are together)
CORS(app, origins=["http://localhost:3000"])

# Load model and scaler
model = joblib.load("model_dir/savemom_rf_model.pkl")
scaler = joblib.load("model_dir/scaler.save")

# Label map
label_map = {
    0: "Moderate Risk Mothers",
    1: "High Risk Mothers",
    2: "Critical Risk Mothers"
}

# Prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
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
        columns = ["Temperature", "SpO2", "SystolicBP", "DiastolicBP",
                   "BloodSugar", "HeartRate", "BMI", "ECG"]
        features_scaled = pd.DataFrame(scaler.transform(features), columns=columns)
        prediction = model.predict(features_scaled)[0]
        risk_label = label_map.get(prediction, "Unknown Risk Level")

        return jsonify({"prediction": risk_label})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Serve React frontend
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(f"health-frontend/build/{path}"):
        return send_from_directory("health-frontend/build", path)
    else:
        return send_from_directory("health-frontend/build", "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
