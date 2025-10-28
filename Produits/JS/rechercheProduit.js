alert("ok");
// ----------- Recherche de produits -----------
const produitsContainer = document.getElementById("produits-container");
const resultatsSection = document.getElementById("resultats-section");
const resultatsContainer = document.getElementById("resultats-container");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Récupération des produits
const produits = JSON.parse(localStorage.getItem("produits")) || [];

// Fonction d’affichage des produits (principaux)
function afficherProduits(liste) {
  produitsContainer.innerHTML = "";
  if (liste.length === 0) {
    produitsContainer.innerHTML = `<p style="text-align:center;margin-top:20px;">Aucun produit disponible.</p>`;
    return;
  }

  liste.forEach(produit => {
    const produitDiv = document.createElement("div");
    produitDiv.classList.add("produit");
    produitDiv.innerHTML = `
      <img src="${produit.image}" alt="${produit.titre}">
      <h3>${produit.titre}</h3>
      <p>${produit.description}</p>
      <p><strong>Catégorie :</strong> ${produit.categorie}</p>
    `;
    produitsContainer.appendChild(produitDiv);
  });
}

// Fonction d’affichage des résultats
function afficherResultats(liste) {
  resultatsContainer.innerHTML = "";
  if (liste.length === 0) {
    resultatsContainer.innerHTML = `<p style="text-align:center;margin-top:20px;">Aucun résultat trouvé.</p>`;
  } else {
    liste.forEach(produit => {
      const produitDiv = document.createElement("div");
      produitDiv.classList.add("produit");
      produitDiv.innerHTML = `
        <img src="${produit.image}" alt="${produit.titre}">
        <h3>${produit.titre}</h3>
        <p>${produit.description}</p>
        <p><strong>Catégorie :</strong> ${produit.categorie}</p>
      `;
      resultatsContainer.appendChild(produitDiv);
    });
  }
  resultatsSection.style.display = "block";
  window.scrollTo({ top: resultatsSection.offsetTop, behavior: "smooth" });
}

// Afficher tous les produits au chargement
afficherProduits(produits);

// Recherche au clic
searchBtn.addEventListener("click", () => {
  const recherche = searchInput.value.toLowerCase().trim();
  const resultats = produits.filter(p =>
    p.titre.toLowerCase().includes(recherche) ||
    p.description.toLowerCase().includes(recherche) ||
    p.categorie.toLowerCase().includes(recherche)
  );
  afficherResultats(resultats);
});

// Recherche dynamique (en tapant)
searchInput.addEventListener("input", () => {
  const recherche = searchInput.value.toLowerCase().trim();
  if (recherche === "") {
    resultatsSection.style.display = "none";
    return;
  }
  const resultats = produits.filter(p =>
    p.titre.toLowerCase().includes(recherche) ||
    p.description.toLowerCase().includes(recherche) ||
    p.categorie.toLowerCase().includes(recherche)
  );
  afficherResultats(resultats);
});
