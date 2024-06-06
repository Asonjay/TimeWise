# services.py
import json
from model.prompts import welcome_prompt
from utils import print_with_color
import pdb
from model import model
from database.mongodb_client import get_db

def _init_model():
    return model.create_model()

def get_chat_history_service(data):
    print_with_color('--- CHAT HISTORY ---', 'PURPLE')
    print_with_color(data, "PURPLE")
    query = {'credential': data['credential']}
    db = get_db()
    chat_history = db.find_one("chat_history", query) 
    # pdb.set_trace()
    if not chat_history:
        welcome_prompt_json = json.loads(welcome_prompt.strip())
        chat_history = {
            "credential": data['credential'],
            "messages": [welcome_prompt_json]
        }
        db.insert_one("chat_history", chat_history)
    print_with_color(chat_history['messages'], "PURPLE", type="json")
    return chat_history['messages']

def send_message_to_llm_service(frontend_request):
    model = _init_model()
    try:
        response = model.get_response(frontend_request)
        if not response:
            print_with_color("[ERROR]: response is None type, check your code", "RED")
            return {'status': 'error', 'message': 'response is None type'}, 500
        # pdb.set_trace()
        db = get_db()
        document = db.find_one("chat_history", {"credential": frontend_request['credential']})
        if document:
            frontend_request['messages'].append(response)
            db.update_one(
                "chat_history",
                {"credential": frontend_request['credential']},
                {"messages": frontend_request['messages']}
            )
        else:
            return {'status': 'error', 'message': 'No document found with the specified credential'}, 404
        return response, 200
    except Exception as e:
        print_with_color(f"[ERROR]: {e}", "RED")
        return {'status': 'error', 'message': str(e)}, 500
