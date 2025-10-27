let bouton = document.getElementById("btn-test");
let champNom = document.getElementById("nom");
let formulaire = document.getElementById("form-test");

// 1️⃣ Réagir au clic
bouton.addEventListener("click", function() {
  console.log("Le bouton a été cliqué !");
});

// 2️⃣ Réagir à la saisie
champNom.addEventListener("input", function() {
  console.log("Texte saisi : " + champNom.value);
});

// 3️⃣ Réagir à la soumission du formulaire
formulaire.addEventListener("submit", function(e) {
  e.preventDefault(); // empêche le rechargement
  console.log("Formulaire soumis avec le nom : " + champNom.value);
});
