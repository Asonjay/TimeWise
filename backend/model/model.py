from abc import abstractmethod
from typing import List
import requests
import json
import os

from utils import print_with_color
from model.prompts import system_prompt

import pdb


class BaseModel:
    def __init__(self) -> None:
        pass
    
    @abstractmethod
    def _get_pricing(self, model_name: str) -> None:
        pass
    
    @abstractmethod
    def get_response(self, messages):
        pass
    

class OpenAIModel(BaseModel):
    def __init__(self, api_key: str, model: str, temperature: float, max_tokens: int):
        super().__init__()
        self.api_key = api_key
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.base_url = "https://api.openai.com/v1/chat/completions"

    def _get_pricing(self, input_tokens: int, output_tokens: int) -> None:
        princing_json_path = os.path.join(os.environ['root_dir'], "model" ,"model_pricing.json")
        with open(princing_json_path, "r") as file:
            pricing_data = json.load(file)
        model_pricing = pricing_data['OPENAI'][self.model]
        print_with_color(f"[COST: ${input_tokens / 1000 * model_pricing['input'] + output_tokens / 1000 * model_pricing['output']:.5f}, INPUT: {input_tokens}, OUTPUT: {output_tokens}]", "YELLOW")
    
    # TODO: modify for multiple format
    def _parse_response(self, response: str) -> dict:
        return {
            "message": response
        }

    def get_response(self, messages: str) -> str:
        # print_with_color(f"[MESSAGE]: {messages}", "CYAN")
        content = [
            {
                "type": "text",
                "text": messages['messages'][-1]['content']['message']
            }
        ]
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        payload = {
            "model": self.model,
            "messages": [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": content
                }
            ],
            "temperature": self.temperature,
            "max_tokens": self.max_tokens
        }
        response = requests.post(self.base_url, headers=headers, json=payload).json()
        print_with_color(response["choices"][0]["message"], "GREEN", type="json")
        if "error" not in response:
            self._get_pricing(response['usage']["prompt_tokens"], response['usage']["completion_tokens"])
        else:
            return response["error"]["message"]
        return self._parse_response(response["choices"][0]["message"]["content"])
    
