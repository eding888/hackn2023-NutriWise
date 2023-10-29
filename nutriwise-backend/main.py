from flask import Flask, request, jsonify, make_response, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")

mongo_url = "mongodb+srv://maximdolphin:Jerome2004@cluster0.c7dxu9a.mongodb.net/"
client = MongoClient(mongo_url)

db = client["nutriwise"]
collection = db["user"]

CORS(
    app,
    supports_credentials=True,
)

@app.route("/")
def default():
    return "NutriWise Backend"


def serialize_doc(doc):
    doc["_id"] = str(doc["_id"])
    return doc

@app.route("/create-user", methods=["POST"])
def create_user():
    data = request.get_json()
    user_email = data["email"]
    print(user_email)
    user_password = data["password"]
    user_doc = {
        "_id": user_email,
        "password": user_password
    }
    collection.insert_one(user_doc)
    email = user_email
    return jsonify(email), 200


@app.route("/get-user/<email>", methods=["GET"])
def get_user(email):
    if not email:
        return jsonify({"error": "User not logged in"}), 401
    fields_to_return = {
        "password": 1
    }
    user_data = collection.find_one({"_id": email}, fields_to_return)
    if user_data:
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    print(email)
    password = data["password"]
    user_data = collection.find_one({"_id": email})
    if not user_data:
        return jsonify({"error": "User not found"}), 404
    real_password = user_data["password"]
    if password != real_password:
        return jsonify({"error": "Incorrect password"}), 401
    else:
        return jsonify(email), 200

@app.route("/get-users", methods=["GET"])
def get_users():
    users = collection.find({}, {"_id": 1, "password": 1})
    user_list = [{"email": user["_id"], "password": user.get("password")} for user in users]
    return jsonify(user_list), 200


@app.route("/create-user-data", methods=["POST"])
def create_user_data():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return jsonify({"error": "User not logged in"}), 401
    concat_fields = ["allergies", "dietary_preferences", "food_intolerances", "health_conditions", "medications", "breakfast", "lunch", "dinner", "snacks"]
    existing_user_data = collection.find_one({"_id": email}) or {}

    update_operations = {}
    for field in concat_fields:
        if field in data:
            # Ensure both existing_value and new_value are lists
            existing_value = existing_user_data.get(field, [])
            if not isinstance(existing_value, list):
                existing_value = [existing_value]

            new_value = data[field]
            if not isinstance(new_value, list):
                new_value = [new_value]

            # Append new_value to existing_value
            update_operations[field] = existing_value + new_value

    # Update fields that are not in concat_fields directly
    for field, value in data.items():
        if field not in concat_fields:
            update_operations[field] = value

    result = collection.update_one(
        {"_id": email},
        {"$set": update_operations},
        upsert=True
    )

    if result.matched_count > 0 or result.upserted_id:
        return jsonify({"message": "User data updated successfully"}), 200
    else:
        return jsonify({"error": "User update failed"}), 500
    
@app.route("/replace-user-data", methods=["POST"])
def replace_user_data():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return jsonify({"error": "User not logged in"}), 401
    update_fields = ["allergies", "dietary_preferences", "food_intolerances", "health_conditions", "medications", "breakfast", "lunch", "dinner", "snacks"]
    existing_user_data = collection.find_one({"_id": email}) or {}

    update_operations = {}
    for field in update_fields:
        if field in data:
            # Ensure both existing_value and new_value are lists
            existing_value = existing_user_data.get(field, [])
            if not isinstance(existing_value, list):
                existing_value = [existing_value]

            new_value = data[field]
            if not isinstance(new_value, list):
                new_value = [new_value]

            update_operations[field] = new_value

    # Update fields that are not in concat_fields directly
    for field, value in data.items():
        if field not in update_fields:
            update_operations[field] = value

    result = collection.update_one(
        {"_id": email},
        {"$set": update_operations},
        upsert=True
    )

    if result.matched_count > 0 or result.upserted_id:
        return jsonify({"message": "User data updated successfully"}), 200
    else:
        return jsonify({"error": "User update failed"}), 500


@app.route("/get-user-data/<email>", methods=["GET"])
def get_user_data(email):
    if not email:
        return jsonify({"error": "User not logged in"}), 401
    fields_to_return = {
      "age": 1,
      "gender": 1,
      "height": 1,
      "weight": 1,
      "activity_level": 1,
      "target_nutr_goal": 1,
      "target_cal_daily": 1,
      "allergies": 1,
      "dietary_preferences": 1,
      "food_intolerances": 1,
      "health_conditions": 1,
      "medications": 1,
      "breakfast": 1,
      "lunch": 1,
      "dinner": 1,
      "snacks": 1,
      "daily_cal_consumed": 1,
      "missing_vitamins": 1,
      "foods_to_add": 1,
      "foods_to_remove": 1
    }

    user_data = collection.find_one({"_id": email}, fields_to_return)
    if user_data:
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404


@app.route("/create-user-diet", methods=["POST"])
def create_user_diet():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return jsonify({"error": "User not logged in"}), 401

    update_fields = ["missing_vitamins", "foods_to_add", "foods_to_remove"]
    existing_user_data = collection.find_one({"_id": email}) or {}

    update_operations = {}
    for field in update_fields:
        if field in data:
            existing_value = existing_user_data.get(field, [])
            if not isinstance(existing_value, list):
                existing_value = [existing_value]

            new_value = data[field]
            if not isinstance(new_value, list):
                new_value = [new_value]

            update_operations[field] = new_value

    # Update fields that are not in update_fields directly
    for field, value in data.items():
        if field not in update_fields:
            update_operations[field] = value

    # Ensure the database connection is set up correctly
    try:
        result = collection.update_one(
            {"_id": email},
            {"$set": update_operations},
            upsert=True
        )

        if result.matched_count > 0 or result.upserted_id:
            return jsonify({"message": "User diet data updated successfully"}), 200
        else:
            return jsonify({"error": "User diet update failed"}), 500
    except Exception as e:
        # This will print the error to the console. For production, you might want to log the error.
        print(e)
        return jsonify({"error": "Database error occurred"}), 500


@app.route("/get-user-diet/<email>", methods=["GET"])
def get_user_diet(email):
    if not email:
        return jsonify({"error": "User not logged in"}), 401
    fields_to_return = {
    "missing_vitamins": 1,
    "foods_to_add": 1,
    "foods_to_remove": 1,
    }

    user_data = collection.find_one({"_id": email}, fields_to_return)
    if user_data:
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route("/delete-user-meals", methods=["POST"])
def delete_user_meals():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return jsonify({"error": "User not logged in"}), 401
    result = collection.update_one(
        {"_id": email},
        {"$set": {"breakfast": [], "lunch": [], "dinner": [], "snacks": []}},
        upsert=True
    )
    if result.matched_count > 0 or result.upserted_id:
        return jsonify({"message": "User meals deleted successfully"}), 200
    else:
        return jsonify({"error": "User meals deletion failed"}), 500


if __name__ == '__main__':
    app.run(host="localhost", port=5173)
