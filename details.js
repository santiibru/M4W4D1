//Area risultati da appendere
const resultsArea = document.getElementById("row");
//Prendo l'id attivo
const paramObj = new URLSearchParams(window.location.search);
const myProductId = paramObj.get("pid");

window.onload = showProduct();

//Faccio una get passando l'id attivo
async function showProduct() {
    try {
        const res = await fetch("https://striveschool-api.herokuapp.com/api/product/" +myProductId, {
            headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ODAyNjljNDM3MDAwMTkzYzM1OGIiLCJpYXQiOjE3MDk3NTQ2MTcsImV4cCI6MTcxMDk2NDIxN30.u6_S0evWKhEMZiQAppDoy1TKhde2vg0vzoSRBfjYgXw"}
        });
        const json = await res.json();
        createTemplate(json);
    } catch (error) {
        console.log(error);
    }

}


//Creo il template
async function createTemplate({ name, brand, description, price, imageUrl }) {
    let colImg = document.createElement("div");
    colImg.classList.add("col-lg-5", "col-md-12");
    let colDesc = document.createElement("div");
    colDesc.classList.add("col-lg-7", "col-md-12", "text-product");
    let imageDetails = document.createElement("img");
    imageDetails.classList.add("image-details");
    imageDetails.src = imageUrl;
    imageDetails.setAttribute("alt", name + " image");
    let productName = document.createElement("h1");
    productName.classList.add("mt-5")
    productName.innerText = name;
    let productBrand = document.createElement("h4");
    productBrand.innerText = brand;
    let productStars = document.createElement("div")
    productStars.classList.add("ms-auto", "text-warning", "my-3");
    productStars.innerHTML = `<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>`;
    let productPrice = document.createElement("h4")
    productPrice.innerText = ("$ ") + price;
    let productDesc = document.createElement("h6");
    productDesc.classList.add("my-3", "text-desciption");
    productDesc.innerText = description;
    let buttons = document.createElement("div");
    buttons.classList.add("mt-4")
    let buyBtn = document.createElement("button");
    buyBtn.classList.add("btn", "btn-secondary", "px-5", "me-3", "action-btn");
    buyBtn.innerText = ("Buy now");
    let wishBtn = document.createElement("button");
    wishBtn.classList.add("btn", "btn-secondary", "px-5", "my-2","action-btn");
    wishBtn.innerText = ("Add to wishlist");

    resultsArea.appendChild(colImg);
    resultsArea.appendChild(colDesc);
    colImg.appendChild(imageDetails);
    colDesc.appendChild(productName);
    colDesc.appendChild(productBrand);
    colDesc.appendChild(productStars);
    colDesc.appendChild(productPrice);
    colDesc.appendChild(productDesc);
    colDesc.appendChild(buttons);
    buttons.appendChild(buyBtn);
    buttons.appendChild(wishBtn);
}


