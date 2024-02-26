//Area risultati da appendere
const resultsArea = document.getElementById("row");

//BEARER: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ODAyNjljNDM3MDAwMTkzYzM1OGIiLCJpYXQiOjE3MDg0NTQzNjUsImV4cCI6MTcwOTY2Mzk2NX0.TOQ5h4RvmPWCE62QGoprJHSsAyO6giYTAwOnUys_G-c

//Creo i vari post e gli inserisco sull'API con POSTMAN.


window.onload = getPosts()

//Faccio una get
async function getPosts() {
    try {
        const res = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
            headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ODAyNjljNDM3MDAwMTkzYzM1OGIiLCJpYXQiOjE3MDg0NTQzNjUsImV4cCI6MTcwOTY2Mzk2NX0.TOQ5h4RvmPWCE62QGoprJHSsAyO6giYTAwOnUys_G-c"}
        });
        const json = await res.json();
        json.forEach((element) => {
            createCards(element);
        });

    } catch (error) {
        console.log(error);
    }
}
//Creo le card e le mostro
function createCards({ _id, name, price, imageUrl }) {
    let cards = document.createElement("div");
    cards.classList.add("col-sm-6", "col-lg-3", "col-md-4", "my-3");
    let card = document.createElement("div");
    card.classList.add("card");
    let cardBtn = document.createElement("a");
    cardBtn.href = `details.html?pid=${_id}`;
    let cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.setAttribute("alt", name + " image");
    cardImage.src = imageUrl;
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let cardName = document.createElement("p");
    cardName.classList.add("card-text", "fw-bold");
    cardName.innerText = name;
    let cardPrice = document.createElement("p");
    cardPrice.classList.add("card-text");
    cardPrice.innerText = ("$") + price;
    
   
//Appendo i risultati
    resultsArea.appendChild(cards);
    cards.appendChild(card);
    card.appendChild(cardBtn);
    cardBtn.appendChild(cardImage);
    card.appendChild(cardBody);
    cardBody.appendChild(cardName);
    cardBody.appendChild(cardPrice);

}