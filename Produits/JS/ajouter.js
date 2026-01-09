const form = document.getElementById('addProductForm');
const imageFile = document.getElementById('imageFile');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const cameraIcon = document.getElementById('cameraIcon');
const message = document.getElementById('message');



// 📦 Soumission du formulaire
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const titre = document.getElementById('titre').value;
  const description = document.getElementById('description').value;
  const categorie = document.getElementById('categorie').value;
  const file = imageFile.files[0];

  let reader = new FileReader();
  reader.onload = () => {
    const product = {
      titre,
      prix_prod,
      description,
      categorie,
      image: capturedImage || reader.result
    };

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    message.textContent = "✔️ Produit ajouté avec succès !";
    form.reset();
  };

  if (file) reader.readAsDataURL(file);
  else if (capturedImage) {
    const product = { titre, prix_prod, description, categorie, image: capturedImage };
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    message.textContent = "✔️ Produit ajouté avec succès !";
    form.reset();
  } else {
    alert("Veuillez importer ou capturer une image !");
  }
});


const form = document.getElementById("addProductForm");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titre = document.getElementById("titre").value;
  const prix_prod = document.getElementById("prix_prod").value;
  const categorie = document.getElementById("categorie").value;
  const description = document.getElementById("description").value;
  const imageFile = document.getElementById("imageFile").files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const imageURL = reader.result;

    const produit = {
      titre: titre,
      prix: prix_prod,
      categorie: categorie,
      description: description,
      image: imageURL
    };

    let produits = JSON.parse(localStorage.getItem("produits")) || [];
    produits.unshift(produit); // le plus récent en premier
    localStorage.setItem("produits", JSON.stringify(produits));

    message.textContent = "Produit ajouté avec succès !";
    form.reset();
  };

  if(imageFile) {
    reader.readAsDataURL(imageFile);
  } else {
    reader.onload();
  }
});

