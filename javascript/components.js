async function laadEersteProduct() {
    const producten = await runQuery("SELECT * FROM producten WHERE productID = 1");

    if (producten.length === 0) {
        return;
    }

    const product = producten[0];

    document.querySelector("#productLink1").href = `product.html?id=${product.productID}`;
    document.querySelector("#productImage1").src = product.afbeelding;
    document.querySelector("#productImage1").alt = product.naam;
    document.querySelector("#productName1").textContent = product.naam;

    document.querySelector("#productPrice1").textContent = Number(product.prijs).toLocaleString("nl-BE", {
        style: "currency",
        currency: "EUR"
    });
}

laadEersteProduct();