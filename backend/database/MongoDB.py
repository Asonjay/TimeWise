from pymongo import MongoClient, errors

class MongoDB:
    def __init__(self, uri, database_name):
        self.client = MongoClient(uri)
        self.database = self.client[database_name]

    def create_collection(self, collection_name):
        try:
            self.database.create_collection(collection_name)
            print(f"Collection '{collection_name}' created successfully.")
        except errors.CollectionInvalid:
            print(f"Collection '{collection_name}' already exists.")

    def insert_one(self, collection_name, document):
        collection = self.database[collection_name]
        result = collection.insert_one(document)
        print(f"Document inserted with id {result.inserted_id}")

    def insert_many(self, collection_name, documents):
        collection = self.database[collection_name]
        result = collection.insert_many(documents)
        print(f"Inserted {len(result.inserted_ids)} documents.")

    def find_one(self, collection_name, query):
        collection = self.database[collection_name]
        document = collection.find_one(query)
        return document

    def find_many(self, collection_name, query, limit=0):
        collection = self.database[collection_name]
        documents = collection.find(query).limit(limit)
        return list(documents)

    def update_one(self, collection_name, query, update):
        collection = self.database[collection_name]
        result = collection.update_one(query, {"$set": update})
        print(f"Matched {result.matched_count} document(s) and modified {result.modified_count} document(s).")

    def update_many(self, collection_name, query, update):
        collection = self.database[collection_name]
        result = collection.update_many(query, {"$set": update})
        print(f"Matched {result.matched_count} document(s) and modified {result.modified_count} document(s).")

    def delete_one(self, collection_name, query):
        collection = self.database[collection_name]
        result = collection.delete_one(query)
        print(f"Deleted {result.deleted_count} document(s).")

    def delete_many(self, collection_name, query):
        collection = self.database[collection_name]
        result = collection.delete_many(query)
        print(f"Deleted {result.deleted_count} document(s).")

    def list_collections(self):
        collections = self.database.list_collection_names()
        return collections

    def drop_collection(self, collection_name):
        collection = self.database[collection_name]
        collection.drop()
        print(f"Collection '{collection_name}' dropped.")


if __name__ == "__main__":
    # MongoDB Testing code:
    uri = "mongodb://localhost:27017/"
    database_name = "example_db"
    db = MongoDB(uri, database_name)

    db.create_collection("test_collection")

    document = {"name": "John Doe", "age": 30, "city": "New York"}
    db.insert_one("test_collection", document)

    # documents = [
    #     {"name": "Jane Doe", "age": 25, "city": "San Francisco"},
    #     {"name": "Alice", "age": 28, "city": "Los Angeles"}
    # ]
    # db.insert_many("test_collection", documents)

    # query = {"name": "John Doe"}
    # found_document = db.find_one("test_collection", query)
    # print("Found document:", found_document)

    # found_documents = db.find_many("test_collection", {"age": {"$gte": 25}})
    # print("Found documents:", found_documents)

    # update = {"age": 31}
    # db.update_one("test_collection", {"name": "John Doe"}, update)

    # update = {"city": "Chicago"}
    # db.update_many("test_collection", {"age": {"$gte": 28}}, update)

    # db.delete_one("test_collection", {"name": "Alice"})

    # db.delete_many("test_collection", {"age": {"$lt": 30}})

    # collections = db.list_collections()
    # print("Collections:", collections)

    # db.drop_collection("test_collection")


    
