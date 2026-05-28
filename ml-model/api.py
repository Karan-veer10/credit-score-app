from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load model and scaler
model = joblib.load('model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features
        features = np.array([[
            data.get('age', 30),
            data.get('income', 50000),
            data.get('loanAmount', 0),
            data.get('repaymentHistory', 70),
            data.get('existingDebts', 0),
            data.get('creditUtilization', 30)
        ]])
        
        # Scale features
        features_scaled = scaler.transform(features)
        
        # Predict
        prediction = model.predict(features_scaled)[0]
        
        # Ensure score is within range
        score = max(300, min(900, int(prediction)))
        
        # Determine rating
        if score >= 750:
            rating = "Excellent"
        elif score >= 700:
            rating = "Good"
        elif score >= 650:
            rating = "Fair"
        else:
            rating = "Poor"
        
        return jsonify({
            'score': score,
            'rating': rating,
            'message': f'Your credit score is {score} ({rating})'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5001, debug=True)