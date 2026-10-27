
const SUPABASE_URL = 'https://qvnmhvbuwbwtlemmqwxu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_B46lm_Pn2srdHQFSJzXe-Q_5fR5rMGU';

const picksEl = document.getElementById('picks');
let currentFilter = 'Tous';
window.pronostics = [];

const DOSSIER_LOGOS = './logos/';



const correspondancesLogos = {
  'arsenal': 'Arsenal FC.png',
  'liverpool': 'Liverpool FC.png',
  'lyon': 'Olympique Lyon.png',
  'olympique lyonnais': 'Olympique Lyon.png',
  'hoffenheim': 'TSG 1899 Hoffenheim.png',
  'psg': 'Paris Saint-Germain.png',
  'paris sg': 'Paris Saint-Germain.png',
  'inter': 'Inter Milan.png',
  'bayern': 'Bayern Munich.png',
  'barcelone': 'FC Barcelona.png',
  'barcelona': 'FC Barcelona.png',
  'man city': 'Manchester City.png',
  'man united': 'Manchester United.png'
};

let fichiersLogos = [];

function normaliserNom(nom) {
  return String(nom || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

async function chargerLogos() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/Liguedor/Liguedor/contents/logos'
    );

    if (!response.ok) throw new Error('Logos indisponibles');

    const fichiers = await response.json();

    fichiersLogos = fichiers
      .filter(f => f.type === 'file' && /\.png$/i.test(f.name))
      .map(f => f.name);

  } catch (erreur) {
    console.warn('Chargement des logos :', erreur);
  }
}

function logoEquipe(nom) {
  if (!nom) return '';

  const recherche = normaliserNom(nom);

  const alias = correspondancesLogos[
    String(nom).trim().toLowerCase()
  ];

  const fichier = alias || fichiersLogos.find(f =>
    normaliserNom(f.replace(/\.png$/i, '')) === recherche
  );

  return fichier
    ? DOSSIER_LOGOS + encodeURIComponent(fichier)
    : '';
}

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
  const equipeDomicile = valeur(p, 'equipe_domicile');
  const equipeExterieur = valeur(p, 'equipe_exterieur');
  const logoDomicile = logoEquipe(valeur(p, 'equipe_domicile')) || valeur(p, 'logo_domicile');
const logoExterieur = logoEquipe(valeur(p, 'equipe_exterieur')) || valeur(p, 'logo_exterieur');
  const pronostic = valeur(p, 'prediction', 'prédiction', 'pronostic');
  const cote = valeur(p, 'cote');
  const confiance = valeur(p, 'confiance');
  const analyse = valeur(p, 'analyser', 'analyse');

  const resultat = String(p.resultat || 'en_attente').toLowerCase();

  const statut = resultat === 'gagne'
    ? '<span class="pick-status won">GAGNÉ ✅</span>'
    : resultat === 'perdu'
      ? '<span class="pick-status lost">PERDU ❌</span>'
      : '<span class="pick-status pending">EN ATTENTE ⏳</span>';

  return `
    <article class="pick ${vip ? 'vip-locked' : ''}">
      <div class="pick-head">
        <span>${esc(sport)}</span>
        <span class="tag ${vip ? 'vip' : ''}">
          ${vip ? '♛ VIP' : 'PUBLIC'}
        </span>
      </div>
      ${statut}
      
      
      <div class="match">
        <div class="team">
          ${logoDomicile
            ? `<img class="team-logo" src="${esc(logoDomicile)}" alt="${esc(equipeDomicile)}" loading="lazy">`
            : `<div class="crest">${iconeSport(sport)}</div>`}
          <b>${esc(equipeDomicile || evenement)}</b>
        </div>
        ${equipeExterieur ? `
          <span class="vs">VS</span>
          <div class="team">
            ${logoExterieur
              ? `<img class="team-logo" src="${esc(logoExterieur)}" alt="${esc(equipeExterieur)}" loading="lazy">`
              : `<div class="crest">${iconeSport(sport)}</div>`}
            <b>${esc(equipeExterieur)}</b>
          </div>
        ` : ''}
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

chargerLogos().then(() => chargerPronostics());
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
// Menu de navigation mobile
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const ouvert = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(ouvert));
    menuBtn.setAttribute(
      'aria-label',
      ouvert ? 'Fermer le menu' : 'Ouvrir le menu'
    );
  });

  nav.querySelectorAll('a').forEach(lien => {
    lien.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Ouvrir le menu');
    });
  });
}
