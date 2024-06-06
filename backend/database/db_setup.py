# db_setup.py
# This code if only for testing purposes. It creates a collection in the database.
from MongoDB import MongoDB

if __name__ == "__main__":
    uri = "mongodb://localhost:27017/"
    database_name = "example_db"
    db = MongoDB(uri, database_name)
    
    db.create_collection("chat_history")
    