from flask import Flask, request, jsonify, make_response, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")

mongo_url = "mongodb+srv://maximdolphin:Jerome2004@cluster0.c7dxu9a.mongodb.net/"
client = MongoClient(mongo_url)

db = client["nutriwise"]
collection = db["user"]

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

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
    user_password = data["password"]
    user_doc = {
        "_id": user_email,
        "password": user_password
    }
    collection.insert_one(user_doc)
    resp = make_response("Cookie has been set!")
    resp.set_cookie("my_cookie", user_email)
    return resp, 200


@app.route("/get-user/<email>", methods=["GET"])
def get_user():
    email = request.cookies.get("my_cookie")
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
    password = data["password"]
    user_data = collection.find_one({"_id": email})
    if not user_data:
        return jsonify({"error": "User not found"}), 404
    real_password = user_data["password"]
    if password != real_password:
        return jsonify({"error": "Incorrect password"}), 401
    else:
        resp = make_response("Cookie has been set!")
        resp.set_cookie("my_cookie", email)
        return resp, 200

@app.route("/get-users", methods=["GET"])
def get_users():
    users = collection.find({}, {"_id": 1, "password": 1})
    user_list = [{"email": user["_id"], "password": user.get("password")} for user in users]
    return jsonify(user_list), 200


@app.route("/create-user-data/<email>", methods=["POST"])
def create_user_data():
    email = request.cookies.get("my_cookie")
    if not email:
        return jsonify({"error": "User not logged in"}), 401
    
    data = request.get_json()

    user_update_data = {
        "age": data.get("age"),
        "gender": data.get("gender"),
        "height": data.get("height"),
        "weight": data.get("weight"),
        "activity_level": data.get("activity_level"),
        "target_nutr_goal": data.get("target_nutr_goal"),
        "target_cal_daily": data.get("target_cal_daily"),
        "allergies": data.get("allergies"),
        "dietary_preferences": data.get("dietary_preferences"),
        "food_intolerances": data.get("food_intolerances"),
        "health_conditions": data.get("health_conditions"),
        "medications": data.get("medications"),
        "breakfast": data.get("breakfast"),
        "lunch": data.get("lunch"),
        "dinner": data.get("dinner"),
        "snacks": data.get("snacks"),
        "daily_cal_consumed": data.get("daily_cal_consumed")
    }

    # Remove None values from user_update_data
    user_update_data = {k: v for k, v in user_update_data.items() if v is not None}

    result = collection.update_one(
        {"_id": email},
        {"$set": user_update_data},
        upsert=True
    )

    if result.matched_count > 0 or result.upserted_id:
        return jsonify({"message": "User data updated successfully"}), 200
    else:
        return jsonify({"error": "User update failed"}), 500


@app.route("/get-user-data/<email>", methods=["GET"])
def get_user_data():
    email = request.cookies.get("my_cookie")
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
    "daily_cal_consumed": 1
    }
    
    user_data = collection.find_one({"_id": email}, fields_to_return)
    if user_data:
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404
      
@app.route("/create-user-diet/<email>", methods=["POST"])
def create_user_diet():
    email = request.cookies.get("my_cookie")
    if not email:
        return jsonify({"error": "User not logged in"}), 401
    data = request.get_json()
    user_update_data = {
        "missing_vitamins": data.get("missing_vitamins"),
        "foods_to_add": data.get("foods_to_add"),
        "foods_to_remove": data.get("foods_to_remove"),
    }
    user_update_data = {k: v for k, v in user_update_data.items() if v is not None}

    result = collection.update_one(
        {"_id": email},
        {"$set": user_update_data},
        upsert=True
    )

    if result.matched_count > 0 or result.upserted_id:
        return jsonify({"message": "User data updated successfully"}), 200
    else:
        return jsonify({"error": "User update failed"}), 500


@app.route("/get-user-diet/<email>", methods=["GET"])
def get_user_diet():
    email = request.cookies.get("my_cookie")
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


if __name__ == '__main__':
    app.run(debug=True, port=5000)
