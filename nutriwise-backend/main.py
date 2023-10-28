from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")

mongo_url = "mongodb+srv://maximdolphin:Jerome2004@cluster0.c7dxu9a.mongodb.net/"
client = MongoClient(mongo_url)

db = client["nutriwise"]
collection = db["user"]

people = {}


@app.route("/", methods=["GET"])
def get_people():
    return jsonify(list(people.values())), 200


def serialize_doc(doc):
    doc["_id"] = str(doc["_id"])
    return doc


@app.route("/get-user/<email>", methods=["GET"])
def get_user(email):
    user_data = collection.find_one({"_id": email})
    if user_data:
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404


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
    return jsonify({"email": user_email, "password": user_password}), 200


@app.route("/get-users", methods=["GET"])
def get_users():
    users = collection.find({}, {"_id": 1, "password": 1})
    user_list = [{"email": user["_id"], "password": user["password"]} for user in users]
    return jsonify(user_list), 200


@app.route("/create-user-data", methods=["POST"])
def create_user_data():
    data = request.get_json()
    user_email = data.get("email")
    if not user_email:
        return jsonify({"error": "Please provide an email"}), 400

    user_age = data["age"]
    user_gender = data["gender"]
    user_height = data["height"]
    user_weight = data["weight"]
    user_activity_level = data["activity_level"]
    user_target_nutr_goal = data["target_nutr_goal"]
    user_target_cal_daily = data["target_cal_daily"]
    user_allergies = data["allergies"]
    user_dietary_preferences = data["dietary_preferences"]
    user_food_intolerances = data["food_intolerances"]
    user_health_conditions = data["health_conditions"]
    user_medications = data["medications"]
    user_breakfast = data["breakfast"]
    user_lunch = data["lunch"]
    user_dinner = data["dinner"]
    user_snacks = data["snacks"]
    user_daily_cal_consumed = data["daily_cal_consumed"]
    user_doc = {
        "_id": user_email,
        "age": user_age,
        "gender": user_gender,
        "height": user_height,
        "weight": user_weight,
        "activity_level": user_activity_level,
        "target_nutr_goal": user_target_nutr_goal,
        "target_cal_daily": user_target_cal_daily,
        "allergies": user_allergies,
        "dietary_preferences": user_dietary_preferences,
        "food_intolerances": user_food_intolerances,
        "health_conditions": user_health_conditions,
        "medications": user_medications,
        "breakfast": user_breakfast,
        "lunch": user_lunch,
        "dinner": user_dinner,
        "snacks": user_snacks,
        "daily_cal_consumed": user_daily_cal_consumed        
    }
    collection.insert_one(user_doc)
    return jsonify(user_doc), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
