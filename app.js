
const SUPABASE_URL = 'https://qvnmhvbuwbwtlemmqwxu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_B46lm_Pn2srdHQFSJzXe-Q_5fR5rMGU';

const picksEl = document.getElementById('picks');
let currentFilter = 'Tous';
window.pronostics = [];


const DOSSIER_LOGOS = './logos/';


const correspondancesLogos = {
  '1.fc köln': '1.FC Köln.png',
  '1.fc union berlin': '1.FC Union Berlin.png',
  '1.fsv mainz 05': '1.FSV Mainz 05.png',
  'ac milan': 'AC Milan.png',
  'ac monza': 'AC Monza.png',
  'acf fiorentina': 'ACF Fiorentina.png',
  'ajax': 'Ajax Amsterdam.png',
  'ajax amsterdam': 'Ajax Amsterdam.png',
  'alaves': 'Deportivo Alavés.png',
  'ang ers sco': 'Angers SCO.png',
  'angers': 'Angers SCO.png',
  'arsenal': 'Arsenal FC.png',
  'arsenal fc': 'Arsenal FC.png',
  'aston villa': 'Aston Villa.png',
  'atalanta': 'Atalanta BC.png',
  'athletic bilbao': 'Athletic Bilbao.png',
  'atletico madrid': 'Atlético de Madrid.png',
  'atletico de madrid': 'Atlético de Madrid.png',
  'bayer leverkusen': 'Bayer 04 Leverkusen.png',
  'bayer 04 leverkusen': 'Bayer 04 Leverkusen.png',
  'bayern': 'Bayern Munich.png',
  'bayern munich': 'Bayern Munich.png',
  'benfica': 'SL Benfica.png',
  'besiktas': 'Besiktas JK.png',
  'borussia dortmund': 'Borussia Dortmund.png',
  'borussia monchengladbach': 'Borussia Mönchengladbach.png',
  'bournemouth': 'AFC Bournemouth.png',
  'brentford': 'Brentford FC.png',
  'brighton': 'Brighton & Hove Albion.png',
  'barcelone': 'FC Barcelona.png',
  'barcelona': 'FC Barcelona.png',
  'fc barcelona': 'FC Barcelona.png',
  'chelsea': 'Chelsea FC.png',
  'chelsea fc': 'Chelsea FC.png',
  'crystal palace': 'Crystal Palace.png',
  'everton': 'Everton FC.png',
  'fenerbahce': 'Fenerbahce.png',
  'feyenoord': 'Feyenoord Rotterdam.png',
  'fulham': 'Fulham FC.png',
  'galatasaray': 'Galatasaray.png',
  'inter': 'Inter Milan.png',
  'inter milan': 'Inter Milan.png',
  'leeds': 'Leeds United.png',
  'leeds united': 'Leeds United.png',
  'le havre': 'Le Havre AC.png',
  'le havre ac': 'Le Havre AC.png',
  'lens': 'RC Lens.png',
  'rc lens': 'RC Lens.png',
  'lille': 'LOSC Lille.png',
  'losc lille': 'LOSC Lille.png',
  'liverpool': 'Liverpool FC.png',
  'liverpool fc': 'Liverpool FC.png',
  'lyon': 'Olympique Lyon.png',
  'olympique lyonnais': 'Olympique Lyon.png',
  'man city': 'Manchester City.png',
  'manchester city': 'Manchester City.png',
  'man united': 'Manchester United.png',
  'manchester united': 'Manchester United.png',
  'marseille': 'Olympique Marseille.png',
  'monaco': 'AS Monaco.png',
  'as monaco': 'AS Monaco.png',
  'napoli': 'SSC Napoli.png',
  'newcastle': 'Newcastle United.png',
  'newcastle united': 'Newcastle United.png',
  'nottingham forest': 'Nottingham Forest.png',
  'nice': 'OGC Nice.png',
  'ogc nice': 'OGC Nice.png',
  'paris sg': 'Paris Saint-Germain.png',
  'psg': 'Paris Saint-Germain.png',
  'paris saint-germain': 'Paris Saint-Germain.png',
  'paris saint germain': 'Paris Saint-Germain.png',
  'paris fc': 'Paris FC.png',
  'porto': 'FC Porto.png',
  'fc porto': 'FC Porto.png',
  'psv': 'PSV Eindhoven.png',
  'psv eindhoven': 'PSV Eindhoven.png',
  'real madrid': 'Real Madrid.png',
  'real sociedad': 'Real Sociedad.png',
  'roma': 'AS Roma.png',
  'as roma': 'AS Roma.png',
  'sevilla': 'Sevilla FC.png',
  'sevilla fc': 'Sevilla FC.png',
  'sporting': 'Sporting CP.png',
  'sporting cp': 'Sporting CP.png',
  'tottenham': 'Tottenham Hotspur.png',
  'tottenham hotspur': 'Tottenham Hotspur.png',
  'west ham': 'West Ham United.png',
  'werder bremen': 'SV Werder Bremen.png',
  'wolfsburg': 'Wolfsberger AC.png'
};


const logosNBA = {
  'atlanta hawks': 'atlanta.png',
  'boston celtics': 'boston-celtics.png',
  'brooklyn nets': 'brooklyn-nets.png',
  'charlotte hornets': 'charlotte-hornets.png',
  'chicago bulls': 'chicago-bulls.png',
  'cleveland cavaliers': 'cleveland-cavaliers.svg',
  'dallas mavericks': 'dallas-mavericks.png',
  'denver nuggets': 'denver-nuggets.png',
  'detroit pistons': 'detroit-pistons.svg',
  'golden state warriors': 'golden-state-warriors.png',
  'houston rockets': 'houston-rockets.png',
  'indiana pacers': 'indiana-pacers.png',
  'la clippers': 'la-clippers.png',
  'los angeles clippers': 'la-clippers.png',
  'lakers': 'los-angeles-lakers.svg',
  'memphis grizzlies': 'memphis-grizzlies.png',
  'miami heat': 'miami-heat.png',
  'milwaukee bucks': 'milwaukee-bucks.png',
  'minnesota timberwolves': 'minnesota-timberwolves.png',
  'new orleans pelicans': 'new-orleans-pelicans.png',
  'new york knicks': 'new-york-knicks.png',
  'oklahoma city thunder': 'oklahoma-city-thunder.png',
  'orlando magic': 'orlando-magic.png',
  'philadelphia 76ers': 'philadelphia-76ers.png',
  'phoenix suns': 'phoenix-suns.png',
  'portland trail blazers': 'portland-trail-blazers.png',
  'sacramento kings': 'sacramento-kings.png',
  'san antonio spurs': 'san-antonio-spurs.png',
  'toronto raptors': 'toronto-raptors.png',
  'utah jazz': 'utah-jazz.png',
  'washington wizards': 'washington-wizards.png'
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
    const [footballResponse, nbaResponse] = await Promise.all([
      fetch('https://api.github.com/repos/Liguedor/Liguedor/contents/logos'),
      fetch('https://api.github.com/repos/Liguedor/Liguedor/contents/logos/nba')
    ]);

    const football = footballResponse.ok
      ? await footballResponse.json()
      : [];

    const nba = nbaResponse.ok
      ? await nbaResponse.json()
      : [];

    fichiersLogos = [
      ...football
        .filter(f => f.type === 'file' && /\.(png|svg)$/i.test(f.name))
        .map(f => ({ nom: f.name, chemin: './logos/' + f.name })),
      ...nba
        .filter(f => f.type === 'file' && /\.(png|svg)$/i.test(f.name))
        .map(f => ({ nom: f.name, chemin: './logos/nba/' + f.name }))
    ];
  } catch (erreur) {
    console.warn('Chargement des logos :', erreur);
  }
}

function logoEquipe(nom) {
  if (!nom) return '';

  const nomBrut = String(nom).trim().toLowerCase();

  // Recherche du logo NBA dans les fichiers réellement chargés
  const nomNBA = logosNBA[nomBrut];

  if (nomNBA) {
    const logo = fichiersLogos.find(f =>
      f.chemin.toLowerCase() ===
      ('./logos/nba/' + nomNBA).toLowerCase()
    );

    if (logo) return logo.chemin;
  }

  // Recherche du logo de football
  const alias = correspondancesLogos[nomBrut];
  const nomRecherche = normaliserNom(
    (alias || nom).replace(/\.(png|svg)$/i, '')
  );

  const logo = fichiersLogos.find(f =>
    f.chemin.startsWith('./logos/') &&
    !f.chemin.startsWith('./logos/nba/') &&
    normaliserNom(f.nom.replace(/\.(png|svg)$/i, '')) === nomRecherche
  );

  return logo ? logo.chemin : '';
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
  const s = String(sport ?? '')
    .toLowerCase()
    .trim();

  if (s === 'all' || s === 'tous') return 'tous';
  if (s.includes('football') || s === 'foot') return 'football';
  if (s.includes('tennis')) return 'tennis';

  const multisports = [
    'basket', 'nba',
    'volleyball', 'volley',
    'hockey',
    'badminton',
    'rugby',
    'baseball',
    'ping-pong', 'ping pong', 'tennis de table',
    'mma',
    'boxe', 'boxing'
  ];

  if (multisports.some(sportNom => s.includes(sportNom))) {
    return 'multisports';
  }

  if (s.includes('multisport') || s.includes('autre')) {
    return 'multisports';
  }

  return s;
}

function iconeSport(sport) {
  const s = normaliserSport(sport);

  if (s === 'tennis') return '🎾';
  if (s === 'basket') return '🏀';

  return '⚽';
}

const portraitsJoueurs = {};

async function rechercherPortrait(joueur) {
  if (!joueur) return '';

  if (portraitsJoueurs[joueur]) {
    return portraitsJoueurs[joueur];
  }

  try {
    const url =
      'https://commons.wikimedia.org/w/api.php' +
      '?action=query&generator=search' +
      '&gsrsearch=' + encodeURIComponent('filetype:bitmap ' + joueur + ' tennis player') +
      '&gsrnamespace=6&gsrlimit=5&prop=imageinfo' +
      '&iiprop=url&iiurlwidth=160&format=json&origin=*';

    const response = await fetch(url);
    if (!response.ok) return '';

    const data = await response.json();
    const pages = Object.values(data.query?.pages || {});
    const image = pages[0];
    const portrait = image?.imageinfo?.[0]?.thumburl || '';

    portraitsJoueurs[joueur] = portrait;
    return portrait;
  } catch {
    return '';
  }
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
