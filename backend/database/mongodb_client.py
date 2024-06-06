# mongodb_client.py
from flask import g
from config import MONGO_URI, DATABASE_NAME
from database.MongoDB import MongoDB

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