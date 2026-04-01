import numpy as np
from prediction.ml.model_loader import get_model

def predict(features):
      model = get_model()
      data = np.array(features).reshape(1, -1)
      return int(model.predict(data)[0])