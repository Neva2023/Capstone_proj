from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np

app = Flask(__name__)


# Load the saved model

from joblib import load
model = load('filename.joblib') 


@app.route("/")
def Home():
    return render_template("index2.html")

@app.route('/predict', methods=['GET', 'POST'])

def predict():
    try:
        # Get data from POST request
        form_values = list(request.form.values())
        float_features = [float(x) for x in form_values[:-1]]  # Assuming stress is the last input, excluding it from the features
        stress_value = float(request.form["stress"])  # Getting the stress value

        features = [np.array(float_features)]
        prediction = model.predict(features)
        prediction = model.predict(features)
        output = (prediction.tolist())
    
        
        if stress_value == 0:
            return render_template("index2.html", prediction_text="Error: Stress value cannot be zero.")

        # Dividing the predicted result by the stress value
        result = output[0] / stress_value
       
        
        
        
        
        
        return render_template("index2.html", 
                               prediction_text="The shear strength is: {}".format(output[0]),
                               final_result_text="the Factor of Safety is {}".format(result),)
        

       
        

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    
    