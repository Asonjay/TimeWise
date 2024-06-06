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

def print_with_color(obj, color:str, type:str="text", indent:int=0):
    if type == "json":
        print(f"{_color_string[color]}{pformat(obj, indent=2)}{_color_string['END']}")
    elif type == "dict":
        for key, value in obj.items():
            if isinstance(value, dict):
                print_with_color(' ' * indent + f"{key}:", "YELLOW")
                print_with_color(value, "YELLOW", type="dict", indent=indent+2)
            else:
                print_with_color(' ' * indent + f"{key}: {value}", "YELLOW")
    else:
        print(f"{_color_string[color]}{obj}{_color_string['END']}")

# exec time decorator
import time
from functools import wraps

def log_execution_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        duration = end_time - start_time
        print_with_color(f"[TIME]: '{func.__name__}()' took {duration:.2f} seconds", "BLUE")
        return result
    return wrapper