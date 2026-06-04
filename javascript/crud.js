const API_URL = "http://localhost/FORGE-PC/api.php";

async function runQuery(sql) {
    const response = await fetch(API_URL + "?sql=" + encodeURIComponent(sql));
    const result = await response.json();

    if (result.success) {
        return result.data;
    } else {
        alert("SQL fout: " + result.error);
        return [];
    }
}

function waarde(id) {
    return document.getElementById(id).value;
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

function vulFormulier(product) {
    document.getElementById("productID").value = product.productID;
    document.getElementById("categorieID").value = product.categorieID;
    document.getElementById("merk").value = product.merk;
    document.getElementById("naam").value = product.naam;
    document.getElementById("prijs").value = product.prijs;
    document.getElementById("afbeelding").value = product.afbeelding;
    document.getElementById("korteInfo").value = product.korteInfo;
    document.getElementById("omschrijving").value = product.omschrijving;
    document.getElementById("tier").value = product.tier;
    document.getElementById("voorraad").value = product.voorraad;
}

async function laadProducten() {
    const producten = await runQuery("SELECT * FROM producten ORDER BY productID DESC");
    const tbody = document.getElementById("productenBody");

    tbody.innerHTML = "";

    producten.forEach(function(product) {
        const rij = document.createElement("tr");

        rij.innerHTML = `
            <td>${product.productID}</td>
            <td>${product.categorieID}</td>
            <td>${product.merk}</td>
            <td>${product.naam}</td>
            <td>${product.prijs}</td>
            <td>${product.afbeelding}</td>
            <td>${product.korteInfo}</td>
            <td>${product.omschrijving}</td>
            <td>${product.tier}</td>
            <td>${product.voorraad}</td>
        `;

        rij.addEventListener("click", function() {
            vulFormulier(product);
        });

        tbody.appendChild(rij);
    });
}

async function productToevoegen() {
    const sql = `
        INSERT INTO producten
        (categorieID, merk, naam, prijs, afbeelding, korteInfo, omschrijving, tier, voorraad)
        VALUES
        (
            ${sqlGetal(waarde("categorieID"))},
            ${sqlTekst(waarde("merk"))},
            ${sqlTekst(waarde("naam"))},
            ${sqlGetal(waarde("prijs"))},
            ${sqlTekst(waarde("afbeelding"))},
            ${sqlTekst(waarde("korteInfo"))},
            ${sqlTekst(waarde("omschrijving"))},
            ${sqlTekst(waarde("tier"))},
            ${sqlGetal(waarde("voorraad"))}
        )
    `;

    await runQuery(sql);
    await laadProducten();
    document.getElementById("productForm").reset();
}

async function productAanpassen() {
    const productID = waarde("productID");

    if (productID === "") {
        alert("Vul eerst een productID in.");
        return;
    }

    const sql = `
        UPDATE producten
        SET
            categorieID = ${sqlGetal(waarde("categorieID"))},
            merk = ${sqlTekst(waarde("merk"))},
            naam = ${sqlTekst(waarde("naam"))},
            prijs = ${sqlGetal(waarde("prijs"))},
            afbeelding = ${sqlTekst(waarde("afbeelding"))},
            korteInfo = ${sqlTekst(waarde("korteInfo"))},
            omschrijving = ${sqlTekst(waarde("omschrijving"))},
            tier = ${sqlTekst(waarde("tier"))},
            voorraad = ${sqlGetal(waarde("voorraad"))}
        WHERE productID = ${productID}
    `;

    await runQuery(sql);
    await laadProducten();
}

async function productVerwijderen() {
    const productID = waarde("productID");

    if (productID === "") {
        alert("Vul eerst een productID in.");
        return;
    }

    const sql = `DELETE FROM producten WHERE productID = ${productID}`;

    await runQuery(sql);
    await laadProducten();
    document.getElementById("productForm").reset();
}

document.getElementById("btnToevoegen").addEventListener("click", productToevoegen);
document.getElementById("btnAanpassen").addEventListener("click", productAanpassen);
document.getElementById("btnVerwijderen").addEventListener("click", productVerwijderen);

laadProducten();