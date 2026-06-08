// crud.js
// De CRUD-operaties voor producten: Create, Read, Update, Delete.
// Heeft app.js nodig (voor runQuery).
//
// LET OP: we plakken hier waarden rechtstreeks in de SQL-string.
// Dat is simpel om te leren, maar onveilig (SQL injection).
// In de echte cursus gebruik je hiervoor prepared statements.

// --- READ: alle producten tonen in de lijst ---
async function toonBeheerLijst() {
    const producten = await runQuery("SELECT productID, naam, prijs, categorieID, afbeelding, omschrijving, tier, korteInfo, voorraad, merk FROM producten");

    const lijst = document.getElementById("productenLijst");
    lijst.innerHTML = "";   // Eerst leegmaken
    for (const product of producten) {
        const item = document.createElement("li");

        // Tekst van het product
        const tekst = document.createTextNode(
            product.naam + " - \u20ac" + product.prijs + " "
        );
        item.appendChild(tekst);

        // Knop: bewerken -> zet het product in het formulier
        const bewerkKnop = document.createElement("button");
        bewerkKnop.textContent = "Bewerken";
        bewerkKnop.addEventListener("click", function () {
            formulierVullen(product);
        });
        item.appendChild(bewerkKnop);

        // Knop: verwijderen
        const verwijderKnop = document.createElement("button");
        verwijderKnop.textContent = "Verwijderen";
        verwijderKnop.addEventListener("click", function () {
            productVerwijderen(product.id);
        });
        item.appendChild(verwijderKnop);

        lijst.appendChild(item);
    }
}

// --- Formulier vullen met een bestaand product (voor bewerken) ---
function formulierVullen(product) {
    document.getElementById("productId").value = product.productid;
    document.getElementById("naam").value = product.naam;
    document.getElementById("prijs").value = product.prijs;
    document.getElementById("categorieId").value = product.categorie_id;
    document.getElementById("afbeelding").value = product.afbeelding;
    document.getElementById("omschrijving").value = product.omschrijving;
    document.getElementById("tier").value = product.tier;
    document.getElementById("korteInfo").value = product.korteInfo;
    document.getElementById("voorraad").value = product.voorraad;
    document.getElementById("merk").value = product.merk;
}

// --- Formulier leegmaken (na opslaan of bij annuleren) ---
function formulierLeegmaken() {
    document.getElementById("productId").value = "";
    document.getElementById("naam").value = "";
    document.getElementById("prijs").value = "";
    document.getElementById("categorieId").value = "";
    document.getElementById("afbeelding").value = "";
    document.getElementById("omschrijving").value = "";
    document.getElementById("tier").value = "";
    document.getElementById("korteInfo").value = "";
    document.getElementById("voorraad").value = "";
    document.getElementById("merk").value = "";
}

// --- CREATE of UPDATE: opslaan ---
// Is het verborgen id leeg -> nieuw product (INSERT).
// Staat er een id -> bestaand product (UPDATE).
async function productOpslaan() {
    const id = document.getElementById("productId").value;
    const naam = document.getElementById("naam").value;
    const prijs = document.getElementById("prijs").value;
    const categorieId = document.getElementById("categorieId").value;
    const afbeelding = document.getElementById("afbeelding").value;
    const omschrijving = document.getElementById("omschrijving").value;
    const tier = document.getElementById("tier").value;
    const korteInfo = document.getElementById("korteInfo").value;
    const voorraad = document.getElementById("voorraad").value;
    const merk = document.getElementById("merk").value;

    let sql;

    if (id === "") {
        // CREATE: nieuw product toevoegen
        sql = "INSERT INTO producten (naam, prijs, categorieID, afbeelding, omschrijving, tier, korteInfo, voorraad, merk) " +
              "VALUES ('" + naam + "', " + prijs + ", " + categorieId + ", '" + afbeelding + "', '" + omschrijving + "', '" + tier + "', '" + korteInfo + "', " + voorraad + ", '" + merk + "')";
    } else {
        // UPDATE: bestaand product wijzigen
        sql = "UPDATE producten SET " +
              "naam = '" + naam + "', " +
              "prijs = " + prijs + ", " +
              "categorieID = " + categorieId + ", " +
              "afbeelding = '" + afbeelding + "', " +
              "omschrijving = '" + omschrijving + "', " +
              "tier = '" + tier + "', " +
              "korteInfo = '" + korteInfo + "', " +
              "voorraad = " + voorraad + ", " +
              "merk = '" + merk + "' " +
              "WHERE productid = " + id;
    }

    await runQuery(sql);

    // Formulier leegmaken en lijst opnieuw laden
    formulierLeegmaken();
    toonBeheerLijst();
}

// --- DELETE: verwijderen ---
async function productVerwijderen(id) {
    // Vraag eerst om bevestiging
    const zeker = confirm("Weet je zeker dat je dit product wilt verwijderen?");
    if (!zeker) {
        return;
    }

    await runQuery("DELETE FROM producten WHERE productid = " + id);

    // Lijst opnieuw laden
    toonBeheerLijst();
}
