from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("model.pkl")

@app.route("/")
def home():
    return "Backend Running Successfully"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # Convert input data into array
        features = np.array(data["features"]).reshape(1, -1)

        # Predict
        prediction = model.predict(features)

        return jsonify({
            "prediction": str(prediction[0])
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)