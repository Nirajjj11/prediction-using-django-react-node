import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib, os

os.makedirs("../model", exist_ok=True)

# Example dataset (replace with CSV later)
data = pd.DataFrame({
      'income': [20000, 50000, 30000, 80000, 100000],
      'age': [25, 45, 35, 50, 40],
      'loan': [0, 1, 0, 1, 1]
})

X = data[['income', 'age']]
y = data['loan']

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, "../model/model.pkl")

print("Model trained ✅")