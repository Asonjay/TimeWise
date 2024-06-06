# app.py
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

from utils import log_execution_time
from service.chat_services import get_chat_history_service, send_message_to_llm_service
from database.mongodb_client import init_db

app = Flask(__name__)
CORS(app)  # Allow all origins

os.environ['root_dir'] = os.path.dirname(os.path.abspath(__file__))

init_db(app)

@app.route('/')
def index():
    return None

@app.route('/chat_history', methods=['POST'])
@log_execution_time
def get_chat_history():
    data = request.get_json()
    messages = get_chat_history_service(data)
    return jsonify(messages)

@app.route('/send_message', methods=['POST'])
@log_execution_time
def send_message_to_LLM():
    frontend_request = request.get_json()
    response, status = send_message_to_llm_service(frontend_request)
    return jsonify(response), status

if __name__ == '__main__':
    app.run(debug=True, port=5000)