const API_URL = "http://localhost/FORGE-PC/api.php";

async function runQuery(sql) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "sql=" + encodeURIComponent(sql)
    });

    const result = await response.json();

    if (result.success) {
        return result.data;
    }

    alert("SQL fout: " + result.error);
    return [];
}

function veldBestaat(id) {
    return document.getElementById(id) !== null;
}

function waarde(id) {
    const veld = document.getElementById(id);
    return veld ? veld.value : "";
}

function sqlTekst(tekst) {
    if (tekst === "") {
        return "NULL";
    }

    return "'" + tekst.replaceAll("'", "''") + "'";
}

function sqlGetal(getal) {
    if (getal === "") {
        return "NULL";
    }

    return getal;
}

function formulierVullen(product) {
    document.getElementById("productId").value = product.productID;
    document.getElementById("naam").value = product.naam;
    document.getElementById("prijs").value = product.prijs;
    document.getElementById("categorieId").value = product.categorieID;

    if (veldBestaat("merk")) {
        document.getElementById("merk").value = product.merk ?? "";
    }

    if (veldBestaat("afbeelding")) {
        document.getElementById("afbeelding").value = product.afbeelding ?? "";
    }

    if (veldBestaat("omschrijving")) {
        document.getElementById("omschrijving").value = product.omschrijving ?? "";
    }

    if (veldBestaat("tier")) {
        document.getElementById("tier").value = product.tier ?? "";
    }

    if (veldBestaat("korteInfo")) {
        document.getElementById("korteInfo").value = product.korteInfo ?? "";
    }

    if (veldBestaat("voorraad")) {
        document.getElementById("voorraad").value = product.voorraad ?? "";
    }
}

function formulierLeegmaken() {
    document.getElementById("productId").value = "";
    document.getElementById("naam").value = "";
    document.getElementById("prijs").value = "";
    document.getElementById("categorieId").value = "";

    if (veldBestaat("merk")) {
        document.getElementById("merk").value = "";
    }

    if (veldBestaat("afbeelding")) {
        document.getElementById("afbeelding").value = "";
    }

    if (veldBestaat("omschrijving")) {
        document.getElementById("omschrijving").value = "";
    }

    if (veldBestaat("tier")) {
        document.getElementById("tier").value = "";
    }

    if (veldBestaat("korteInfo")) {
        document.getElementById("korteInfo").value = "";
    }

    if (veldBestaat("voorraad")) {
        document.getElementById("voorraad").value = "";
    }
}

async function toonBeheerLijst() {
    const producten = await runQuery("SELECT * FROM producten ORDER BY productID DESC");
    const lijst = document.getElementById("productenLijst");

    lijst.innerHTML = "";

    for (const product of producten) {
        const item = document.createElement("li");

        item.textContent =
            product.productID + " - " +
            product.naam + " - " +
            product.prijs + " - categorie " +
            product.categorieID + " - " +
            (product.merk ?? "") + " - voorraad " +
            product.voorraad + " ";

        const bewerkKnop = document.createElement("button");
        bewerkKnop.textContent = "Bewerken";
        bewerkKnop.addEventListener("click", function() {
            formulierVullen(product);
        });

        const verwijderKnop = document.createElement("button");
        verwijderKnop.textContent = "Verwijderen";
        verwijderKnop.addEventListener("click", function() {
            productVerwijderen(product.productID);
        });

        item.appendChild(bewerkKnop);
        item.appendChild(verwijderKnop);
        lijst.appendChild(item);
    }
}

function maakInsertSql() {
    const kolommen = ["naam", "prijs", "categorieID"];
    const waarden = [
        sqlTekst(waarde("naam")),
        sqlGetal(waarde("prijs")),
        sqlGetal(waarde("categorieId"))
    ];

    if (veldBestaat("merk")) {
        kolommen.push("merk");
        waarden.push(sqlTekst(waarde("merk")));
    }

    if (veldBestaat("afbeelding")) {
        kolommen.push("afbeelding");
        waarden.push(sqlTekst(waarde("afbeelding")));
    }

    if (veldBestaat("omschrijving")) {
        kolommen.push("omschrijving");
        waarden.push(sqlTekst(waarde("omschrijving")));
    }

    if (veldBestaat("tier")) {
        kolommen.push("tier");
        waarden.push(sqlTekst(waarde("tier")));
    }

    if (veldBestaat("korteInfo")) {
        kolommen.push("korteInfo");
        waarden.push(sqlTekst(waarde("korteInfo")));
    }

    if (veldBestaat("voorraad")) {
        kolommen.push("voorraad");
        waarden.push(sqlGetal(waarde("voorraad")));
    }

    return "INSERT INTO producten (" + kolommen.join(", ") + ") VALUES (" + waarden.join(", ") + ")";
}

function maakUpdateSql(productId) {
    const updates = [
        "naam = " + sqlTekst(waarde("naam")),
        "prijs = " + sqlGetal(waarde("prijs")),
        "categorieID = " + sqlGetal(waarde("categorieId"))
    ];

    if (veldBestaat("merk")) {
        updates.push("merk = " + sqlTekst(waarde("merk")));
    }

    if (veldBestaat("afbeelding")) {
        updates.push("afbeelding = " + sqlTekst(waarde("afbeelding")));
    }

    if (veldBestaat("omschrijving")) {
        updates.push("omschrijving = " + sqlTekst(waarde("omschrijving")));
    }

    if (veldBestaat("tier")) {
        updates.push("tier = " + sqlTekst(waarde("tier")));
    }

    if (veldBestaat("korteInfo")) {
        updates.push("korteInfo = " + sqlTekst(waarde("korteInfo")));
    }

    if (veldBestaat("voorraad")) {
        updates.push("voorraad = " + sqlGetal(waarde("voorraad")));
    }

    return "UPDATE producten SET " + updates.join(", ") + " WHERE productID = " + productId;
}

async function productOpslaan() {
    const productId = waarde("productId");

    if (waarde("naam") === "" || waarde("prijs") === "" || waarde("categorieId") === "") {
        alert("Vul naam, prijs en categorie-id in.");
        return;
    }

    if (productId === "") {
        await runQuery(maakInsertSql());
    } else {
        await runQuery(maakUpdateSql(productId));
    }

    formulierLeegmaken();
    alert("Product opgeslagen.");
}

async function productVerwijderen(productId) {
    if (productId === "") {
        alert("Vul eerst een product-id in.");
        return;
    }

    const zeker = confirm("Weet je zeker dat je dit product wilt verwijderen?");

    if (!zeker) {
        return;
    }

    await runQuery("DELETE FROM producten WHERE productID = " + productId);
    formulierLeegmaken();
    alert("Product verwijderd.");
}
