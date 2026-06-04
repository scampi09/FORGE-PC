function getProductValue(product, keys, fallback) {
    for (const key of keys) {
        if (product[key] !== undefined && product[key] !== null && product[key] !== "") {
            return product[key];
        }
    }

    return fallback;
}

function formatEuro(value) {
    const number = Number(value);

    if (Number.isNaN(number)) {
        return "\u20AC0,00";
    }

    return number.toLocaleString("nl-BE", {
        style: "currency",
        currency: "EUR"
    });
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
        const productID = getProductValue(product, ["productID", "id"], "");
        const naam = getProductValue(product, ["naam", "name"], "Onbekend product");
        const prijs = getProductValue(product, ["prijs", "price"], 0);
        const afbeelding = getProductValue(product, ["afbeelding", "image"], "photos/rtx4090.jpg");
        const korteInfo = getProductValue(product, ["korteInfo", "korte_info", "korteinfo", "omschrijving", "description"], "");
        const merkWaarde = getProductValue(product, ["merkNaam", "merk", "brand"], "FORGE PC");
        const merk = typeof merkWaarde === "string" ? merkWaarde : "FORGE PC";
        const categorieID = getProductValue(product, ["categorieID", "categorie_id"], "");

        return `
            <div class="productGridItem" data-categorie-id="${categorieID}">
                <a href="product.html?id=${encodeURIComponent(productID)}">
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
                        <p>${formatEuro(prijs)}</p>
                        <img src="photos/add-to-cart.png" alt="add to shopping cart">
                    </div>
                </a>
            </div>
        `;
    }).join("");
}

async function laadProducten() {
    const producten = await runQuery("SELECT * FROM producten ORDER BY naam ASC");
    renderProductCards(producten);
}

laadProducten();
