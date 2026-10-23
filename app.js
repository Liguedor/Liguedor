
const SUPABASE_URL = 'https://qvnmhvbuwbwtlemmqwxu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_B46lm_Pn2srdHQFSJzXe-Q_5fR5rMGU';

const picksEl = document.getElementById('picks');
let currentFilter = 'Tous';
window.pronostics = [];

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
}

function valeur(p, ...cles) {
  for (const cle of cles) {
    if (p[cle] !== undefined && p[cle] !== null) {
      return p[cle];
    }
  }
  return '';
}

function afficherPronostic(p) {
  const categorie = String(valeur(p, 'categorie', 'catégorie')).toLowerCase();
  const vip = categorie === 'vip';

  const sport = valeur(p, 'sport') || 'Sport';
  const evenement = valeur(p, 'evenement', 'événement') || 'Match à préciser';
  const pronostic = valeur(p, 'prediction', 'prédiction', 'pronostic');
  const cote = valeur(p, 'cote');
  const confiance = valeur(p, 'confiance');
  const analyse = valeur(p, 'analyser', 'analyse');

  return `
    <article class="pick ${vip ? 'vip-locked' : ''}">
      <div class="pick-head">
        <span>${esc(sport)}</span>
        <span class="tag ${vip ? 'vip' : ''}">
          ${vip ? '♛ VIP' : 'PUBLIC'}
        </span>
      </div>
      <div class="match">
        <div class="team">
          <b>${esc(evenement)}</b>
        </div>
      </div>
      <div class="details">
        <div class="detail">
          <small>PRONOSTIC</small>
          <b>${vip ? '🔒 Contenu VIP' : esc(pronostic)}</b>
        </div>
        <div class="detail">
          <small>COTE</small>
          <b>${vip ? '🔒' : esc(cote)}</b>
        </div>
        <div class="detail">
          <small>CONFIANCE</small>
          <b>${vip ? '🔒' : esc(confiance) + '%'}</b>
        </div>
      </div>
      ${vip
        ? '<p class="locked-note">🔒 Réservé aux membres VIP</p>'
        : `<div class="analysis"><b>ANALYSE</b>${esc(analyse)}</div>`
      }
    </article>`;
}

async function chargerPronostics() {
  if (!picksEl) return;

  picksEl.innerHTML = '<p>Chargement des pronostics…</p>';

  try {
    const url =
      `${SUPABASE_URL}/rest/v1/pronostics` +
      '?select=*&categorie=eq.public&publie=eq.true&order=created_at.desc';

    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Supabase ${response.status}: ${detail}`);
    }

    window.pronostics = await response.json();
afficherListe();
afficherResultats();
  } catch (error) {
    console.error('Erreur de chargement :', error);
    picksEl.innerHTML =
      '<p>Impossible de charger les pronostics : ' +
      esc(error.message) + '</p>';
  }
}

function normaliserSport(sport) {
  const s = String(sport ?? '').toLowerCase().trim();

  if (s === 'all' || s === 'tous') return 'tous';
  if (s.includes('football')) return 'football';
  if (s.includes('tennis')) return 'tennis';
  if (s.includes('autre')) return 'autres sports';

  return s;
}

function afficherListe() {
  if (!picksEl) return;

  const liste = window.pronostics.filter(p =>
    normaliserSport(currentFilter) === 'tous' ||
    normaliserSport(p.sport) === normaliserSport(currentFilter)
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
    afficherListe();
  });
});

chargerPronostics();
function afficherResultats() {
  const zone = document.getElementById('resultsList');
  if (!zone) return;

  const termines = window.pronostics.filter(p => {
    const resultat = String(p.resultat || '').toLowerCase();
    return resultat === 'gagne' || resultat === 'perdu';
  });

  zone.innerHTML = termines.length
    ? termines.slice(0, 10).map(p => {
        const resultat = String(p.resultat).toLowerCase();
        const gagne = resultat === 'gagne';

        return `
          <div class="result-row">
            <span>${esc(p.evenement || 'Match')}</span>
            <span class="status">${gagne ? 'GAGNÉ ✅' : 'PERDU ❌'}</span>
            <b>${esc(p.cote ?? '—')}</b>
          </div>`;
      }).join('')
    : '<p>Aucun résultat terminé pour le moment.</p>';
}
