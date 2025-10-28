// Liste de produits simulée
const produits = [
  { id: 1, titre: "Coiffure à domicile", image: "produis/1.jpg", likes: 10, liked: false, commentaires: [] },
  { id: 2, titre: "Réparation moto", image: "images/moto.jpg", likes: 5, liked: false, commentaires: ["Service rapide !"] },
  { id: 3, titre: "Cours de guitare", image: "images/guitare.jpg", likes: 8, liked: false, commentaires: [] }
];

const container = document.getElementById("produits-container");

// Créer les cartes produits
produits.forEach(p => {
  const produitEl = document.createElement("div");
  produitEl.classList.add("produit");

  produitEl.innerHTML = `
    <img src="${p.image}" alt="${p.titre}">
    <div class="produit-info">
      <h3>${p.titre}</h3>
      <p>${p.description || ""}</p>
    </div>
    <div class="actions">
      <button class="like ${p.liked ? "active" : ""}" data-id="${p.id}">
        ${p.liked ? "❤️" : "🤍"} <span class="like-count">${p.likes}</span>
      </button>
      <button class="comment" data-id="${p.id}">💬 <span class="comment-count">${p.commentaires.length}</span></button>
      <button class="share" data-id="${p.id}">🔗</button>
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

// Gérer les clics
container.addEventListener("click", e => {
  const likeBtn = e.target.closest(".like");
  const commentBtn = e.target.closest(".comment");
  const shareBtn = e.target.closest(".share");
  const sendBtn = e.target.closest(".comment-input button");

  // ❤️ Like
  if (likeBtn) {
    const id = parseInt(likeBtn.dataset.id);
    const produit = produits.find(p => p.id === id);
    const count = likeBtn.querySelector(".like-count");

    produit.liked = !produit.liked;       // changer état
    produit.likes += produit.liked ? 1 : -1;

    // changer symbole et compteur
    likeBtn.classList.toggle("active", produit.liked);
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

      // Mettre à jour le compteur de commentaires à côté du 💬
      const commentCount = document.querySelector(`.comment[data-id="${id}"] .comment-count`);
      commentCount.textContent = produit.commentaires.length;
    }
  }
});
