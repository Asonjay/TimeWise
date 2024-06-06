# MongoDB.py
from pymongo import MongoClient, errors
from config import MONGO_URI, DATABASE_NAME

class MongoDB:
    def __init__(self, uri, database_name):
        self.uri = uri
        self.database_name = database_name
        self.client = None
        self.db = None

    def connect(self):
        self.client = MongoClient(self.uri)
        self.db = self.client[self.database_name]

    def disconnect(self):
        if self.client:
            self.client.close()

    def get_db(self):
        if self.db is None:
            self.connect()
        return self.db

    def create_collection(self, collection_name):
        try:
            self.db.create_collection(collection_name)
            print(f"Collection '{collection_name}' created successfully.")
        except errors.CollectionInvalid:
            print(f"Collection '{collection_name}' already exists.")

    def insert_one(self, collection_name, document):
        collection = self.db[collection_name]
        result = collection.insert_one(document)
        print(f"Document inserted with id {result.inserted_id}")

    def insert_many(self, collection_name, documents):
        collection = self.db[collection_name]
        result = collection.insert_many(documents)
        print(f"Inserted {len(result.inserted_ids)} documents.")

    def find_one(self, collection_name, query):
        collection = self.db[collection_name]
        document = collection.find_one(query)
        return document

    def find_many(self, collection_name, query, limit=0):
        collection = self.db[collection_name]
        documents = collection.find(query).limit(limit)
        return list(documents)

    def update_one(self, collection_name, query, update):
        collection = self.db[collection_name]
        result = collection.update_one(query, {"$set": update})
        print(f"Matched {result.matched_count} document(s) and modified {result.modified_count} document(s).")

    def update_many(self, collection_name, query, update):
        collection = self.db[collection_name]
        result = collection.update_many(query, {"$set": update})
        print(f"Matched {result.matched_count} document(s) and modified {result.modified_count} document(s).")

    def delete_one(self, collection_name, query):
        collection = self.db[collection_name]
        result = collection.delete_one(query)
        print(f"Deleted {result.deleted_count} document(s).")

    def delete_many(self, collection_name, query):
        collection = self.db[collection_name]
        result = collection.delete_many(query)
        print(f"Deleted {result.deleted_count} document(s).")

    def list_collections(self):
        collections = self.db.list_collection_names()
        return collections

    def drop_collection(self, collection_name):
        collection = self.db[collection_name]
        collection.drop()
        print(f"Collection '{collection_name}' dropped.")
