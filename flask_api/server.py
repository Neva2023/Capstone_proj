from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the saved model
with open('decision_tree_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from POST request
        data = request.get_json(force=True)
        print(data)
        # input = [[32, 4.1, 17, 55, 27, 28]]
        # Assume you're getting a 2D array input, convert it to numpy array
        prediction_data = np.array(data)
        # Make prediction using the loaded model
        prediction = model.predict(prediction_data)
        print(prediction)

        # Convert numpy array to list and return as JSON
        output = prediction.tolist()

        return jsonify(output)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
