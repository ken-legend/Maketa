// ================== PRODUITS ==================
const produits = [
  { id: 1, titre: "Coiffure à domicile", image: "produis/1.jpg", prix: 25, likes: 10, liked: false, commentaires: [] },
  { id: 2, titre: "Réparation moto", image: "images/moto.jpg", prix: 40, likes: 5, liked: false, commentaires: ["Service rapide !"] },
  { id: 3, titre: "Cours de guitare", image: "images/guitare.jpg", prix: 30, likes: 8, liked: false, commentaires: [] }
];

const container = document.getElementById("produits-container");
let panier = JSON.parse(localStorage.getItem("panier")) || [];


// ================== AFFICHAGE DES PRODUITS ==================
produits.forEach(p => {
  const produitEl = document.createElement("div");
  produitEl.classList.add("produit");

  produitEl.innerHTML = `
    <img src="${p.image}" alt="${p.titre}" class="produit-img" data-id="${p.id}">
    <div class="produit-info">
      <h3>${p.titre}</h3>
      <p class="prix">${p.prix} $US</p>
    </div>

    <div class="actions">
      <button class="like ${p.liked ? "active" : ""}" data-id="${p.id}">
        ${p.liked ? "❤️" : "🤍"} <span class="like-count">${p.likes}</span>
      </button>
      <button class="comment" data-id="${p.id}">💬 <span class="comment-count">${p.commentaires.length}</span></button>
      <button class="share" data-id="${p.id}">🔗</button>
      <button class="add-panier" data-id="${p.id}">🛒</button>
    </div>

    <div class="comment-section" data-id="${p.id}">
      <div class="comment-list">
        ${p.commentaires.length > 0 ? p.commentaires.map(c => `<p>${c}</p>`).join("") : "<p>Aucun commentaire pour l'instant.</p>"}
      </div>
      <div class="comment-input">
        <input type="text" placeholder="Écrire un commentaire...">
        <button>Envoyer</button>
      </div>
    </div>
  `;
  container.appendChild(produitEl);
});


// ================== ÉCOUTE DES CLICS ==================
container.addEventListener("click", e => {
  const likeBtn = e.target.closest(".like");
  const commentBtn = e.target.closest(".comment");
  const shareBtn = e.target.closest(".share");
  const sendBtn = e.target.closest(".comment-input button");
  const panierBtn = e.target.closest(".add-panier");
  const imgClick = e.target.closest(".produit-img");

  // ❤️ Like
  if (likeBtn) {
    const id = parseInt(likeBtn.dataset.id);
    const produit = produits.find(p => p.id === id);
    produit.liked = !produit.liked;
    produit.likes += produit.liked ? 1 : -1;
    likeBtn.innerHTML = `${produit.liked ? "❤️" : "🤍"} <span class="like-count">${produit.likes}</span>`;
  }

  // 💬 Commentaire
  if (commentBtn) {
    const id = parseInt(commentBtn.dataset.id);
    const section = document.querySelector(`.comment-section[data-id="${id}"]`);
    section.classList.toggle("visible");
  }

  // 🔗 Partage
  if (shareBtn) {
    const titre = shareBtn.closest(".produit").querySelector("h3").textContent;
    const url = window.location.href;
    navigator.clipboard.writeText(`${titre} - ${url}`).then(() => {
      alert("Lien copié pour partage !");
    });
  }

  // ✍️ Envoyer un commentaire
  if (sendBtn) {
    const section = sendBtn.closest(".comment-section");
    const input = section.querySelector("input");
    const liste = section.querySelector(".comment-list");
    const id = parseInt(section.dataset.id);
    const produit = produits.find(p => p.id === id);
    const texte = input.value.trim();

    if (texte) {
      produit.commentaires.push(texte);
      liste.innerHTML = produit.commentaires.map(c => `<p>${c}</p>`).join("");
      input.value = "";
      const commentCount = document.querySelector(`.comment[data-id="${id}"] .comment-count`);
      commentCount.textContent = produit.commentaires.length;
    }
  }

  // 🛒 Ajouter au panier
  if (panierBtn) {
    const id = parseInt(panierBtn.dataset.id);
    const produit = produits.find(p => p.id === id);
    const existe = panier.some(p => p.id === id);

    if (existe) {
      alert("Ce produit est déjà dans le panier !");
    } else {
      panier.push(produit);
      localStorage.setItem("panier", JSON.stringify(panier));
      alert(`${produit.titre} ajouté au panier ✅`);
      afficherPanierFlottant();
    }
  }

  // 👁️ Clic sur image → détails
  if (imgClick) {
    const id = parseInt(imgClick.dataset.id);
    const produit = produits.find(p => p.id === id);
    afficherDetailsProduit(produit);
  }
});


// ================== DÉTAIL PRODUIT (modale) ==================
function afficherDetailsProduit(produit) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="${produit.image}" alt="${produit.titre}">
      <h2>${produit.titre}</h2>
      <p><strong>Prix :</strong> ${produit.prix} $US</p>
      <button class="add-panier" data-id="${produit.id}">🛒 Ajouter au panier</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector(".close").onclick = () => modal.remove();

  modal.querySelector(".add-panier").onclick = () => {
    const existe = panier.some(p => p.id === produit.id);
    if (!existe) {
      panier.push(produit);
      localStorage.setItem("panier", JSON.stringify(panier));
      alert(`${produit.titre} ajouté au panier ✅`);
      afficherPanierFlottant();
    } else {
      alert("Ce produit est déjà dans le panier !");
    }
  };
}


// ================== PANIER FLOTTANT ==================
function afficherPanierFlottant() {
  let panierIcon = document.querySelector(".panier-flottant");

  if (!panierIcon) {
    panierIcon = document.createElement("div");
    panierIcon.classList.add("panier-flottant");
    panierIcon.innerHTML = `<span>🛒</span><span class="count">${panier.length}</span>`;
    document.body.appendChild(panierIcon);

    panierIcon.addEventListener("click", ouvrirModalePanier);
  } else {
    panierIcon.querySelector(".count").textContent = panier.length;
  }
}


// ================== MODALE DU PANIER ==================
function ouvrirModalePanier() {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  let total = panier.reduce((sum, p) => sum + p.prix, 0);

  modal.innerHTML = `
    <div class="modal-content panier-modal">
      <span class="close">&times;</span>
      <h2>Votre panier</h2>
      ${
        panier.length === 0
          ? "<p>Votre panier est vide.</p>"
          : panier.map(p => `
              <div class="item-panier">
                <img src="${p.image}" alt="${p.titre}">
                <div>
                  <h4>${p.titre}</h4>
                  <p>${p.prix} $US</p>
                </div>
                <button class="remove" data-id="${p.id}">❌</button>
              </div>
            `).join("")
      }
      <hr>
      <p><strong>Total :</strong> ${total} $US</p>
      <button class="finaliser">Finaliser la commande</button>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector(".close").onclick = () => modal.remove();

  modal.querySelectorAll(".remove").forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.dataset.id);
      panier = panier.filter(p => p.id !== id);
      localStorage.setItem("panier", JSON.stringify(panier));
      modal.remove();
      afficherPanierFlottant();
      ouvrirModalePanier();
    };
  });

  modal.querySelector(".finaliser").onclick = () => {
    alert("Commande finalisée ✅ (simulation)");
    panier = [];
    localStorage.setItem("panier", JSON.stringify(panier));
    modal.remove();
    afficherPanierFlottant();
  };
}


// ================== INIT ==================
if (panier.length > 0) afficherPanierFlottant();

// ==============================
// ✅ Notification "Ajouté au panier"
// ==============================
function showNotification(message) {
  let notif = document.createElement("div");
  notif.className = "notif-panier";
  notif.textContent = message;
  document.body.appendChild(notif);

  // Animation d'apparition
  setTimeout(() => notif.classList.add("show"), 100);

  // Disparaît après 2 secondes
  setTimeout(() => {
    notif.classList.remove("show");
    setTimeout(() => notif.remove(), 300);
  }, 2000);
}
