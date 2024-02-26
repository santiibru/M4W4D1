//Variabili globali
const resultsArea = document.getElementById("results-area");
const creationArea = document.getElementById("creation-area");

const addName = document.getElementById("add-name");
const addBrand = document.getElementById("add-brand");
const addDesc = document.getElementById("add-desc");
const addImage = document.getElementById("add-image");
const addPrice = document.getElementById("add-price");

const addDiv = document.getElementById("add-div");
const updateDiv = document.getElementById("update-div");
const updateBtn = document.getElementById("update-btn");


const alertMsg = document.getElementById("alert");
const alertDelete = document.getElementById("alert-delete");
const alertAdd = document.getElementById("alert-add");
const alertEdit = document.getElementById("alert-edit");

window.onload = getTable()


//Faccio una get per ottenere i risultati
async function getTable() {
    resultsArea.innerHTML = "";
    addName.value = "";
    addBrand.value = "";
    addDesc.value = "";
    addImage.value = "";
    addPrice.value = "";
    try {
        const res = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
            headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ODAyNjljNDM3MDAwMTkzYzM1OGIiLCJpYXQiOjE3MDg0NTQzNjUsImV4cCI6MTcwOTY2Mzk2NX0.TOQ5h4RvmPWCE62QGoprJHSsAyO6giYTAwOnUys_G-c" }
        });
        const json = await res.json();
        json.forEach((post) => {
            createTable(post);
        });

    } catch (error) {
        console.log(error);
    }
}
//Creo la table
function createTable({ _id, name, brand, description, imageUrl, price }) {
    let tableRow = document.createElement("tr");
    let rowName = document.createElement("th");
    rowName.innerText = name;
    let rowBrand = document.createElement("th");
    rowBrand.innerText = brand;
    let rowDesc = document.createElement("td");
    rowDesc.innerText = description;
    rowDesc.style.maxWidth = ("250px")
    let rowImage = document.createElement("td");
    rowImage.innerText = imageUrl;
    rowImage.style.overflow = "scroll"
    rowImage.style.maxWidth = ("300px");
    let rowPrice = document.createElement("td");
    rowPrice.innerText = price;
    let rowButtons = document.createElement("td");

    //Tasto di modifica
    let editBtn = document.createElement("a");
    editBtn.classList.add("btn", "btn-primary", "my-2");
    let editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pencil");
    let editText = document.createElement("span");
    editText.classList.add("ms-1");
    editText.innerText = "Edit";
    editBtn.addEventListener("click", () => {
        editProduct(_id, name, brand, description, imageUrl, price);
    });

    editBtn.appendChild(editIcon);
    editBtn.appendChild(editText);

    // Tasto di cancellazione
    let delBtn = document.createElement("a");
    delBtn.classList.add("btn", "btn-danger", "my-2", "ms-1");
    let delIcon = document.createElement("i");
    delIcon.classList.add("fa-solid", "fa-trash");
    let delText = document.createElement("span");
    delText.classList.add("ms-1");
    delText.innerText = "Delete";
    delBtn.addEventListener("click", () => {
        deleteProduct(_id);
    });

    delBtn.appendChild(delIcon);
    delBtn.appendChild(delText);

    rowButtons.appendChild(editBtn);
    rowButtons.appendChild(delBtn);

    tableRow.appendChild(rowName);
    tableRow.appendChild(rowBrand);
    tableRow.appendChild(rowDesc);
    tableRow.appendChild(rowImage);
    tableRow.appendChild(rowPrice);
    tableRow.appendChild(rowButtons);

    resultsArea.appendChild(tableRow);

}
//Funzione per fare il post
async function addProduct() {

    if(addName.value && addBrand.value && addDesc.value && addImage.value && addPrice.value) {
    let newProduct = { "name": addName.value, "brand": addBrand.value, "description": addDesc.value, "imageUrl": addImage.value, "price": addPrice.value };
        try {
            const results = await fetch("https://striveschool-api.herokuapp.com/api/product/", { method: "POST", body: JSON.stringify(newProduct), headers: { "Content-type": "application/json;charset=UTF-8", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ODAyNjljNDM3MDAwMTkzYzM1OGIiLCJpYXQiOjE3MDg0NTQzNjUsImV4cCI6MTcwOTY2Mzk2NX0.TOQ5h4RvmPWCE62QGoprJHSsAyO6giYTAwOnUys_G-c" } }); 
            alertAdd.classList.toggle("d-none");
            setTimeout(() => {
                alertAdd.classList.toggle("d-none");
                }, 8000);
            getTable();
        } catch(error) {
            console.log(error);
        }
    } else {
        alertMsg.classList.toggle("d-none");
        console.log("You must specify all fields!");
        setTimeout(() => {
            alertMsg.classList.toggle("d-none");
        }, 8000);
    }
}


//Funzione per riempire gli input con i valori da modificare
async function editProduct(_id, name, brand, description, imageUrl, price) {

    updateDiv.classList.remove("d-none");
    addDiv.classList.add("d-none");
    addName.focus();
    addName.value = name;
    addBrand.value = brand;
    addDesc.value = description;
    addImage.value = imageUrl;
    addPrice.value = price;
    
    updateBtn.addEventListener("click", () => {
        updateProduct(_id)
    })
}

//Funzione per fare la put
async function updateProduct(_id) {
    if (addName.value && addBrand.value && addDesc.value && addImage.value && addPrice.value) {
        try {
            let myProduct = { "name": addName.value, "brand": addBrand.value, "description": addDesc.value, "imageUrl": addImage.value, "price": addPrice.value };
            const res = await fetch("https://striveschool-api.herokuapp.com/api/product/" + _id, { method: "PUT", "body": JSON.stringify(myProduct), headers: { "Content-type": "application/json;charset=UTF-8", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ODAyNjljNDM3MDAwMTkzYzM1OGIiLCJpYXQiOjE3MDg0NTQzNjUsImV4cCI6MTcwOTY2Mzk2NX0.TOQ5h4RvmPWCE62QGoprJHSsAyO6giYTAwOnUys_G-c" } });
            updateDiv.classList.add("d-none")
            addDiv.classList.remove("d-none");
            alertEdit.classList.toggle("d-none");
            setTimeout(() => {
                alertEdit.classList.toggle("d-none");
            }, 8000);
            getTable();
        } catch (err) {
            console.log(err);
        }
        } else {
            alertMsg.classList.toggle("d-none");
        console.log("You must specify all fields!");
        setTimeout(() => {
            alertMsg.classList.toggle("d-none");
        }, 8000);
    }
    
}

//Funzione per fare il delete
async function deleteProduct(pid) {
    const result = await fetch("https://striveschool-api.herokuapp.com/api/product/" +pid, { method: "DELETE", headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ODAyNjljNDM3MDAwMTkzYzM1OGIiLCJpYXQiOjE3MDg0NTQzNjUsImV4cCI6MTcwOTY2Mzk2NX0.TOQ5h4RvmPWCE62QGoprJHSsAyO6giYTAwOnUys_G-c" }});
    alertDelete.classList.toggle("d-none");
    setTimeout(() => {
        alertDelete.classList.toggle("d-none");
        }, 8000);

    getTable();
}