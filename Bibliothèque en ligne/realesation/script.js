// === تهيئة البيانات في LocalStorage ===
if (!localStorage.getItem("bibliotheque")) {
  const bibliotheque = [
    { code: 12, titre: "Clean Code", auteur: "Robert C. Martin", annee: 2008, disponible: true, prix: 150 },
    { code: 45, titre: "Eloquent JavaScript", auteur: "Marijn Haverbeke", annee: 2018, disponible: true, prix: 200 },
    { code: 77, titre: "JavaScript Patterns", auteur: "Stoyan Stefanov", annee: 2010, disponible: false, prix: 180 },
  ];
  localStorage.setItem("bibliotheque", JSON.stringify(bibliotheque));
}

function getBibliotheque() {
  return JSON.parse(localStorage.getItem("bibliotheque")) || [];
}

function saveBibliotheque(biblio) {
  localStorage.setItem("bibliotheque", JSON.stringify(biblio));
}

// === عرض الكتب في الصفحة ===
let ordreCroissant = true;

function afficherCatalogue(filtre = "") {
  const catalogueDiv = document.getElementById("catalogue");
  const statsDiv = document.getElementById("stats");
  const plusCherDiv = document.getElementById("plusCher");
  let bibliotheque = getBibliotheque();

  // تطبيق البحث
  if (filtre) {
    bibliotheque = bibliotheque.filter(l =>
      l.titre.toLowerCase().includes(filtre.toLowerCase())
    );
  }

  catalogueDiv.innerHTML = "";

  bibliotheque.forEach((livre) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${livre.titre}</h3>
      <p>👨‍💻 المؤلف: ${livre.auteur}</p>
      <p>📅 السنة: ${livre.annee}</p>
      <p>💰 السعر: ${livre.prix} درهم</p>
      <p>📦 الحالة: ${livre.disponible ? "متوفر ✅" : "<span class='reserve'>محجوز ❌</span>"}</p>
      <div class="actions">
        <button onclick="supprimerLivre(${livre.code})">🗑 حذف</button>
        ${
          livre.disponible
            ? `<button onclick="reserverLivre(${livre.code})">📘 حجز</button>`
            : `<button onclick="annulerReservation(${livre.code})">🔄 إلغاء الحجز</button>`
        }
      </div>
    `;
    catalogueDiv.appendChild(card);
  });

  statsDiv.innerHTML = `
    <p>📚 عدد الكتب الإجمالي: ${bibliotheque.length}</p>
    <p>✅ عدد الكتب المتوفرة: ${bibliotheque.filter(l => l.disponible).length}</p>
  `;

  // الكتاب الأغلى
  if (bibliotheque.length > 0) {
    const plusCher = getBibliotheque().reduce((max, l) => (l.prix > max.prix ? l : max));
    plusCherDiv.innerHTML = `
      <p>🏆 أغلى كتاب: <strong>${plusCher.titre}</strong> بسعر ${plusCher.prix} درهم</p>
    `;
  }
}

// === حجز كتاب ===
function reserverLivre(code) {
  let bibliotheque = getBibliotheque();
  const index = bibliotheque.findIndex(l => l.code === code);
  if (index !== -1) {
    bibliotheque[index].disponible = false;
    saveBibliotheque(bibliotheque);
    afficherCatalogue();
  }
}

// === إلغاء الحجز ===
function annulerReservation(code) {
  let bibliotheque = getBibliotheque();
  const index = bibliotheque.findIndex(l => l.code === code);
  if (index !== -1) {
    bibliotheque[index].disponible = true;
    saveBibliotheque(bibliotheque);
    afficherCatalogue();
  }
}

// === حذف كتاب ===
function supprimerLivre(code) {
  let bibliotheque = getBibliotheque().filter(livre => livre.code !== code);
  saveBibliotheque(bibliotheque);
  afficherCatalogue();
}

// === البحث عن كتاب حسب العنوان ===
function rechercherLivre() {
  const filtre = document.getElementById("searchInput").value;
  afficherCatalogue(filtre);
}

// === ترتيب حسب العنوان ===
function trierLivres() {
  let bibliotheque = getBibliotheque();
  bibliotheque.sort((a, b) => {
    if (ordreCroissant) return a.titre.localeCompare(b.titre);
    else return b.titre.localeCompare(a.titre);
  });
  ordreCroissant = !ordreCroissant;
  saveBibliotheque(bibliotheque);
  afficherCatalogue();
}

// === إضافة كتاب جديد ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLivre");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let bibliotheque = getBibliotheque();

      const livre = {
        code: Number(document.getElementById("code").value),
        titre: document.getElementById("titre").value,
        auteur: document.getElementById("auteur").value,
        annee: Number(document.getElementById("annee").value),
        prix: Number(document.getElementById("prix").value),
        disponible: document.getElementById("disponible").checked,
      };

      bibliotheque.push(livre);
      saveBibliotheque(bibliotheque);
      alert("✅ تم إضافة الكتاب بنجاح!");
      form.reset();
    });
  }
});

// === الإحصائيات ===
function afficherStatistiques() {
  const statsDiv = document.getElementById("statsContainer");
  const bibliotheque = getBibliotheque();

  if (bibliotheque.length === 0) {
    statsDiv.innerHTML = "<p>لا توجد كتب حالياً.</p>";
    return;
  }

  const totalValeur = bibliotheque.reduce((s, l) => s + l.prix, 0);
  const moyennePrix = (totalValeur / bibliotheque.length).toFixed(2);
  const plusCher = bibliotheque.reduce((max, l) => (l.prix > max.prix ? l : max));

  statsDiv.innerHTML = `
    <p>💰 القيمة الإجمالية: ${totalValeur} درهم</p>
    <p>📈 متوسط الأسعار: ${moyennePrix} درهم</p>
    <p>🏆 أغلى كتاب: ${plusCher.titre} (${plusCher.prix} درهم)</p>
  `;
}
