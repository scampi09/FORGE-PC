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

    if (!grid) {
        return;
    }

    if (!Array.isArray(producten) || producten.length === 0) {
        grid.innerHTML = "<p class=\"productGridEmpty\">Geen producten gevonden.</p>";
        return;
    }

    grid.innerHTML = producten.map(product => { 
        const productID = product.productID;
        const naam = product.naam
        const prijs = product.prijs
        const afbeelding = product.afbeelding        
        const korteInfo = product.korteInfo
        const merk = product.merk
        const categorieID = product.categorieID

        return `
            <div class="productGridItem" data-categorie-id="${categorieID}">
                <a href="product.html?id=${(productID)}">
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
                        <p>${(prijs)}</p>
                        <img src="photos/add-to-cart.png" alt="add to shopping cart">
                    </div>
                </a>
            </div>
        `;
    }).join("");
}

async function laadProducten() {
    const producten = await runQuery("SELECT ROUND(prijs * 0.21, 2) AS prijs, productID, afbeelding, naam, merk, korteInfo FROM producten ");
    renderProductCards(producten);
}

laadProducten();
