# model.py
from abc import ABC, abstractmethod
import requests
import json
import os

from utils import print_with_color
from model.prompts import system_prompt, testing_prompt
from dotenv import load_dotenv
from config import PLATFORM, MODEL, MAX_TOKENS, TEMPERATURE, MODEL_BASE_URL

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")


class BaseModel(ABC):
    def __init__(self) -> None:
        pass
    
    @abstractmethod
    def _get_pricing(self, model_name: str) -> None:
        pass
    
    @abstractmethod
    def get_response(self, messages):
        pass
    

class OpenAIModel(BaseModel):
    def __init__(self, api_key: str, model: str, temperature: float, max_tokens: int, base_url: str):
        super().__init__()
        self.api_key = api_key
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.base_url = base_url
        self.chat_history = [{
            "role": "system",
            "content": system_prompt
        }]

    def _get_pricing(self, input_tokens: int, output_tokens: int) -> None:
        princing_json_path = os.path.join(os.environ['root_dir'], "model" ,"model_pricing.json")
        with open(princing_json_path, "r") as file:
            pricing_data = json.load(file)
        model_pricing = pricing_data['OPENAI'][self.model]
        print_with_color(f"[COST]: ${input_tokens / 1000 * model_pricing['input'] + output_tokens / 1000 * model_pricing['output']:.5f}, INPUT: {input_tokens}, OUTPUT: {output_tokens}, MODEL: {self.model}", "CYAN")

    def _parse_response(self, response: str) -> dict:
        # pdb.set_trace()
        try:
            response_dict = json.loads(response)
        except json.JSONDecodeError as e:
            print_with_color(f"[ERROR]: {e}", "RED")
            return
        def print_dict(d, indent=0):
            for key, value in d.items():
                if isinstance(value, dict):
                    print_with_color(' ' * indent + f"{key}:", "YELLOW")
                    print_dict(value, indent + 2)
                else:
                    print_with_color(' ' * indent + f"{key}: {value}", "YELLOW")
        print_with_color("--- RESPONSE ---", "YELLOW")
        print_dict(response_dict) 
        return response_dict

    def get_response(self, request) -> str:
        # print_with_color(f"[MESSAGE]: {request}", "CYAN")
        content = [
            {
                "type": "text",
                "text": request['messages'][-1]['content']
            }
        ]
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        self.chat_history.append({"role": "user", "content": content})
        payload = {
            "model": self.model,
            "messages": self.chat_history,
            "temperature": self.temperature,
            "max_tokens": self.max_tokens
        }
        response = requests.post(self.base_url, headers=headers, json=payload).json()
        # import pdb; pdb.set_trace()
        self.chat_history.append({"role": "assistant", "content": response["choices"][0]["message"]["content"]})
        
        # print_with_color(response["choices"][0]["message"], "GREEN", type="dict")
        if "error" not in response:
            self._get_pricing(response['usage']["prompt_tokens"], response['usage']["completion_tokens"])
        else:
            return response["error"]["message"]
        return self._parse_response(response["choices"][0]["message"]["content"])
    

def create_model(platform=PLATFORM, api_key=api_key, model=MODEL, temperature=TEMPERATURE, max_tokens=MAX_TOKENS, model_base_url=MODEL_BASE_URL) -> BaseModel:
    if platform == "OPENAI":
        return OpenAIModel(api_key, model, temperature, max_tokens, model_base_url)
    else:
        raise ValueError("Invalid platform")