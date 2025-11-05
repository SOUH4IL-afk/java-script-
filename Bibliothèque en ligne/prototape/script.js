// 📚 دوال المساعدة الأساسية
function getBooks() {
  return JSON.parse(localStorage.getItem('livres') || '[]');
}

function saveBooks(livres) {
  localStorage.setItem('livres', JSON.stringify(livres));
}

// 📘 إضافة كتاب جديد
const form = document.getElementById('ajouterLivreForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const livre = {
      titre: document.getElementById('titre').value,
      auteur: document.getElementById('auteur').value,
      genre: document.getElementById('genre').value,
      annee: document.getElementById('annee').value,
      disponible: true // ✅ الكتاب متاح افتراضيًا
    };

    const livres = getBooks();
    livres.push(livre);
    saveBooks(livres);

    alert("✅ تم إضافة الكتاب بنجاح!");
    form.reset();
  });
}

// 📚 عرض الفهرس
const catalogueDiv = document.getElementById('catalogue');
if (catalogueDiv) {
  let livres = getBooks();
  afficherLivres(livres);

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const recherche = e.target.value.toLowerCase();
      const filtres = livres.filter(l =>
        l.titre.toLowerCase().includes(recherche) ||
        l.auteur.toLowerCase().includes(recherche)
      );
      afficherLivres(filtres);
    });
  }
}

// 📘 عرض جميع الكتب
function afficherLivres(livres) {
  const container = document.getElementById('catalogue');
  container.innerHTML = '';

  if (livres.length === 0) {
    container.innerHTML = "<p>📭 لا توجد كتب بعد.</p>";
    return;
  }

  livres.forEach((livre, index) => {
    const div = document.createElement('div');
    div.className = 'carte';
    div.innerHTML = `
      <h3>${livre.titre}</h3>
      <p><strong>المؤلف:</strong> ${livre.auteur}</p>
      <p><strong>النوع:</strong> ${livre.genre}</p>
      <p><strong>سنة النشر:</strong> ${livre.annee}</p>
      <p><strong>الحالة:</strong> 
         <span style="color:${livre.disponible ? 'green' : 'red'};">
         ${livre.disponible ? '📗 متاح' : '📕 مُستعار'}
         </span>
      </p>
      <div class="buttons">
        <button onclick="changerEtat(${index})">🔄 تبديل الحالة</button>
        <button onclick="modifierLivre(${index})">✏️ تعديل</button>
        <button onclick="supprimerLivre(${index})">🗑️ حذف</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// 🔄 تبديل حالة الكتاب
function changerEtat(index) {
  const livres = getBooks();
  livres[index].disponible = !livres[index].disponible;
  saveBooks(livres);
  afficherLivres(livres);
}

// ✏️ تعديل كتاب
function modifierLivre(index) {
  const livres = getBooks();
  const livre = livres[index];

  const nouveauTitre = prompt("📝 عنوان جديد:", livre.titre);
  const nouvelAuteur = prompt("👨‍🏫 مؤلف جديد:", livre.auteur);
  const nouveauGenre = prompt("📚 نوع جديد:", livre.genre);
  const nouvelleAnnee = prompt("📅 سنة جديدة:", livre.annee);

  if (nouveauTitre && nouvelAuteur && nouveauGenre && nouvelleAnnee) {
    livres[index] = {
      ...livre,
      titre: nouveauTitre,
      auteur: nouvelAuteur,
      genre: nouveauGenre,
      annee: nouvelleAnnee
    };
    saveBooks(livres);
    afficherLivres(livres);
    alert("✅ تم تحديث معلومات الكتاب بنجاح!");
  }
}

// 🗑️ حذف كتاب
function supprimerLivre(index) {
  if (confirm("هل تريد حذف هذا الكتاب؟")) {
    const livres = getBooks();
    livres.splice(index, 1);
    saveBooks(livres);
    afficherLivres(livres);
  }
}

// 📊 صفحة الإحصائيات
const chartCanvas = document.getElementById('chart');
if (chartCanvas) {
  const livres = getBooks();
  const genres = {};
  let disponibles = 0, empruntes = 0;

  livres.forEach(l => {
    genres[l.genre] = (genres[l.genre] || 0) + 1;
    if (l.disponible) disponibles++;
    else empruntes++;
  });

  new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: Object.keys(genres),
      datasets: [{
        label: 'عدد الكتب حسب النوع',
        data: Object.values(genres),
        backgroundColor: '#0077b6'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // عرض ملخص بسيط أسفل الرسم
  const summary = document.createElement('div');
  summary.style.textAlign = "center";
  summary.style.marginTop = "20px";
  summary.innerHTML = `
    <p>📗 الكتب المتاحة: <strong>${disponibles}</strong></p>
    <p>📕 الكتب المُستعارة: <strong>${empruntes}</strong></p>
    <p>📚 المجموع الكلي: <strong>${livres.length}</strong></p>
  `;
  chartCanvas.after(summary);
}