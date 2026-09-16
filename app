from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

MENU = {
    "Pasta": 30,
    "Pizza": 40,
    "Burger": 50,
    "Sandwich": 60,
    "Fries": 70,
    "Coke": 40,
    "Coffee": 50,
    "Tea": 20
}

@app.route("/")
def home():
    return render_template("index.html", menu=MENU)

@app.route("/order", methods=["POST"])
def order():
    data = request.get_json()
    items = data.get("items", [])

    order_items = []
    total_amount = 0

    for item in items:
        name = item.get("name", "")
        quantity = int(item.get("quantity", 0))

        if name in MENU and quantity > 0:
            price = MENU[name]
            amount = price * quantity
            total_amount += amount

            order_items.append({
                "name": name,
                "quantity": quantity,
                "price": price,
                "amount": amount
            })

    return jsonify({
        "items": order_items,
        "total": total_amount
    })

if __name__ == "__main__":
    app.run(debug=True)
