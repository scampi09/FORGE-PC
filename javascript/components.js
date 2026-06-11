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
async function laadProducten() {
    const cachedProducts = getProductsCache();

    if (cachedProducts) {
        alleProducten = cachedProducts;
        renderProductCards(alleProducten);
        setupFilters();
        return;
    }

    alleProducten = await runQuery("SELECT round(prijs * 1.21,2) AS prijs, productID, afbeelding, naam, merk, korteInfo, categorieID FROM producten");

    saveProductsCache(alleProducten);
    renderProductCards(alleProducten);
    setupFilters();
}

function setupFilters() {
    const filters = [
        { button: document.querySelector("#buttonHardWear"), categorieID: null },
        { button: document.querySelector("#buttonProcessors"), categorieID: 1 },
        { button: document.querySelector("#buttonGrapicCards"), categorieID: 2 },
        { button: document.querySelector("#buttonMemory"), categorieID: 3 },
        { button: document.querySelector("#buttonMotherboards"), categorieID: 4 },
        { button: document.querySelector("#buttonStorage"), categorieID: 5 }
    ];

    filters.forEach(filter => {
        if (!filter.button) {
            return;
        }

        filter.button.addEventListener("click", function () {
            if (filter.categorieID === null) {
                renderProductCards(alleProducten);
                return;
            }

            const gefilterdeProducten = alleProducten.filter(product => {
                return Number(product.categorieID) === filter.categorieID;
            });

            renderProductCards(gefilterdeProducten);
        });
    });
}

laadProducten();
