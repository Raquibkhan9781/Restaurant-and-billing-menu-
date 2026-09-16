from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

MENU = {
    "pasta": 30, "pizza": 80, "burger": 50, "sandwich": 60,
    "fries": 70, "coke": 40, "coffee": 50, "tea": 20
}

@app.route("/")
def home():
    return render_template("index.html", menu=MENU)

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json() or {}
    result, total = [], 0
    for item in data.get("items", []):
        name = str(item.get("name","")).lower().strip()
        qty = int(item.get("quantity", 0))
        if name in MENU and qty > 0:
            amount = MENU[name] * qty
            total += amount
            result.append({"name":name.title(),"quantity":qty,"price":MENU[name],"amount":amount})
    return jsonify({"items":result,"total":total})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
