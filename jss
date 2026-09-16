let orders = [];

const orderList = document.getElementById("orderList");
const emptyMessage = document.getElementById("emptyMessage");
const totalAmount = document.getElementById("totalAmount");
const toast = document.getElementById("toast");

document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existing = orders.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            orders.push({ name, price, quantity: 1 });
        }

        renderOrder();
        showToast(`${name} added to order`);
    });
});

function renderOrder() {
    orderList.innerHTML = "";

    if (orders.length === 0) {
        emptyMessage.style.display = "block";
        totalAmount.textContent = "₹0";
        return;
    }

    emptyMessage.style.display = "none";

    let total = 0;

    orders.forEach((item, index) => {
        const amount = item.price * item.quantity;
        total += amount;

        const div = document.createElement("div");
        div.className = "order-item";

        div.innerHTML = `
            <div class="item-top">
                <span>${capitalize(item.name)}</span>
                <span>₹${amount}</span>
            </div>

            <div class="item-bottom">
                <div class="qty-box">
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <span>Qty: ${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>

                <button class="delete-btn" onclick="deleteItem(${index})" title="Delete">
                    🗑️
                </button>
            </div>
        `;

        orderList.appendChild(div);
    });

    totalAmount.textContent = `₹${total}`;
}

function changeQty(index, change) {
    orders[index].quantity += change;

    if (orders[index].quantity <= 0) {
        orders.splice(index, 1);
    }

    renderOrder();
}

function deleteItem(index) {
    const item = orders[index];
    orders.splice(index, 1);
    renderOrder();
    showToast(`${item.name} removed`);
}

document.getElementById("clearBtn").addEventListener("click", () => {
    orders = [];
    renderOrder();
    showToast("Order cleared");
});

document.getElementById("billBtn").addEventListener("click", async () => {
    if (orders.length === 0) {
        showToast("Please add an item first");
        return;
    }

    try {
        const response = await fetch("/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: orders })
        });

        const data = await response.json();

        let bill = "KTM RESTAURANT\\n";
        bill += "------------------------------\\n";

        data.items.forEach(item => {
            bill += `${item.name} x ${item.quantity} = ₹${item.amount}\\n`;
        });

        bill += "------------------------------\\n";
        bill += `TOTAL AMOUNT = ₹${data.total}`;

        alert(bill);
    } catch (error) {
        showToast("Unable to generate bill");
    }
});

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function showToast(message) {
    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 1500);
}

renderOrder();
