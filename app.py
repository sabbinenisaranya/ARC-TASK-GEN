from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# =========================
# SAFETY KEYWORDS
# =========================

HIGH_RISK = [
    "help me",
    "please help",
    "i am in danger",
    "i'm in danger",
    "someone is attacking me",
    "someone is following me",
    "someone's following me",
    "it is following me",
    "it's following me",
    "they are following me",
    "i think someone is following me",
    "someone is behind me",
    "someone is chasing me",
    "i am being followed",
    "i'm being followed",
    "save me",
    "call the police",
    "call emergency",
    "emergency",
    "attack",
    "attacking",
    "danger"
]


MEDIUM_RISK = [
    "i feel unsafe",
    "i don't feel safe",
    "i am scared",
    "i'm scared",
    "i am afraid",
    "i'm afraid",
    "someone is suspicious",
    "something feels wrong",
    "i need help",
    "i feel uncomfortable",
    "i'm uncomfortable"
]


# =========================
# SAFETY ANALYSIS
# =========================

def analyze_safety(text):

    text = text.lower().strip()

    # HIGH RISK
    for phrase in HIGH_RISK:
        if phrase in text:
            return {
                "level": "HIGH",
                "message": "Possible immediate danger detected.",
                "action": "Move to a safe public place and contact emergency services if needed."
            }

    # MEDIUM RISK
    for phrase in MEDIUM_RISK:
        if phrase in text:
            return {
                "level": "MEDIUM",
                "message": "You may be in an unsafe situation.",
                "action": "Move toward other people or contact someone you trust."
            }

    # LOW RISK
    return {
        "level": "LOW",
        "message": "No immediate safety concern detected.",
        "action": "Stay aware of your surroundings."
    }


# =========================
# HOME PAGE
# =========================

@app.route("/")
def home():
    return "Voice Safety Assistant is running!"


# =========================
# ANALYZE VOICE TEXT
# =========================

@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No data received"
        }), 400

    text = data.get("text", "")

    if not text:
        return jsonify({
            "error": "No text received"
        }), 400

    result = analyze_safety(text)

    return jsonify(result)


# =========================
# START SERVER
# =========================

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )