import os
import json
import yaml
from pprint import pformat


_color_string = {
    "RED": "\033[91m",
    "GREEN": "\033[92m",
    "YELLOW": "\033[93m",
    "BLUE": "\033[94m",
    "PURPLE": "\033[95m",
    "CYAN": "\033[96m",
    "WHITE": "\033[97m",
    "BOLD": "\033[1m",
    "UNDERLINE": "\033[4m",
    "END": "\033[0m"
}

def print_with_color(obj, color:str, type:str="text"):
    if type == "json":
        print(f"{_color_string[color]}{pformat(obj, indent=2)}{_color_string['END']}")
    else:
        print(f"{_color_string[color]}{obj}{_color_string['END']}")


def load_config(config_path="./config.yaml", api_key_path="./api_key.yaml"):
    configs = dict(os.environ)
    with open(config_path, "r") as file:
        yaml_data = yaml.safe_load(file)
    configs.update(yaml_data)
    with open(api_key_path, "r") as file:
        api_key = yaml.safe_load(file)
    configs.update(api_key)
    return configs

