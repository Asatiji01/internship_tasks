import{
fetchProducts,
addProduct,
deleteProduct
}
from "./api.js";

let products=[];
let filtered=[];

let currentPage=1;
let perPage=4;


document
.getElementById("search")
.addEventListener(
"input",
applyFilters
);

document
.getElementById("sort")
.addEventListener(
"change",
applyFilters
);



async function loadProducts(){

document
.getElementById("spinner")
.style.display=
"block";

document
.getElementById("error")
.style.display=
"none";


try{

products=
await fetchProducts();

applyFilters();

}

catch(err){

document
.getElementById("error")
.style.display=
"block";

console.log(err);

}

finally{

document
.getElementById("spinner")
.style.display=
"none";

}

}

loadProducts();




function applyFilters(){

let search=
document
.getElementById("search")
.value
.toLowerCase();

let sort=
document
.getElementById("sort")
.value;


filtered=
products.filter(
p=>

p.title
.toLowerCase()
.includes(search)

);


if(sort==="price-asc"){

filtered.sort(
(a,b)=>
a.price-b.price
)

}

else if(
sort==="price-desc"
){

filtered.sort(
(a,b)=>
b.price-a.price
)

}


currentPage=1;

displayProducts();

}



function displayProducts(){

let container=
document
.getElementById(
"products"
);

container.innerHTML="";


let start=
(currentPage-1)
*perPage;


let paginated=
filtered.slice(
start,
start+perPage
);


paginated.forEach(p=>{

container.innerHTML+=`

<div class="card">

<img src="${p.image}">

<h3>${p.title}</h3>

<p>
₹${p.price}
</p>

<button
onclick=
"addToCart(${p.id})"
>
Add to Cart
</button>


<button
onclick=
"handleDelete(${p.id})"
>
Delete
</button>

</div>

`;

});


document
.getElementById("page")
.innerText=
`Page ${currentPage}`;

}



async function handleDelete(id){

try{

await deleteProduct(id);

products=
products.filter(
p=>p.id!==id
);

applyFilters();

}

catch{

alert(
"Delete failed"
);

}

}



function nextPage(){

if(
(currentPage*perPage)
<
filtered.length
){

currentPage++;

displayProducts();

}

}



function prevPage(){

if(currentPage>1){

currentPage--;

displayProducts();

}

}



function addToCart(id){

let product=
products.find(
p=>p.id===id
);


let cart=
JSON.parse(
localStorage.getItem(
"cart"
)
)||[];



let index=
cart.findIndex(
item=>
item.id===id
);


if(index!==-1){

cart[index]
.qty+=1;

}

else{

cart.push({

...product,

qty:1

});

}


localStorage.setItem(
"cart",
JSON.stringify(cart)
);


alert(
"Added to cart!"
);

}



document
.getElementById(
"add-form"
)
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

let newProduct={

title:
document
.getElementById(
"title"
).value,

price:
Number(
document
.getElementById(
"price"
).value
),

image:
"https://picsum.photos/200"

};


try{

let created=
await addProduct(
newProduct
);

products.unshift(
created
);

applyFilters();

e.target.reset();

}

catch{

alert(
"Add failed"
)

}

}
);



window.addToCart=
addToCart;

window.handleDelete=
handleDelete;

window.nextPage=
nextPage;

window.prevPage=
prevPage;