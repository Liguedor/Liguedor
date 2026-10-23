
const SUPABASE_URL = 'https://qvnmhvbuwbwtlemmqwxu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_B46lm_Pn2srdHQFSJzXe-Q_5fR5rMGU';

const picksEl = document.getElementById('picks');
let currentFilter = 'Tous';

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
}

function afficherPronostic(p) {
  const vip = p.categorie === 'vip';

  return `
    <article class="pick ${vip ? 'vip-locked' : ''}">
      <div class="pick-head">
        <span>${esc(p.sport)}</span>
        <span class="tag ${vip ? 'vip' : ''}">
          ${vip ? '♛ VIP' : 'PUBLIC'}
        </span>
      </div>
      <div class="match">
        <div class="team">
          <b>${esc(p.evenement)}</b>
        </div>
      </div>
      <div class="details">
        <div class="detail">
          <small>PRONOSTIC</small>
          <b>${vip ? '🔒 Contenu VIP' : esc(p.pronostic)}</b>
        </div>
        <div class="detail">
          <small>COTE</small>
          <b>${vip ? '🔒' : esc(p.cote)}</b>
        </div>
        <div class="detail">
          <small>CONFIANCE</small>
          <b>${vip ? '🔒' : esc(p.confiance) + '%'}</b>
        </div>
      </div>
      ${vip
        ? '<p class="locked-note">🔒 Réservé aux membres VIP</p>'
        : `<div class="analysis"><b>ANALYSE</b>${esc(p.analyse || '')}</div>`
      }
    </article>`;
}

async function chargerPronostics() {
  if (!picksEl) return;

  picksEl.innerHTML = '<p>Chargement des pronostics…</p>';

  try {
    const url = `${SUPABASE_URL}/rest/v1/pronostics?select=*&categorie=eq.public&publie=eq.true&order=created_at.desc`;

    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error('Erreur de connexion à Supabase.');
    }

    window.pronostics = await response.json();
    afficherListe();
  } catch (error) {
    console.error(error);
    picksEl.innerHTML =
      '<p>Impossible de charger les pronostics. Vérifie la connexion Supabase.</p>';
  }
}

function afficherListe() {
  const liste = (window.pronostics || []).filter(p =>
    currentFilter === 'Tous' ||
    String(p.sport).toLowerCase() === currentFilter.toLowerCase()
  );

  picksEl.innerHTML = liste.length
    ? liste.map(afficherPronostic).join('')
    : '<p>Aucun pronostic public publié pour le moment.</p>';
}

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b =>
      b.classList.remove('active')
    );
    button.classList.add('active');
    currentFilter = button.dataset.filter || 'Tous';
    if (currentFilter === 'all') currentFilter = 'Tous';
    afficherListe();
  });
});

chargerPronostics();
