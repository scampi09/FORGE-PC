// We slaan de producten hier globaal op zodat filterProducten er ook bij kan
let alleProducten = []; 
let huidigeCategorieID = null;

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
        const categorieID = product.categorieID;

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



function pasFiltersToe() {
    // 1. Haal alle filterwaarden op
    const maxPrijs = Number(document.querySelector("#price")?.value) || 5000;
    
    // Geselecteerde merken
    const geselecteerdeMerken = Array.from(document.querySelectorAll(".brand-checkbox:checked"))
        .map(cb => cb.value.toLowerCase());
    
    // Geselecteerde tiers (knoppen met class 'active')
    const geselecteerdeTiers = Array.from(document.querySelectorAll(".gridItemButton.active"))
        .map(btn => btn.textContent.trim().toLowerCase());

    // 2. Filter de lijst
    const gefilterdeProducten = alleProducten.filter(product => {
        // Categorie filter
        if (huidigeCategorieID !== null && Number(product.categorieID) !== huidigeCategorieID) {
            return false;
        }

        // Prijs filter
        if (Number(product.prijs) > maxPrijs) {
            return false;
        }

        // Merk filter (als er merken zijn geselecteerd)
        if (geselecteerdeMerken.length > 0) {
            const productMerk = (product.merk || "").toLowerCase();
            if (!geselecteerdeMerken.includes(productMerk)) {
                return false;
            }
        }

        // Tier filter (als er tiers zijn geselecteerd)
        if (geselecteerdeTiers.length > 0) {
            const productTier = (product.tier || "").toLowerCase();
            if (!geselecteerdeTiers.includes(productTier)) {
                return false;
            }
        }

        return true;
    });

    // 3. Render de resultaten
    renderProductCards(gefilterdeProducten);
}

async function laadProducten() {
    const cachedProducts = getProductsCache();

    if (cachedProducts) {
        alleProducten = cachedProducts;
        renderProductCards(alleProducten);
        setupFilters();
        return;
    }

    alleProducten = await runQuery("SELECT round(prijs * 1.21,2) AS prijs, productID, afbeelding, naam, merk, korteInfo, categorieID, tier, omschrijving FROM producten");

    saveProductsCache(alleProducten);
    renderProductCards(alleProducten);
    setupFilters();
}

function setupFilters() {
    // Categorie knoppen
    const categoryFilters = [
        { button: document.querySelector("#buttonHardWear"), categorieID: null },
        { button: document.querySelector("#buttonProcessors"), categorieID: 1 },
        { button: document.querySelector("#buttonGrapicCards"), categorieID: 2 },
        { button: document.querySelector("#buttonMemory"), categorieID: 3 },
        { button: document.querySelector("#buttonMotherboards"), categorieID: 4 },
        { button: document.querySelector("#buttonStorage"), categorieID: 5 }
    ];

    categoryFilters.forEach(filter => {
        if (filter.button) {
            filter.button.addEventListener("click", function () {
                huidigeCategorieID = filter.categorieID;
                pasFiltersToe();
            });
        }
    });

    // Prijs slider
    const priceSlider = document.querySelector("#price");
    if (priceSlider) {
        priceSlider.addEventListener("input", pasFiltersToe);
    }

    // Merk checkboxes
    const brandCheckboxes = document.querySelectorAll(".brand-checkbox");
    brandCheckboxes.forEach(cb => {
        cb.addEventListener("change", pasFiltersToe);
    });

    // Tier knoppen
    const tierButtons = document.querySelectorAll(".gridItemButton");
    tierButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            // De 'active' class wordt getoggled in script.js, 
            // we wachten heel even zodat de class erop staat voor we filteren.
            setTimeout(pasFiltersToe, 10);
        });
    });
}

laadProducten();


async function searchProduct() {
    const searchTerm = document.querySelector("#searchbar")
    
    const queryforsearching = `SELECT round(prijs * 1.21,2) AS prijs, productID, afbeelding, naam, merk, korteInfo, categorieID, tier, omschrijving FROM producten WHERE naam LIKE '%{searchTerm}%'`;

    const runsearchfunction = await runQuery(sql)

    renderProductCards(runsearchfunction);
}

document.querySelector("#searchbar").addEventListener("input", searchProduct);