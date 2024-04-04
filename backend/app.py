import os

from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

from utils import load_config, print_with_color
from model import model
import pdb

os.environ['root_dir'] = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])  # Allow all origins

config = load_config()
if config['PLATFORM'] == 'OPENAI':
    model = model.OpenAIModel(
        config['OPENAI_API_KEY'], 
        config['MODEL'], 
        config['TEMPERATURE'], 
        config['MAX_TOKENS'])


@app.route('/')
def index():
    return None

@app.route('/llm', methods=['POST'])
def send_message_to_LLM():
    messages = request.get_json()
    try:
        response = model.get_response(messages)
        # pdb.set_trace()
        return jsonify(response)
    except Exception as e:
        print_with_color(f"[ERROR]: {e}", "RED")
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
