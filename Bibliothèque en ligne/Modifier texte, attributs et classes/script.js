let titre = document.getElementById("titre");
let image = document.querySelector("img");
let bouton = document.querySelector(".btn");

bouton.addEventListener("click", function() {
  // Modifier le texte
  titre.innerText = "Titre modifié !";
  
  // Ajouter ou retirer une classe
  titre.classList.toggle("highlight");
  
  // Modifier les attributs de l’image
  image.setAttribute("src", "photo.png");
  image.setAttribute("alt", "Nouvelle image");
});
