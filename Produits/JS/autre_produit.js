// Liste de produits simulée (à remplacer plus tard par ton stockage local ou serveur)
const produits = [
  { 
    id: 1, 
    titre: "Coiffure à domicile", 
    image: "images/coiffure.jpg", 
    description: "Service de coiffure rapide et professionnel à domicile.",
    prix: 25, 
    likes: 10, 
    liked: false 
  },
  { 
    id: 2, 
    titre: "Réparation moto", 
    image: "images/moto.jpg", 
    description: "Réparation complète et entretien moto toutes marques.",
    prix: 40, 
    likes: 5, 
    liked: false 
  },
  { 
    id: 3, 
    titre: "Nettoyage à domicile", 
    image: "images/nettoyage.jpg", 
    description: "Nettoyage professionnel de maisons et bureaux.",
    prix: 30, 
    likes: 7, 
    liked: false 
  }
];

// Sélection du conteneur principal
const container = document.getElementById("produits-container");

// Création du panier
let panier = JSON.parse(localStorage.getItem("panier")) || [];

// Fonction pour afficher les produits
function afficherProduits() {
  container.innerHTML = "";
  produits.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("produit-card");

    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.titre}" class="produit-img" data-id="${prod.id}">
      <h3>${prod.titre}</h3>
      <p class="prix">${prod.prix} $US</p>
      <div class="actions">
        <button class="btn-panier" data-id="${prod.id}">🛒 Ajouter au panier</button>
      </div>
    `;

    container.appendChild(card);
  });

  // Gérer le clic sur l’image pour voir les détails
  document.querySelectorAll(".produit-img").forEach(img => {
    img.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      afficherDetails(id);
    });
  });

  // Gérer le clic sur "Ajouter au panier"
  document.querySelectorAll(".btn-panier").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      ajouterAuPanier(id);
    });
  });
}

// Fonction pour afficher les détails d’un produit
function afficherDetails(id) {
  const prod = produits.find(p => p.id == id);
  if (!prod) return;

  // Fenêtre modale simple
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="${prod.image}" alt="${prod.titre}" class="modal-img">
      <h2>${prod.titre}</h2>
      <p>${prod.description}</p>
      <p><strong>Prix :</strong> ${prod.prix} $US</p>
      <button class="btn-panier" data-id="${prod.id}">🛒 Ajouter au panier</button>
    </div>
  `;

  document.body.appendChild(modal);

  // Fermer la modale
  modal.querySelector(".close").addEventListener("click", () => {
    modal.remove();
  });

  // Ajouter au panier depuis la modale
  modal.querySelector(".btn-panier").addEventListener("click", () => {
    ajouterAuPanier(prod.id);
  });
}

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(id) {
  const prod = produits.find(p => p.id == id);
  const existe = panier.find(p => p.id == id);

  if (existe) {
    alert("Ce produit est déjà dans le panier !");
  } else {
    panier.push(prod);
    localStorage.setItem("panier", JSON.stringify(panier));
    alert(`${prod.titre} a été ajouté au panier ✅`);
  }
}

// Charger les produits
afficherProduits();
