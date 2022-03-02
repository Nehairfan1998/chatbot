from flask import Flask,request,jsonify
from flask_cors import CORS
from chat import get_response

app = Flask(__name__)
CORS(app)

@app.post("/predict")
def predict():
    text=request.get_json().get("message")
    #TODO: check if text is valid
    # if (text == "HELL"):
    #     message = {"answer":"HEAVEN"}
    #     return jsonify (message)
    response =get_response(text)
    message ={"answer":response}
    return jsonify (message)


if __name__ =="__main__":
    app.run(debug=True)


# C:\Users\neha irfan\OneDrive\Desktop\chatbot\chatbot-deployment> python train.py