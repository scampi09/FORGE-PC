
const buttonHardWear = document.querySelector("#buttonHardWear");
const buttonProcessors = document.querySelector("#buttonProcessors");
const buttonGrapicCards = document.querySelector("#buttonGrapicCards");
const buttonMemory = document.querySelector("#buttonMemory");
const buttonMotherboards = document.querySelector("#buttonMotherboards");
const buttonStorage = document.querySelector("#buttonStorage");
const price = document.querySelector("#price");
const priceValue = document.querySelector("#priceValue");
const buttonEnthusiast = document.querySelector("#buttonEnthusiast");
const buttonProfessional = document.querySelector("#buttonProfessional");
const buttonStudio = document.querySelector("#buttonStudio");
const buttonElite = document.querySelector("#buttonElite");
const productAddToCartButton = document.querySelector("#productAddToCartButton");

function getProductValue(product, keys, fallback) {
    for (const key of keys) {
        if (product[key] !== undefined && product[key] !== null && product[key] !== "") {
            return product[key];
        }
    }

    return fallback;
}

async function laadProductDetail() {
    const productImage = document.querySelector("#productImage");
    const productBrandExtra = document.querySelector("#productBrandExtra");
    const productTitle = document.querySelector("#productTitle");
    const productDescription = document.querySelector("#productDescription");
    const productPrice = document.querySelector("#productPrice");
    const productOldPrice = document.querySelector("#productOldPrice");
    const productStock = document.querySelector("#productStock");

    if (!productImage || !productBrandExtra || !productTitle || !productDescription || !productPrice || typeof runQuery !== "function") {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));

    if (Number.isNaN(productId) || productId <= 0) {
        return;
    }

    const producten = await runQuery(`SELECT round(prijs * 1.21,2) AS prijs, productID, afbeelding, naam, merk, korteInfo, omschrijving, categorieID FROM producten WHERE productID = ${productId} LIMIT 1`);

    if (!Array.isArray(producten) || producten.length === 0) {
        return;
    }

    const product = producten.find(item => Number(item.productID) === productId) || producten[0];
    const currentProduct = product;
    const naam = getProductValue(product, ["naam", "name"], "Onbekend product");
    const afbeelding = getProductValue(product, ["afbeelding", "image"], "photos/rtx4090.jpg");
    const merkWaarde = getProductValue(product, ["merkNaam", "merk", "brand"], "FORGE PC");
    const merk = typeof merkWaarde === "string" ? merkWaarde : "FORGE PC";
    const omschrijving = getProductValue(product, ["omschrijving", "description", "korteInfo", "korte_info"], productDescription.textContent.trim());
    const prijs = getProductValue(product, ["prijs", "price"], 0);
    const oudePrijs = getProductValue(product, ["oudePrijs", "oude_prijs", "oldPrice"], null);
    const status = getProductValue(product, ["status"], "");

    productImage.src = afbeelding;
    productImage.alt = naam;
    productBrandExtra.textContent = merk;
    productTitle.textContent = naam;
    productDescription.textContent = omschrijving;


    if (productOldPrice) {
        if (oudePrijs !== null && oudePrijs !== "") {
            productOldPrice.textContent = formatEuro(oudePrijs);
            productOldPrice.hidden = false;
        } else {
            productOldPrice.hidden = true;
        }
    }

    if (productStock) {
        productStock.textContent = status ? `\u2022  ${status}` : "";
    }

    document.title = `${naam} | FORGE PC`;
}

laadProductDetail();

if (buttonHardWear) {
    buttonHardWear.style.backgroundColor = "rgba(121, 82, 37, 0.50)";
    buttonHardWear.style.color = "rgb(255, 157, 47)";
    buttonHardWear.style.border = "1px solid rgba(255, 158, 47, 0.349)";
}

const allButtons = [
    buttonHardWear,
    buttonProcessors,
    buttonGrapicCards,
    buttonMemory,
    buttonMotherboards,
    buttonStorage
];

function resetButtons() {
    allButtons.forEach(button => {
        if (!button) {
            return;
        }

        button.style.backgroundColor = "rgb(19, 19, 19)";
        button.style.color = "rgb(138, 138, 138)";
        button.style.borderColor = "rgb(138, 138, 138)";
    });
}

function activateButton(button) {
    if (!button) {
        return;
    }

    resetButtons();

    button.style.backgroundColor = "rgba(121, 82, 37, 0.50)";
    button.style.color = "rgb(255, 157, 47)";
    button.style.border = "1px solid rgba(255, 158, 47, 0.349)";
}

if (buttonHardWear) {
    buttonHardWear.addEventListener("click", function() {
        activateButton(buttonHardWear);
    });
}

if (buttonProcessors) {
    buttonProcessors.addEventListener("click", function() {
        activateButton(buttonProcessors);
    });
}

if (buttonGrapicCards) {
    buttonGrapicCards.addEventListener("click", function() {
        activateButton(buttonGrapicCards);
    });
}

if (buttonMemory) {
    buttonMemory.addEventListener("click", function() {
        activateButton(buttonMemory);
    });
}

if (buttonMotherboards) {
    buttonMotherboards.addEventListener("click", function() {
        activateButton(buttonMotherboards);
    });
}

if (buttonStorage) {
    buttonStorage.addEventListener("click", function() {
        activateButton(buttonStorage);
    });
}

// PRICE SLIDER

if (price && priceValue) {
    price.addEventListener("input", function () {
        const value = Number(price.value);
        const max = Number(price.max);

        if (value === max) {
            priceValue.textContent = value.toLocaleString() + "+";
        } else {
            priceValue.textContent = value.toLocaleString();
        }

        const percent = (value / max) * 100;

        price.style.background = `linear-gradient(
            to right,
            rgb(255, 157, 47) 0%,
            rgb(255, 157, 47) ${percent}%,
            rgb(51, 51, 51) ${percent}%,
            rgb(51, 51, 51) 100%
        )`;
    });
}

if (buttonEnthusiast) {
    buttonEnthusiast.addEventListener("click", function() {
        buttonEnthusiast.classList.toggle("active");
    });
}

if (buttonProfessional) {
    buttonProfessional.addEventListener("click", function() {
        buttonProfessional.classList.toggle("active");
    });
}

if (buttonStudio) {
    buttonStudio.addEventListener("click", function() {
        buttonStudio.classList.toggle("active");
    });
}

if (buttonElite) {
    buttonElite.addEventListener("click", function() {
        buttonElite.classList.toggle("active");
    });
}


if (productAddToCartButton) {

    productAddToCartButton.addEventListener("mousedown", function() {
        productAddToCartButton.style.backgroundColor = "rgb(196, 109, 11)";
    });

    productAddToCartButton.addEventListener("mouseup", function() {
        productAddToCartButton.style.backgroundColor = "rgb(255, 157, 47)";
    });

    productAddToCartButton.addEventListener("mouseleave", function() {
        productAddToCartButton.style.backgroundColor = "rgb(255, 157, 47)";
    });
}
