    let livres = [
  { titre: "JavaScript Moderne", auteur: "Dupont", prix: 120 },
  { titre: "HTML & CSS", auteur: "Martin", prix: 90 },
  { titre: "React pour Débutants", auteur: "Durand", prix: 150 },
];

console.log("Liste complète :", livres);
console.log("Titres des livres :");
livres.forEach((livre) => console.log(livre.titre));

let total = 0;
livres.forEach((livre) => (total += livre.prix));
console.log("Prix total :", total, "DH");

console.log("Livres à plus de 100 DH :");
livres
  .filter((livre) => livre.prix > 100)
  .forEach((livre) => console.log(livre.titre));

livres.push({ titre: "Node.js avancé", auteur: "Lemoine", prix: 180 });
console.log("Après ajout :", livres);
