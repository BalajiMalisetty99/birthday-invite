from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

RSVP_FILE = "rsvp_data.json"

# Ensure RSVP file exists
if not os.path.exists(RSVP_FILE):
    with open(RSVP_FILE, "w") as f:
        json.dump([], f)  # Initialize with empty list

@app.route("/rsvp", methods=["POST"])
def save_rsvp():
    data = request.json
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"message": "Missing fields"}), 400

    with open(RSVP_FILE, "r") as f:
        rsvps = json.load(f)

    rsvps.append({"name": name, "email": email})

    with open(RSVP_FILE, "w") as f:
        json.dump(rsvps, f, indent=4)

    return jsonify({"message": "RSVP saved!"}), 200

@app.route("/rsvp-list", methods=["GET"])
def get_rsvp_list():
    with open(RSVP_FILE, "r") as f:
        rsvps = json.load(f)
    return jsonify(rsvps)

if __name__ == "__main__":
    app.run(debug=True)
