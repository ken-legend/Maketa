// ===================== SVG =====================
const SVGs = {
  heart: {
    filled: `<svg class="icon heart filled" viewBox="0 0 24 24" width="20" height="20">
               <path d="M12 21s-7.5-4.6-10-9.5C-0.2 6.5 3.5 3 7.5 5.5
                        9.5 6.8 12 9 12 9s2.5-2.2 4.5-3.5
                        C20.5 3 24.2 6.5 22 11.5
                        19.5 16.4 12 21 12 21z" fill="red"/>
             </svg>`,
    empty: `<svg class="icon heart" viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 21s-7.5-4.6-10-9.5C-0.2 6.5 3.5 3 7.5 5.5
                       9.5 6.8 12 9 12 9s2.5-2.2 4.5-3.5
                       C20.5 3 24.2 6.5 22 11.5
                       19.5 16.4 12 21 12 21z"
                    fill="none" stroke="currentColor" stroke-width="2"/>
            </svg>`
  },
  comment: `<svg class="icon comment" viewBox="0 0 24 24" width="20" height="20">
              <path d="M21 6H3v12h4v4l4-4h10z" fill="none" stroke="currentColor" stroke-width="2"/>
            </svg>`,
  share: `<svg class="icon share" viewBox="0 0 24 24" width="20" height="20">
            <path d="M4 12v7h16v-7M12 16V3M7 8l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2"/>
          </svg>`,
  panier: `<svg class="icon panier" viewBox="0 0 24 24" width="20" height="20">
             <path d="M6 6h15l-2 9H8L6 6zm0 0L4 2
                      M9 22a1 1 0 1 0 0-2
                      M17 22a1 1 0 1 0 0-2"
                   fill="none" stroke="currentColor" stroke-width="2"/>
           </svg>`
};



document.getElementById("btnProfil").addEventListener("click", () => {
  window.location.href = "connexion/conex.html";
});

/*
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearSearch");

searchInput.addEventListener("input", function () {
  const valeur = this.value.toLowerCase();
  const produitsEl = document.querySelectorAll(".produit");

  clearBtn.style.display = valeur ? "inline" : "none";

  produitsEl.forEach(produit => {
    const titre = produit.querySelector("h3").textContent.toLowerCase();
    const descEl = produit.querySelector(".description");
    const description = descEl ? descEl.textContent.toLowerCase() : "";

    produit.style.display =
      titre.includes(valeur) || description.includes(valeur)
        ? "block"
        : "none";
  });
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearBtn.style.display = "none";
  document.querySelectorAll(".produit").forEach(p => {
    p.style.display = "block";
  });
});
*/

//suggestions

document.addEventListener("DOMContentLoaded", () => {

  // 🔹 Récupération des éléments
  const systems = [
    {
      input: document.getElementById("searchInputDesktop"),
      box: document.getElementById("suggestionsDesktop")
    },
    {
      input: document.getElementById("searchInputMobile"),
      box: document.getElementById("suggestionsMobile")
    }
  ];

  // 🔹 Sécurité : vérifier que produits existe
  if (typeof produits === "undefined") {
    console.error("❌ Le tableau produits n'est pas chargé");
    return;
  }

  systems.forEach(sys => {
    if (!sys.input || !sys.box) return;

    sys.input.addEventListener("input", function () {
      const valeur = this.value.toLowerCase().trim();
      sys.box.innerHTML = "";

      if (!valeur) {
        sys.box.style.display = "none";
        afficherTousProduits();
        return;
      }

      const matches = produits.filter(p =>
        p.titre.toLowerCase().includes(valeur) ||
        (p.description && p.description.toLowerCase().includes(valeur))
      );

      if (matches.length === 0) {
        sys.box.style.display = "none";
        afficherTousProduits();
        return;
      }

      matches.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p.titre;

        li.addEventListener("click", () => {
          sys.input.value = p.titre;
          sys.box.style.display = "none";
          filtrerProduits(p.titre);
        });

        sys.box.appendChild(li);
      });

      sys.box.style.display = "block";
      filtrerProduits(valeur);
    });
  });

  // ================== FONCTIONS ==================

  function filtrerProduits(texte) {
    document.querySelectorAll(".produit").forEach(prod => {
      const titre = prod.querySelector("h3")?.textContent.toLowerCase() || "";
      prod.style.display = titre.includes(texte.toLowerCase()) ? "block" : "none";
    });
  }

  function afficherTousProduits() {
    document.querySelectorAll(".produit").forEach(prod => {
      prod.style.display = "block";
    });
  }

});





//filtre






//affichage
const slider = document.getElementById("sectionNouveaute");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");

const scrollAmount = 240; // correspond à la largeur d'un produit + gap

prevBtn.onclick = () => {
  slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
};

nextBtn.onclick = () => {
  slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};



//
document.addEventListener("DOMContentLoaded", () => {
  const systems = [
    {
      input: document.getElementById("searchInputDesktop"),
      box: document.getElementById("suggestionsDesktop"),
      clearBtn: document.getElementById("clearSearchDesktop")
    },
    {
      input: document.getElementById("searchInputMobile"),
      box: document.getElementById("suggestionsMobile"),
      clearBtn: document.getElementById("clearSearchMobile")
    }
  ];

  systems.forEach(sys => {
    if (!sys.input || !sys.box || !sys.clearBtn) return;

    // 🔹 Affiche ou cache le bouton clear
    sys.input.addEventListener("input", function () {
      const valeur = this.value.trim();
      sys.clearBtn.style.display = valeur ? "flex" : "none";

      sys.box.innerHTML = "";

      if (!valeur) {
        sys.box.style.display = "none";
        return;
      }

      const matches = produits.filter(p =>
        p.titre.toLowerCase().includes(valeur.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(valeur.toLowerCase()))
      );

      matches.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p.titre;
        li.addEventListener("click", () => {
          sys.input.value = p.titre;
          sys.box.style.display = "none";
          sys.clearBtn.style.display = "flex"; // le bouton reste visible
        });
        sys.box.appendChild(li);
      });

      sys.box.style.display = matches.length ? "block" : "none";
    });

    // 🔹 Fonction du bouton clear
    sys.clearBtn.addEventListener("click", () => {
      sys.input.value = "";
      sys.box.style.display = "none";
      sys.clearBtn.style.display = "none";
    });
  });
});

//

    // 🔹 Bouton recherche
    document.getElementById("searchBtnDesktop").addEventListener("click", () => {
      const valeur = sys.input.value.trim().toLowerCase();
      sys.box.innerHTML = "";

      if (!valeur) {
        sys.box.style.display = "none";
        return;
      }

      const matches = produits.filter(p =>
        p.titre.toLowerCase().includes(valeur) ||
        (p.description && p.description.toLowerCase().includes(valeur))
      );

      if (matches.length === 0) {
        sys.box.style.display = "none";
        alert("Aucun produit trouvé"); // optionnel
        return;
      }

      matches.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p.titre;
        li.addEventListener("click", () => {
          sys.input.value = p.titre;
          sys.box.style.display = "none";
          sys.clearBtn.style.display = "flex";
        });
        sys.box.appendChild(li);
      });

      sys.box.style.display = "block";
    });


//
document.addEventListener("DOMContentLoaded", () => {
  const searchInputDesktop = document.getElementById("searchInputDesktop");
  const suggestionsDesktop = document.getElementById("suggestionsDesktop");
  const searchInputMobile = document.getElementById("searchInputMobile");
  const suggestionsMobile = document.getElementById("suggestionsMobile");

  const clearDesktop = document.getElementById("clearSearchDesktop");
  const clearMobile = document.getElementById("clearSearchMobile");

  // Effacer le champ Desktop
  clearDesktop.addEventListener("click", () => {
    searchInputDesktop.value = "";
    suggestionsDesktop.style.display = "none";
    afficherTousProduits();
  });

  // Effacer le champ Mobile
  clearMobile.addEventListener("click", () => {
    searchInputMobile.value = "";
    suggestionsMobile.style.display = "none";
    afficherTousProduits();
  });

  // ===== fonctions pour afficher tous les produits =====
  function afficherTousProduits() {
    document.querySelectorAll(".produit").forEach(prod => {
      prod.style.display = "block";
    });
  }
});


// ================== PRODUITS ==================
const produits = [
  { id: 1, titre: "Coiffure à domicile", image: "produis/1.jpg",description: "Service professionnel de coiffure réalisé directement chez vous.", prix: 25, likes: 10, liked: false, commentaires: [] },
  { id: 2, titre: "Réparation moto", image: "images/moto.jpg",description: "Réparation rapide et fiable pour tous types de motos.", prix: 40, likes: 5, liked: false, commentaires: ["Service rapide !"] },
  { id: 3, titre: "Cours de guitare", image: "images/guitare.jpg",    description: "Cours de guitare pour débutants et intermédiaires.", prix: 30, likes: 8, liked: false, commentaires: [] }
  
];

  // Nouveau produit
const nouveauProduit = {
  id: 4,
  titre: "Massage à domicile",
  image: "images/massage.jpg",
  prix: 50,
  description: "Relaxation complète avec massage professionnel chez vous.",
  categorie: "Service",
  likes: 104,
  liked: false,
  commentaires: [],
  nouveaute: true,       // 🔹 Important pour la section Nouveautés
};

const produit1 = {
  id: 4,
  titre: "Massage à domicile",
  image: "images/massage.jpg",
  prix: 50,
  description: "Relaxation complète avec massage professionnel chez vous.",
  categorie: "Service",
  likes: 104,
  liked: false,
  commentaires: [],
  nouveaute: true,
};

const produit2 = {
  id: 5,
  titre: "Yoga en ligne",
  image: "images/yoga.jpg",
  prix: 30,
  description: "Séances de yoga pour tous niveaux, directement chez vous.",
  categorie: "Cours",
  likes: 32,
  liked: false,
  commentaires: [],
  nouveaute: true,
};

// Ajouter au tableau
produits.push(produit1, produit2);

// Afficher la section Nouveautés
afficherProduitsParCategorie();

// Ajout au tableau
produits.push(nouveauProduit);

// Rafraîchissement de l’affichage
afficherProduitsParCategorie();
;



//les produit
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
      <p class="description">${p.description}</p>

      <p class="prix">${p.prix} Gourdes</p>
    </div>

   <div class="actions">
       <button class="like ${p.liked ? "active" : ""}" data-id="${p.id}">
      ${p.liked ? SVGs.heart.filled : SVGs.heart.empty} 
      <span class="like-count">${p.likes}</span>
    </button>
    
    <button class="share" data-id="${p.id}">${SVGs.share}</button>
    <button class="add-panier" data-id="${p.id}">${SVGs.panier}</button>
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




//afficherParCatego

function afficherProduitsParCategorie() {
  const sectionNouveaute = document.getElementById("sectionNouveaute");


  //
  

  // Vide la section avant affichage
  sectionNouveaute.innerHTML = "";

  // Parcourir tous les produits
  produits.forEach(p => {
    if (p.nouveaute) {
      const produitEl = document.createElement("div");
      produitEl.classList.add("produit");

      produitEl.innerHTML = `
        <img src="${p.image}" alt="${p.titre}" class="produit-img" data-id="${p.id}">
        <div class="produit-info">
          <h3>${p.titre}</h3>
          <p class="description">${p.description}</p>
          <p class="prix">${p.prix} Gourdes</p>
        </div>

        <div class="actions">
          <button class="like ${p.liked ? "active" : ""}" data-id="${p.id}">
            ${p.liked ? SVGs.heart.filled : SVGs.heart.empty} 
            <span class="like-count">${p.likes}</span>
          </button>
          <button class="share" data-id="${p.id}">${SVGs.share}</button>
          <button class="add-panier" data-id="${p.id}">${SVGs.panier}</button>
        </div>
      `;

      // Ajouter le produit à la section
      sectionNouveaute.appendChild(produitEl);
    }
  });

  // Ajouter les événements pour les boutons
  sectionNouveaute.querySelectorAll(".like").forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.dataset.id);
      const produit = produits.find(p => p.id === id);
      produit.liked = !produit.liked;
      produit.likes += produit.liked ? 1 : -1;
      btn.innerHTML = `${produit.liked ? SVGs.heart.filled : SVGs.heart.empty} <span class="like-count">${produit.likes}</span>`;
    };
  });

  sectionNouveaute.querySelectorAll(".add-panier").forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.dataset.id);
      const produit = produits.find(p => p.id === id);
      if (!panier.some(p => p.id === id)) {
        panier.push(produit);
        localStorage.setItem("panier", JSON.stringify(panier));
        alert(`${produit.titre} ajouté au panier ✅`);
        afficherPanierFlottant();
      } else {
        alert("Ce produit est déjà dans le panier !");
      }
    };
  });

  sectionNouveaute.querySelectorAll(".share").forEach(btn => {
    btn.onclick = () => {
      const titre = btn.closest(".produit").querySelector("h3").textContent;
      navigator.clipboard.writeText(`${titre} - ${window.location.href}`);
      alert("Lien copié pour partage !");
    };
  });

  // Cliquer sur l'image → modale
  sectionNouveaute.querySelectorAll(".produit-img").forEach(img => {
    img.onclick = () => {
      const id = parseInt(img.dataset.id);
      const produit = produits.find(p => p.id === id);
      afficherDetailsProduit(produit);
    };
  });
}



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
    likeBtn.innerHTML = `${produit.liked ? SVGs.heart.filled : SVGs.heart.empty} <span class="like-count">${produit.likes}</span>`;
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
      alert(`${produit.titre} ajouté au panier ✔️`);
      afficherPanierFlottant();
    } else {
      alert("Ce produit est déjà dans le panier !");
    }
  };
}



function afficherPanierFlottant() {
  // ✅ Si le panier est vide, ne rien afficher
  if (panier.length === 0) {
    const existing = document.querySelector(".panier-flottant");
    if (existing) existing.remove(); // Supprime le panier s'il existait déjà
    return;
  }

  let panierIcon = document.querySelector(".panier-flottant");

  if (!panierIcon) {
    panierIcon = document.createElement("div");
    panierIcon.classList.add("panier-flottant");
    panierIcon.innerHTML = `${SVGs.panier} <span class="count">${panier.length}</span>`;
    document.body.appendChild(panierIcon);

    // Drag & Snap
    let isDragging = false;
    let offsetX, offsetY;

    panierIcon.addEventListener("mousedown", e => {
      isDragging = true;
      offsetX = e.clientX - panierIcon.getBoundingClientRect().left;
      offsetY = e.clientY - panierIcon.getBoundingClientRect().top;
      panierIcon.style.position = "fixed";
      panierIcon.style.zIndex = 1000;
    });

    document.addEventListener("mousemove", e => {
      if (!isDragging) return;
      panierIcon.style.left = `${e.clientX - offsetX}px`;
      panierIcon.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", e => {
      if (!isDragging) return;
      isDragging = false;

      // Calcul du snap à gauche ou droite
      const screenWidth = window.innerWidth;
      const panierWidth = panierIcon.offsetWidth;
      const centerX = e.clientX;

      if (centerX < screenWidth / 2) {
        // Colle à gauche
        panierIcon.style.left = "10px";
      } else {
        // Colle à droite
        panierIcon.style.left = `${screenWidth - panierWidth - 10}px`;
      }

      // Garde la position verticale actuelle
      const top = e.clientY - offsetY;
      panierIcon.style.top = `${Math.min(Math.max(top, 10), window.innerHeight - panierIcon.offsetHeight - 10)}px`;
    });

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






////////////////


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



// ================== SLIDER ==================
const slidere = document.getElementById("sectionNouveaute");
const dotsContainer = document.getElementById("slider-dots");
let currentIndex = 0;
const produitWidth = 240;
let autoSlideInterval;

// Créer points
function createDots() {
  dotsContainer.innerHTML = "";
  const slides = slider.querySelectorAll(".produit");
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

// Mettre à jour points
function updateDots() {
  const dots = dotsContainer.querySelectorAll("span");
  dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
}

// Aller à un slide
function goToSlide(index) {
  const slides = slider.querySelectorAll(".produit");
  if (slides.length === 0) return;
  currentIndex = index;
  slider.scrollTo({ left: currentIndex * produitWidth, behavior: "smooth" });
  updateDots();
}

// Slide suivant
function nextSlide() {
  const slides = slider.querySelectorAll(".produit");
  if (slides.length === 0) return;
  currentIndex = (currentIndex + 1) % slides.length;
  goToSlide(currentIndex);
}

// Auto slide
function startAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 3000);
}

// Stop auto au hover
slider.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
slider.addEventListener("mouseleave", startAutoSlide);

// Initialisation
function initSlider() {
  createDots();
  startAutoSlide();
}

// Appel après affichage produits
initSlider();