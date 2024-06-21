# mongodb_client.py
import os
from flask import g
from database.MongoDB import MongoDB

MONGO_HOST = os.getenv('MONGODB_HOST', 'localhost')
MONGO_PORT = os.getenv('MONGODB_PORT', '27017')
DATABASE_NAME = os.getenv('MONGODB_DB_NAME', 'example_db')

# Create the MongoDB URI
MONGO_URI = f"mongodb://{MONGO_HOST}:{MONGO_PORT}/{DATABASE_NAME}"

mongo_db = MongoDB(MONGO_URI, DATABASE_NAME)

def get_db():
    if 'db' not in g:
        mongo_db.connect()
        g.db = mongo_db
    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.disconnect()

def init_db(app):
    app.teardown_appcontext(close_db)