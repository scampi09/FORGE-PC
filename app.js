// app.js
// Hulpfuncties om met de API te praten.

// Het adres van onze PHP API.
// Pas dit aan als jouw map anders heet.
const API_URL = "http://localhost/FORGE-PC/api.php";

// Fallback data: wordt gebruikt als de database/API niet werkt,
// zodat de pagina toch iets toont.
const FALLBACK_PRODUCTEN = [
    {
        id: 1,
        productID: 1,
        categorie_id: 2,
        categorieID: 2,
        merk: "Forge Titanium",
        naam: "GeForce Titanium RTX 4090",
        prijs: 2577.99,
        afbeelding: "photos/rtx4090.jpg",
        korteInfo: "24GB GDDR6X - 450W TDP"
    },
    {
        id: 2,
        productID: 2,
        categorie_id: 2,
        categorieID: 2,
        merk: "Forge Titanium",
        naam: "GeForce Titanium RTX 4080 Super",
        prijs: 1199.99,
        afbeelding: "photos/rtx4090.jpg",
        korteInfo: "16GB GDDR6X - quiet cooling"
    },
    {
        id: 3,
        productID: 3,
        categorie_id: 1,
        categorieID: 1,
        merk: "Precision Core",
        naam: "Precision Core i9-14900K",
        prijs: 599.99,
        afbeelding: "photos/ChatGPT Image 10 mei 2026, 11_25_58.png",
        korteInfo: "24 cores - unlocked performance"
    },
    {
        id: 4,
        productID: 4,
        categorie_id: 1,
        categorieID: 1,
        merk: "Precision Core",
        naam: "Precision Core Ryzen 7 7800X3D",
        prijs: 379.99,
        afbeelding: "photos/ChatGPT Image 10 mei 2026, 11_25_58.png",
        korteInfo: "8 cores - 3D cache"
    },
    {
        id: 5,
        productID: 5,
        categorie_id: 3,
        categorieID: 3,
        merk: "Flux Engineering",
        naam: "Flux DDR5 32GB 6000MHz",
        prijs: 129.99,
        afbeelding: "photos/ChatGPT Image 10 mei 2026, 12_23_08.png",
        korteInfo: "32GB kit - low latency"
    },
    {
        id: 6,
        productID: 6,
        categorie_id: 4,
        categorieID: 4,
        merk: "Flux Engineering",
        naam: "Flux Z790 Creator Motherboard",
        prijs: 289.99,
        afbeelding: "photos/ChatGPT Image 10 mei 2026, 12_30_35.png",
        korteInfo: "Z790 - Wi-Fi - PCIe 5.0"
    },
    {
        id: 7,
        productID: 7,
        categorie_id: 5,
        categorieID: 5,
        merk: "Precision Core",
        naam: "Precision NVMe 2TB SSD",
        prijs: 149.99,
        afbeelding: "photos/ChatGPT Image 10 mei 2026, 12_23_08.png",
        korteInfo: "2TB - PCIe 4.0"
    }
];

// runQuery: stuurt een SQL-string naar de API en geeft het resultaat terug.
// Gebruik:  const rijen = await runQuery("SELECT * FROM product");
async function runQuery(sql) {
    const controller = new AbortController();
    const timeoutId = setTimeout(function () {
        controller.abort();
    }, 3000);

    try {
        // De SQL als parameter meesturen in de URL
        const response = await fetch(API_URL + "?sql=" + encodeURIComponent(sql), {
            signal: controller.signal
        });
        const result = await response.json();

        if (result.success) {
            return result.data;          // Array met rijen
        } else {
            console.error("SQL fout:", result.error);
            return FALLBACK_PRODUCTEN;   // Bij een fout: fallback data
        }
    } catch (fout) {
        // De API was niet bereikbaar (server uit, verkeerde URL, ...)
        console.error("API niet bereikbaar:", fout);
        return FALLBACK_PRODUCTEN;
    } finally {
        clearTimeout(timeoutId);
    }
}

// caching systeem + winkelwagen
const CART_KEY = "forgepc.cart";
const PRODUCTS_CACHE_KEY = "forgepc.products";
const CACHE_TIME_KEY = "forgepc.products.time";
const CACHE_MAX_AGE = 5 * 60 * 1000; // 5 minuten

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();

    const productId = Number(product.id);
    const existingItem = cart.find(item => Number(item.id) === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
}

function removeFromCart(id) {
    const cart = getCart().filter(item => Number(item.id) !== Number(id));
    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
}

function saveProductsCache(products) {
    localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(products));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
}

function getProductsCache() {
    const cachedProducts = localStorage.getItem(PRODUCTS_CACHE_KEY);
    const cachedTime = Number(localStorage.getItem(CACHE_TIME_KEY));

    if (!cachedProducts || !cachedTime) {
        return null;
    }

    const isExpired = Date.now() - cachedTime > CACHE_MAX_AGE;

    if (isExpired) {
        localStorage.removeItem(PRODUCTS_CACHE_KEY);
        localStorage.removeItem(CACHE_TIME_KEY);
        return null;
    }

    return JSON.parse(cachedProducts);
}
