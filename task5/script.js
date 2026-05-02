let products = [];
let filtered = [];
let currentPage = 1;
let perPage = 4;

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    applyFilters();
  });

document.getElementById("search").addEventListener("input", applyFilters);
document.getElementById("category").addEventListener("change", applyFilters);
document.getElementById("sort").addEventListener("change", applyFilters);

function applyFilters() {
  let search = document.getElementById("search").value.toLowerCase();
  let category = document.getElementById("category").value;
  let sort = document.getElementById("sort").value;

  filtered = products.filter(p =>
    p.title.toLowerCase().includes(search)
  );

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  currentPage = 1;
  displayProducts();
}

function displayProducts() {
  let container = document.getElementById("products");
  container.innerHTML = "";

  let start = (currentPage - 1) * perPage;
  let paginated = filtered.slice(start, start + perPage);

  paginated.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.title}</h3>
        <p>₹${p.price}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
      </div>
    `;
  });

  document.getElementById("page").innerText = `Page ${currentPage}`;
}

function nextPage() {
  if ((currentPage * perPage) < filtered.length) {
    currentPage++;
    displayProducts();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let index = cart.findIndex(item => item.id === product.id);

  if (index !== -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}