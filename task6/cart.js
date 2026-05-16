let cart = JSON.parse(localStorage.getItem("cart")) || [];
let container = document.getElementById("cart");
let total = 0;

cart.forEach(item => {
  total += item.price * item.qty;

  container.innerHTML += `
    <div class="card">
      <h3>${item.title}</h3>
      <p>₹${item.price} x ${item.qty}</p>
      <button onclick="removeItem(${item.id})">Remove</button>
    </div>
  `;
});

document.getElementById("total").innerText = "Total: ₹" + total;

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}