const buttonHardWear = document.querySelector("#buttonHardWear");
const buttonProcessors = document.querySelector("#buttonProcessors");
const buttonGrapicCards = document.querySelector("#buttonGrapicCards");
const buttonMemory = document.querySelector("#buttonMemory");
const buttonMotherboards = document.querySelector("#buttonMotherboards");
const buttonStorage = document.querySelector("#buttonStorage");
const price = document.querySelector("#price");
const priceValue = document.querySelector("#priceValue");
const buttonEnthusiast = document.querySelector("#buttonEnthusiast");
const buttonProffesional = document.querySelector("#buttonProffesional");
const buttonStudio = document.querySelector("#buttonStudio");
const buttonElite = document.querySelector("#buttonElite");
const productAddToCartButton = document.querySelector("#productAddToCartButton");

if (buttonHardWear) {
    buttonHardWear.style.backgroundColor = "rgba(121, 82, 37, 0.50)";
    buttonHardWear.style.color = "rgb(255 157 47)";
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
        button.style.color = "#8a8a8a";
        button.style.borderColor = "#8a8a8a";
    });
}

function activateButton(button) {
    if (!button) {
        return;
    }

    resetButtons();

    button.style.backgroundColor = "rgba(121, 82, 37, 0.50)";
    button.style.color = "rgb(255 157 47)";
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
            #333 ${percent}%,
            #333 100%
        )`;
    });
}

if (buttonEnthusiast) {
    buttonEnthusiast.addEventListener("click", function() {
        buttonEnthusiast.classList.toggle("active");
    });
}

if (buttonProffesional) {
    buttonProffesional.addEventListener("click", function() {
        buttonProffesional.classList.toggle("active");
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

