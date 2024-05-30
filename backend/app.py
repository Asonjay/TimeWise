import os

from flask import Flask, jsonify, request
from flask_cors import CORS

from utils import load_config, print_with_color
from model import model
from database.MongoDB import MongoDB

import pdb

os.environ['root_dir'] = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app)  # Allow all origins

config = load_config()
if config['PLATFORM'] == 'OPENAI':
    model = model.OpenAIModel(
        config['OPENAI_API_KEY'], 
        config['MODEL'], 
        config['TEMPERATURE'], 
        config['MAX_TOKENS'])

uri = "mongodb://localhost:27017/"
database_name = "example_db"
db = MongoDB(uri, database_name)


@app.route('/')
def index():
    return None

@app.route('/get_chat_history', methods=['POST'])
def get_chat_history():
    data = request.get_json()
    print_with_color(data, "PURPLE")
    query = {"credential": data['credential']}
    chat_history = db.find_many("chat_history", query)
    print_with_color(chat_history, "GREEN")
    return jsonify(chat_history)
    

@app.route('/send_to_llm', methods=['POST'])
def send_message_to_LLM():
    messages = request.get_json()
    print(messages)
    try:
        response = model.get_response(messages)
        chat_record = {
            "credential": messages['credential'],
            "messages": messages['messages'],
            "response": response
        }
        db.insert_one("chat_history", chat_record)
        # pdb.set_trace()
        return jsonify(response)
    except Exception as e:
        print_with_color(f"[ERROR]: {e}", "RED")
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
