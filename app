from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

MENU = {
    "pasta": 30,
    "pizza": 40,
    "burger": 50,
    "sandwich": 60,
    "fries": 70,
    "coke": 40,
    "coffee": 50,
    "tea": 20
}

@app.route("/")
def home():
    return render_template("index.html", menu=MENU)

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json(silent=True) or {}
    items = data.get("items", [])

    result = []
    total = 0

    for item in items:
        name = str(item.get("name", "")).lower().strip()
        try:
            quantity = int(item.get("quantity", 1))
        except (TypeError, ValueError):
            quantity = 1

        if name in MENU and quantity > 0:
            amount = MENU[name] * quantity
            total += amount
            result.append({
                "name": name.title(),
                "quantity": quantity,
                "price": MENU[name],
                "amount": amount
            })

    return jsonify({"items": result, "total": total})

if __name__ == "__main__":
    app.run(debug=True)
