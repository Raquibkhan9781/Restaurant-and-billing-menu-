let orders = [];

function addItem(name, price) {
    const existing = orders.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        orders.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    renderOrder();
}

function changeQuantity(name, change) {
    const item = orders.find(item => item.name === name);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        orders = orders.filter(item => item.name !== name);
    }

    renderOrder();
}

function removeItem(name) {
    orders = orders.filter(item => item.name !== name);
    renderOrder();
}

function renderOrder() {
    const body = document.getElementById("orderBody");
    const table = document.getElementById("orderTable");
    const empty = document.getElementById("emptyOrder");
    const totalElement = document.getElementById("totalAmount");
    const countElement = document.getElementById("cartCount");

    body.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    orders.forEach(item => {
        const amount = item.price * item.quantity;
        total += amount;
        itemCount += item.quantity;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td>
                <div class="qty-controls">
                    <button onclick="changeQuantity('${item.name}', -1)">−</button>
                    <strong>${item.quantity}</strong>
                    <button onclick="changeQuantity('${item.name}', 1)">+</button>
                </div>
            </td>
            <td>₹${item.price}</td>
            <td><strong>₹${amount}</strong></td>
            <td>
                <button class="remove-btn" onclick="removeItem('${item.name}')" title="Remove">🗑️</button>
            </td>
        `;

        body.appendChild(row);
    });

    totalElement.textContent = `₹${total}`;
    countElement.textContent = `${itemCount} ${itemCount === 1 ? "ITEM" : "ITEMS"}`;

    if (orders.length === 0) {
        table.style.display = "none";
        empty.style.display = "block";
    } else {
        table.style.display = "table";
        empty.style.display = "none";
    }
}

async function placeOrder() {
    if (orders.length === 0) {
        alert("Please add at least one item to your order.");
        return;
    }

    try {
        const response = await fetch("/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: orders })
        });

        const data = await response.json();

        alert(`ORDER PLACED SUCCESSFULLY!\n\nTotal Amount: ₹${data.total}`);
        clearOrder();
    } catch (error) {
        alert("Something went wrong. Please try again.");
    }
}

function clearOrder() {
    orders = [];
    renderOrder();
}

renderOrder();
