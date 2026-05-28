import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib
import pickle

# Generate synthetic data for training
def generate_synthetic_data(n_samples=10000):
    np.random.seed(42)
    
    # Generate features
    age = np.random.randint(18, 70, n_samples)
    income = np.random.normal(50000, 30000, n_samples)
    income = np.clip(income, 15000, 250000)
    
    loan_amount = np.random.normal(income * 0.3, income * 0.2, n_samples)
    loan_amount = np.clip(loan_amount, 0, income * 1.5)
    
    # Repayment history (0-100)
    repayment_history = np.random.beta(5, 2, n_samples) * 100
    
    # Existing debts
    existing_debts = np.random.normal(income * 0.2, income * 0.15, n_samples)
    existing_debts = np.clip(existing_debts, 0, income * 1.2)
    
    # Credit utilization (0-100)
    credit_utilization = np.random.beta(3, 7, n_samples) * 100
    
    # Calculate credit score (300-900)
    # Base score
    score = 600
    
    # Age factor
    score += (age - 30) * 0.5
    score += np.where(age > 50, 20, 0)
    score -= np.where(age < 25, 20, 0)
    
    # Income factor
    score += (income / 10000) * 2
    score = np.clip(score, 300, 900)
    
    # Loan to income ratio
    dti = (loan_amount / income) * 100
    score -= dti * 0.5
    
    # Repayment history factor
    score += repayment_history * 0.5
    
    # Existing debts factor
    score -= (existing_debts / 1000) * 0.1
    
    # Credit utilization factor
    score -= credit_utilization * 0.5
    score += np.where(credit_utilization < 30, 30, 0)
    
    # Add some noise
    score += np.random.normal(0, 20, n_samples)
    
    # Clip to valid range
    score = np.clip(score, 300, 900).astype(int)
    
    # Create DataFrame
    df = pd.DataFrame({
        'age': age,
        'income': income,
        'loan_amount': loan_amount,
        'repayment_history': repayment_history,
        'existing_debts': existing_debts,
        'credit_utilization': credit_utilization,
        'credit_score': score
    })
    
    return df

# Generate data
print("Generating synthetic data...")
data = generate_synthetic_data(10000)

# Prepare features and target
features = ['age', 'income', 'loan_amount', 'repayment_history', 'existing_debts', 'credit_utilization']
X = data[features]
y = data['credit_score']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
print("Training Random Forest model...")
model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
model.fit(X_train_scaled, y_train)

# Evaluate
train_score = model.score(X_train_scaled, y_train)
test_score = model.score(X_test_scaled, y_test)
print(f"Training R² score: {train_score:.4f}")
print(f"Testing R² score: {test_score:.4f}")

# Save model and scaler
print("Saving model and scaler...")
joblib.dump(model, 'model.pkl')
joblib.dump(scaler, 'scaler.pkl')

print("Model training complete!")