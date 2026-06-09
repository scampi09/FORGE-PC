// We slaan de producten hier globaal op zodat filterProducten er ook bij kan
let alleProducten = []; 

function getProductValue(product, keys, fallback) {
    for (const key of keys) {
        if (product[key] !== undefined && product[key] !== null && product[key] !== "") {
            return product[key];
        }
    }
    return fallback;
}

function renderProductCards(producten) {
    const grid = document.querySelector("#productGrid");

    if (!grid) return;

    if (!Array.isArray(producten) || producten.length === 0) {
        grid.innerHTML = '<p class="productGridEmpty">Geen producten gevonden.</p>';
        return;
    }

    grid.innerHTML = producten.map(product => { 
        const productID = product.productID;
        const naam = product.naam;
        const prijs = product.prijs;
        const afbeelding = product.afbeelding;        
        const korteInfo = product.korteInfo;
        const merk = product.merk;
        const categorieID = product.categorieID; // Dit werkt nu omdat we het ophalen uit de SQL query

        return `
            <div class="productGridItem" data-categorie-id="${categorieID}">
                <a href="product.html?id=${productID}">
                    <div>
                        <img src="${afbeelding}" alt="${naam}">
                    </div>
                    <div>
                        <p class="productBrand">${merk}</p>
                        <h3>${naam}</h3>
                        <p class="productExtraInfo">${korteInfo}</p>
                        <hr>
                    </div>
                    <div class="productPrice">
                        <p>€ ${prijs}</p>
                        <img src="photos/add-to-cart.png" alt="add to shopping cart">
                    </div>
                </a>
            </div>
        `;
    }).join("");
}

const buttonProcessors = document.querySelector("#buttonProcessors");

const buttonHardWear = document.querySelector("#buttonHardWear");
const buttonProcessors = document.querySelector("#buttonProcessors");
const buttonGrapicCards = document.querySelector("#buttonGrapicCards");
const buttonMemory = document.querySelector("#buttonMemory");
const buttonMotherboards = document.querySelector("#buttonMotherboards");
const buttonStorage = document.querySelector("#buttonStorage");

let alleProducten = [];

async function laadProducten() {
    alleProducten = await runQuery(`
        SELECT 
            (prijs + ROUND(prijs * 0.21, 2)) AS prijs,
            productID,
            afbeelding,
            naam,
            merk,
            korteInfo,
            categorieID
        FROM producten
    `);

    renderProductCards(alleProducten);
    setupFilters();
}

function setupFilters() {
    buttonHardWear.addEventListener("click", () => {
        renderProductCards(alleProducten);
    });

    buttonProcessors.addEventListener("click", () => {
        filterOpCategorie(1);
    });

    buttonGrapicCards.addEventListener("click", () => {
        filterOpCategorie(2);
    });

    buttonMemory.addEventListener("click", () => {
        filterOpCategorie(3);
    });

    buttonMotherboards.addEventListener("click", () => {
        filterOpCategorie(4);
    });

    buttonStorage.addEventListener("click", () => {
        filterOpCategorie(5);
    });
}

function filterOpCategorie(categorieID) {
    const gefilterdeProducten = alleProducten.filter(product => {
        return Number(product.categorieID) === categorieID;
    });

    renderProductCards(gefilterdeProducten);
}

laadProducten();