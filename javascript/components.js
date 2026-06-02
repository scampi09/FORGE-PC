
function renderProductCards(producten)  { // (producten) is gewoon mijn database array
    const grid = document.querySelector("#productGrid"); // hier maak hij een var grid aan die gelijk is aan het id productGrid in html

    if (!grid) {
        return;
    } // extra beveiliging als mijn grid (id productgrid) niet bestaat stop

    if (!Array.isArray(producten) || producten.length === 0) {
        grid.innerHTML = "<p>Geen producten gevonden.</p>";
        return;
    } // nog is extra beveilig 
      // als mijn array niet bestaat OF mijn array is leeg dan return
      // als dit allebij juist is dan print hij "geen producten gevonden"

    grid.innerHTML = producten.map(product => { // idt stuk code gaat over elk product in mijn database dusals ik 10 producten heb gaat deze code 10 keer uitgeveort worden
        const productID = product.productID;
        const naam = product.naam;
        const prijs = product.prijs;
        const afbeelding = product.afbeelding;
        const korteInfo = product.korteInfo;
        const merk = product.merk;
        const categorieID = product.categorieID;
        const omschrijving = product.omschrijving;
        const tier = product.tier;
        const voorraad = product.voorraad;

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
                        <p>${formatEuro(prijs)}</p>
                        <img src="photos/add-to-cart.png" alt="add to shopping cart">

                    </div>
                </a>
            </div>
        `;
    }).join("");
}


            // <div class="productGridItem"><a href="product.html">
            //         <div>
            //             <img src="photos/rtx4090.jpg" alt="RTX 4090">
            //         </div>
            //         <div>
            //             <p class="productBrand">forge TITANIUM</p>
            //             <h3> GeFofrce RTX 4090</h3>
            //             <p class="productExtraInfo">24g ddrGx **  450W DPT</p>
            //             <hr>
            //         </div>
            //         <div class="productPrice">
            //             <p>&#8364;2,577.99</p>
            //             <a href="#"><img src="photos/add-to-cart.png" alt="add to shopping cart"></a>
            //         </div>    
            //         </a>
            //     </div>

async function laadProducten() {
    const producten = await runQuery
    ("SELECT * FROM producten ORDER BY prijs DESC");
    renderProductCards(producten);
}

laadProducten();


