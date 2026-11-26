
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
  'los angeles lakers': 'los-angeles-lakers.svg',
  'atlanta hawks': 'Atlanta.png',
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
  'los angeles lakers': 'los-angeles-lakers.svg',
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
  'portland trail blazers': 'portland.png',
  'sacramento kings': 'sacramento.png',
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

  // Recherche NBA
  const nomNBA = logosNBA[nomBrut];

  if (nomNBA) {
    const cheminNBA = './logos/nba/' + nomNBA;

    const logoNBA = fichiersLogos.find(f =>
      f.chemin.toLowerCase() === cheminNBA.toLowerCase()
    );

    if (logoNBA) return logoNBA.chemin;
  }

  // Recherche football
  const alias = correspondancesLogos[nomBrut];
  const nomRecherche = normaliserNom(
    (alias || nom).replace(/\.(png|svg)$/i, '')
  );

  const logoFootball = fichiersLogos.find(f =>
    f.chemin.startsWith('./logos/') &&
    !f.chemin.startsWith('./logos/nba/') &&
    normaliserNom(f.nom.replace(/\.(png|svg)$/i, '')) === nomRecherche
  );

  return logoFootball ? logoFootball.chemin : '';
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

  const sport = (valeur(p, 'sport') || 'Sport').toUpperCase();
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

  if (s === 'tous' || s === 'all') return 'tous';

  if (s === 'football' || s === 'foot') {
    return 'football';
  }

  if (s === 'tennis') {
    return 'tennis';
  }

  const sportsMultisports = [
    'basket',
    'volleyball',
    'mma',
    'hockey',
    'badminton',
    'rugby',
    'autres'
  ];

  if (sportsMultisports.includes(s)) {
    return 'multisports';
  }

  return s;
}

function iconeSport(sport) {
  const s = String(sport || '').toLowerCase();

  if (s.includes('tennis')) return '🎾';
  if (s.includes('basket') || s.includes('nba')) return '🏀';
  if (s.includes('volley')) return '🏐';
  if (s.includes('hockey')) return '🏒';

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
  document.querySelectorAll('.sport-card').forEach(card => {
  card.addEventListener('click', () => {
    const nom = card.querySelector('b')?.textContent.trim().toLowerCase();

    let filtre = '';

    if (nom.includes('football')) filtre = 'Football';
    else if (nom.includes('tennis')) filtre = 'Tennis';
    else if (nom.includes('multisports')) filtre = 'Multisports';

    if (filtre) {
      const bouton = document.querySelector(
        `.filter[data-filter="${filtre}"]`
      );
      if (bouton) bouton.click();
    }
  });
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
// =====================================
// STATISTIQUES PUBLIQUES LIGUE D'OR
// =====================================


async function chargerStatistiques() {
  const zone = document.querySelector('#stats .panel');
  if (!zone) return;

  const sportChoisi =
    document.getElementById('filtreSportStats')?.value || 'tous';

  const periodeChoisie =
    Number(document.getElementById('filtrePeriodeStats')?.value || 0);

  zone.innerHTML = '<p>Chargement des statistiques...</p>';

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/rpc/statistiques_avancees_ligue_or`,
      {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          p_sport: sportChoisi,
          p_jours: periodeChoisie
        })
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const stats = await response.json();

    function afficherCarte(titre, donnees) {
      const gagnes = Number(donnees.gagnes || 0);
      const perdus = Number(donnees.perdus || 0);
      const attente = Number(donnees.en_attente || 0);
      const total = Number(donnees.total || 0);
      const rembourses = Number(donnees.rembourses || 0);
      const annules = Number(donnees.annules || 0);

      const termines = gagnes + perdus;
      const taux = termines > 0
        ? Math.round((gagnes / termines) * 100)
        : 0;

      const sports = (donnees.par_sport || []).map(s => `
        <div style="display:flex;justify-content:space-between;
          gap:10px;padding:9px 0;border-bottom:1px solid #393939">
          <b>${esc(s.sport)}</b>
          <span>
            ${Number(s.gagnes)} gagnés /
            ${Number(s.perdus)} perdus
          </span>
        </div>
      `).join('');

      return `
        <div style="background:#171717;border:1px solid #b58a35;
          border-radius:12px;padding:18px;margin-top:15px">

          <h3 style="color:#e4bd62">${titre}</h3>

          <p>Pronostics publiés : <b>${total}</b></p>
          <p>Gagnés : <b>${gagnes}</b> ✅</p>
          <p>Perdus : <b>${perdus}</b> ❌</p>
          <p>En attente : <b>${attente}</b> ⏳</p>
          <p>Remboursés : <b>${rembourses}</b></p>
          <p>Annulés : <b>${annules}</b></p>

          <p style="color:#e4bd62;font-size:28px;font-weight:bold">
            ${taux} %
          </p>
          <small>Taux de réussite</small>

          <h4 style="color:#e4bd62;margin-top:20px">
            Performances par sport
          </h4>

          ${sports || '<p>Aucune donnée sportive pour cette sélection.</p>'}
        </div>
      `;
    }

    zone.innerHTML = `
      <div class="section-head compact">
        <div>
          <p class="eyebrow">PERFORMANCES</p>
          <h2>Statistiques <em>globales</em></h2>
        </div>
      </div>

      <p>Découvrez les performances de LIGUE D’OR.</p>

      <div style="display:grid;gap:12px;margin:20px 0">
        <label for="filtreSportStats">Filtrer par sport</label>
        <select id="filtreSportStats" style="padding:12px;
          border-radius:8px;background:#222;color:white">
          <option value="tous">Tous les sports</option>
          <option value="football">Football</option>
          <option value="tennis">Tennis</option>
          <option value="basket">Basket</option>
          <option value="panier">Panier</option>
          <option value="volleyball">Volleyball</option>
          <option value="autres">Autres</option>
        </select>

        <label for="filtrePeriodeStats">Filtrer par période</label>
        <select id="filtrePeriodeStats" style="padding:12px;
          border-radius:8px;background:#222;color:white">
          <option value="0">Depuis le lancement</option>
          <option value="7">7 derniers jours</option>
          <option value="30">30 derniers jours</option>
          <option value="90">3 derniers mois</option>
        </select>
      </div>

      ${afficherCarte('👑 PUBLIC', stats.public)}
      ${afficherCarte('💎 VIP', stats.vip)}

      <p class="tiny muted">
        Le taux de réussite est calculé sur les pronostics gagnés et perdus.
        Les pronostics en attente, remboursés et annulés sont exclus du calcul.
      </p>
    `;

    document.getElementById('filtreSportStats')
      .value = sportChoisi;

    document.getElementById('filtrePeriodeStats')
      .value = String(periodeChoisie);

    document.getElementById('filtreSportStats')
      .addEventListener('change', chargerStatistiques);

    document.getElementById('filtrePeriodeStats')
      .addEventListener('change', chargerStatistiques);

  } catch (error) {
    console.error('Erreur statistiques :', error);
    zone.innerHTML =
      '<p>Impossible de charger les statistiques pour le moment.</p>';
  }
}

chargerStatistiques();

/* Menu latéral premium LIGUE D'OR */
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');

function ouvrirMenu(ouvrir) {
  if (!nav || !menuBtn || !menuOverlay) return;

  nav.classList.toggle('open', ouvrir);
  menuOverlay.classList.toggle('open', ouvrir);
  menuBtn.setAttribute('aria-expanded', String(ouvrir));
  menuBtn.setAttribute(
    'aria-label',
    ouvrir ? 'Fermer le menu' : 'Ouvrir le menu'
  );
  document.body.style.overflow = ouvrir ? 'hidden' : '';
}

if (menuBtn && nav && menuOverlay) {
  menuBtn.addEventListener('click', () => {
    ouvrirMenu(!nav.classList.contains('open'));
  });

  closeMenu?.addEventListener('click', () => ouvrirMenu(false));
  menuOverlay.addEventListener('click', () => ouvrirMenu(false));

  nav.querySelectorAll('a').forEach(lien => {
    lien.addEventListener('click', () => ouvrirMenu(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') ouvrirMenu(false);
  });
}




// =====================================
// LIGUE D'OR — ADMINISTRATION
// =====================================

const adminLogin = document.getElementById("adminLogin");
const adminForm = document.getElementById("adminLoginForm");
const adminMessage = document.getElementById("adminMessage");

let adminClient = null;
let adminDashboard = null;

if (window.supabase && window.supabase.createClient) {
  adminClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

if (adminLogin) {
  adminDashboard = document.createElement("section");
  adminDashboard.id = "adminDashboard";
  adminDashboard.hidden = true;
  adminDashboard.style.cssText = `
    max-width:1100px;
    margin:30px auto;
    padding:20px;
    color:#fff;
    background:#111;
    border:1px solid #b58a35;
    border-radius:16px;
  `;
  adminLogin.insertAdjacentElement("afterend", adminDashboard);
}

function afficherConnexionAdmin() {
  const actif = window.location.hash === "#admin";
  if (adminLogin) adminLogin.hidden = !actif;
  if (!actif && adminDashboard) adminDashboard.hidden = true;
}

afficherConnexionAdmin();
window.addEventListener("hashchange", afficherConnexionAdmin);

function afficherAccueilAdmin(pronostics) {
  const publics = pronostics.filter(p =>
    String(p.categorie || "").toLowerCase() === "public"
  );
  const vips = pronostics.filter(p =>
    String(p.categorie || "").toLowerCase() === "vip"
  );

 const resultatNormalise = p =>
  String(p.resultat || "en_attente").toLowerCase();

const gagnes = pronostics.filter(p =>
  resultatNormalise(p) === "gagne"
).length;

const perdus = pronostics.filter(p =>
  resultatNormalise(p) === "perdu"
).length;

const rembourses = pronostics.filter(p =>
  resultatNormalise(p) === "rembourse"
).length;

const annules = pronostics.filter(p =>
  ["annule", "annulé"].includes(resultatNormalise(p))
).length;

const attente = pronostics.filter(p =>
  !["gagne", "perdu", "rembourse", "annule", "annulé"]
    .includes(resultatNormalise(p))
).length;

  const lignes = pronostics.map(p => `
  <div data-pronostic-id="${esc(p.id)}"
       style="padding:13px;margin:10px 0;background:#202020;border:1px solid #444;border-radius:10px">

    <b>${esc(p.evenement || "Événement à préciser")}</b>

    <div style="color:#d5ad55;margin-top:6px">
      ${esc(p.categorie || "—")} · ${esc(p.sport || "—")}
    </div>

    <div style="margin-top:5px">
      Résultat : ${esc(p.resultat || "en_attente")}
      · Cote : ${esc(p.cote ?? "—")}
      · ${p.publie ? "Publié" : "Brouillon"}
    </div>

    <button type="button"
  data-edit-id="${esc(p.id)}"
  style="margin-top:12px;padding:10px;background:#d6ad52;border:0;border-radius:7px;font-weight:bold">
  ✏️ MODIFIER
</button>

<button type="button"
  data-delete-id="${esc(p.id)}"
  style="margin-top:12px;margin-left:8px;padding:10px;background:#9b3030;color:white;border:0;border-radius:7px;font-weight:bold">
  🗑️ SUPPRIMER
</button>
  
`).join("");
  adminDashboard.innerHTML = `
    <h2 style="color:#e4bd62">👑 LIGUE D’OR — ADMIN</h2>
    <p>Bienvenue dans ton espace de gestion.</p>

    <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:20px 0">
      <div style="background:#222;padding:16px;border-radius:10px">
        <small>PRONOSTICS PUBLICS</small><h2>${publics.length}</h2>
      </div>
      <div style="background:#222;padding:16px;border-radius:10px">
  <small>REMBOURSÉS</small><h2>${rembourses}</h2>
</div>

<div style="background:#222;padding:16px;border-radius:10px">
  <small>ANNULÉS</small><h2>${annules}</h2>
</div>
      <div style="background:#222;padding:16px;border-radius:10px">
        <small>PRONOSTICS VIP</small><h2>${vips.length}</h2>
      </div>
      <div style="background:#222;padding:16px;border-radius:10px">
        <small>GAGNÉS</small><h2>${gagnes}</h2>
      </div>
      <div style="background:#222;padding:16px;border-radius:10px">
        <small>PERDUS</small><h2>${perdus}</h2>
      </div>
    </div>

    <p>Pronostics en attente : <b>${attente}</b></p>

    <hr style="border-color:#555;margin:25px 0">

    <h2 style="color:#e4bd62">➕ Ajouter un pronostic</h2>

    <form id="nouveauPronostic" style="display:grid;gap:12px">
      <label>Sport</label>
      <select name="sport" required style="padding:12px">
  <option value="">Choisir une catégorie</option>
<option value="football">FOOTBALL</option>
<option value="tennis">TENNIS</option>
<option value="multisport">MULTISPORT</option>
</select>

      <label>Événement / Match</label>
      <input name="evenement" required placeholder="Ex : PSG - Marseille" style="padding:12px">

      <label>Équipe à domicile (facultatif)</label>
      <input name="equipe_domicile" placeholder="Équipe à domicile" style="padding:12px">

      <label>Équipe à l'extérieur (facultatif)</label>
      <input name="equipe_exterieur" placeholder="Équipe à l'extérieur" style="padding:12px">

      <label>Pronostic</label>
      <input name="pronostic" required placeholder="Ex : Victoire du PSG" style="padding:12px">

      <label>Cote</label>
      <input name="cote" type="number" min="1.01" step="0.01" required placeholder="Ex : 1.75" style="padding:12px">

      <label>Confiance (%)</label>
      <input name="confiance" type="number" min="1" max="100" required placeholder="Ex : 85" style="padding:12px">

      <label>Analyse</label>
      <textarea name="analyse" rows="5" required placeholder="Écris ton analyse ici..." style="padding:12px"></textarea>

      <label>Catégorie</label>
      <select name="categorie" required style="padding:12px">
        <option value="public">Public</option>
        <option value="vip">VIP</option>
      </select>

      <label>Publication</label>
      <select name="publie" required style="padding:12px">
        <option value="false">Brouillon — non visible</option>
        <option value="true">Publié — visible selon la catégorie</option>
      </select>

      <button type="submit" style="padding:15px;background:#d6ad52;border:0;border-radius:8px;font-weight:bold">
        ENREGISTRER LE PRONOSTIC
      </button>
      <p id="creationMessage"></p>
    </form>

    <hr style="border-color:#555;margin:25px 0">

    <h3 style="color:#e4bd62">Derniers pronostics</h3>
    ${lignes || "<p>Aucun pronostic enregistré.</p>"}

    <button id="adminRefresh" style="padding:12px;background:#d6ad52;border:0;border-radius:8px;font-weight:bold">
      Actualiser les données
    </button>

    <button id="adminLogout" style="padding:12px;margin-left:8px;background:#444;color:white;border:0;border-radius:8px">
      Déconnexion
    </button>
  `;

  adminDashboard.hidden = false;
adminDashboard.querySelectorAll("[data-edit-id]").forEach(bouton => {
  bouton.addEventListener("click", () => {
    ouvrirEditionPronostic(bouton.dataset.editId, pronostics);
  });
});
  adminDashboard.querySelectorAll("[data-delete-id]").forEach(bouton => {
  bouton.addEventListener("click", async () => {
    const id = bouton.dataset.deleteId;

    const confirmation = confirm(
      "Attention : veux-tu vraiment supprimer définitivement ce pronostic ?"
    );

    if (!confirmation) return;

    bouton.disabled = true;
    bouton.textContent = "SUPPRESSION...";

    try {
      const { error } = await adminClient
        .from("pronostics")
        .delete()
        .eq("id", id);

      if (error) throw error;

      alert("Pronostic supprimé avec succès !");

      await chargerDashboardAdmin();

    } catch (error) {
      alert("Erreur lors de la suppression : " + error.message);
      bouton.disabled = false;
      bouton.textContent = "🗑️ SUPPRIMER";
    }
  });
});
  adminDashboard.querySelectorAll("[data-result-id]").forEach(bouton => {
  bouton.addEventListener("click", async () => {
    const id = bouton.dataset.resultId;

    const select = adminDashboard.querySelector(
      `[data-result-select="${id}"]`
    );

    const resultat = select.value;

    bouton.disabled = true;
    bouton.textContent = "ENREGISTREMENT...";

    try {
      const { error } = await adminClient
        .from("pronostics")
        .update({ resultat: resultat })
        .eq("id", id);

      if (error) throw error;

      await chargerDashboardAdmin();

    } catch (error) {
      alert("Erreur : " + error.message);
      bouton.disabled = false;
      bouton.textContent = "ENREGISTRER LE RÉSULTAT";
    }
  });
});
  adminDashboard.querySelector("#adminRefresh")
    .addEventListener("click", chargerDashboardAdmin);

  adminDashboard.querySelector("#adminLogout")
    .addEventListener("click", async () => {
      await adminClient.auth.signOut();
      adminDashboard.hidden = true;
      adminLogin.hidden = window.location.hash !== "#admin";
      if (adminMessage) adminMessage.textContent = "Vous êtes déconnecté.";
    });

  adminDashboard.querySelector("#nouveauPronostic")
    .addEventListener("submit", enregistrerPronostic);
}

async function ouvrirEditionPronostic(id, pronostics) {
  const p = pronostics.find(item => String(item.id) === String(id));
  if (!p) return;

  const carte = [...adminDashboard.querySelectorAll("[data-pronostic-id]")]
    .find(el => el.dataset.pronosticId === String(id));

  if (!carte) return;

  carte.innerHTML = `
    <h3 style="color:#e4bd62">Modifier le pronostic</h3>

    <form id="formEdition" style="display:grid;gap:10px">
      <label>Sport</label>
      <select name="sport" required style="padding:12px">
  ${["football","tennis","multisport"].map(s =>
    `<option value="${s}" ${normaliserSport(p.sport) === s ? "selected" : ""}>${s.toUpperCase()}</option>`
  ).join("")}
</select>

      <label>Événement / Match</label>
      <input name="evenement" required value="${esc(p.evenement)}" style="padding:12px">

      <label>Équipe à domicile</label>
      <input name="equipe_domicile" value="${esc(p.equipe_domicile || "")}" style="padding:12px">

      <label>Équipe à l'extérieur</label>
      <input name="equipe_exterieur" value="${esc(p.equipe_exterieur || "")}" style="padding:12px">

      <label>Pronostic</label>
      <input name="pronostic" required value="${esc(p.pronostic || "")}" style="padding:12px">

      <label>Cote</label>
      <input name="cote" type="number" min="1.01" step="0.01"
        required value="${esc(p.cote)}" style="padding:12px">

      <label>Confiance (%)</label>
      <input name="confiance" type="number" min="1" max="100"
        required value="${esc(p.confiance)}" style="padding:12px">

      <label>Analyse</label>
      <textarea name="analyse" rows="5" required style="padding:12px">${esc(p.analyse || "")}</textarea>

      <label>Catégorie</label>
      <select name="categorie" style="padding:12px">
        <option value="public" ${p.categorie === "public" ? "selected" : ""}>Public</option>
        <option value="vip" ${p.categorie === "vip" ? "selected" : ""}>VIP</option>
      </select>
<label>Résultat du pronostic</label>
<select name="resultat" style="padding:12px">
  <option value="en_attente" ${p.resultat === "en_attente" ? "selected" : ""}>⏳ En attente</option>
  <option value="gagne" ${p.resultat === "gagne" ? "selected" : ""}>🟢 Gagné</option>
  <option value="perdu" ${p.resultat === "perdu" ? "selected" : ""}>🔴 Perdu</option>
  <option value="rembourse" ${p.resultat === "rembourse" ? "selected" : ""}>🔵 Remboursé</option>
  <option value="annule" ${p.resultat === "annule" || p.resultat === "annulé" ? "selected" : ""}>⚪ Annulé</option>
</select>
      <label>Publication</label>
      <select name="publie" style="padding:12px">
        <option value="false" ${!p.publie ? "selected" : ""}>Brouillon</option>
        <option value="true" ${p.publie ? "selected" : ""}>Publié</option>
      </select>

      <button type="submit" style="padding:13px;background:#d6ad52;border:0;border-radius:8px;font-weight:bold">
        ENREGISTRER LES MODIFICATIONS
      </button>

      <button type="button" id="annulerEdition"
        style="padding:12px;background:#444;color:white;border:0;border-radius:8px">
        ANNULER
      </button>

      <p id="editionMessage"></p>
    </form>
  `;

  const form = carte.querySelector("#formEdition");

  carte.querySelector("#annulerEdition").addEventListener("click", () => {
    afficherAccueilAdmin(pronostics);
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const valeurs = new FormData(form);
    const message = carte.querySelector("#editionMessage");
    const bouton = form.querySelector('button[type="submit"]');

    const modifications = {
      sport: valeurs.get("sport"),
      evenement: valeurs.get("evenement").trim(),
      equipe_domicile: valeurs.get("equipe_domicile").trim() || null,
      equipe_exterieur: valeurs.get("equipe_exterieur").trim() || null,
      pronostic: valeurs.get("pronostic").trim(),
      cote: Number(valeurs.get("cote")),
      confiance: Number(valeurs.get("confiance")),
      analyse: valeurs.get("analyse").trim(),
      categorie: valeurs.get("categorie"),
      resultat: valeurs.get("resultat"),
      publie: valeurs.get("publie") === "true"
    };

    bouton.disabled = true;
    message.textContent = "Enregistrement en cours...";

    try {
      const { error } = await adminClient
        .from("pronostics")
        .update(modifications)
        .eq("id", id);

      if (error) throw error;

      message.textContent = "✅ Modifications enregistrées !";
      await chargerDashboardAdmin();

    } catch (error) {
      message.textContent = "❌ Erreur : " + error.message;
      bouton.disabled = false;
    }
  });
}

async function enregistrerPronostic(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const message = adminDashboard.querySelector("#creationMessage");
  const bouton = form.querySelector('button[type="submit"]');
  const valeurs = new FormData(form);

  const pronostic = {
    sport: valeurs.get("sport"),
    evenement: valeurs.get("evenement").trim(),
    equipe_domicile: valeurs.get("equipe_domicile").trim() || null,
    equipe_exterieur: valeurs.get("equipe_exterieur").trim() || null,
    pronostic: valeurs.get("pronostic").trim(),
    cote: Number(valeurs.get("cote")),
    confiance: Number(valeurs.get("confiance")),
    analyse: valeurs.get("analyse").trim(),
    categorie: valeurs.get("categorie"),
    publie: valeurs.get("publie") === "true",
    resultat: "en_attente"
  };

  bouton.disabled = true;
  message.textContent = "Enregistrement en cours...";

  try {
    const { error } = await adminClient
      .from("pronostics")
      .insert([pronostic]);

    if (error) throw error;

    message.textContent = "✅ Pronostic enregistré avec succès !";
    form.reset();
    await chargerDashboardAdmin();

  } catch (error) {
    message.textContent = "❌ Erreur : " + error.message;
    bouton.disabled = false;
  }
}

async function chargerDashboardAdmin() {
  adminDashboard.innerHTML = "<p>Chargement des données...</p>";

  const { data, error } = await adminClient
    .from("pronostics")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    adminDashboard.innerHTML =
      "<p>Erreur de chargement : " + esc(error.message) + "</p>";
    return;
  }

  afficherAccueilAdmin(data || []);
}

if (adminForm && adminClient) {
  adminForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;

    adminMessage.textContent = "Vérification en cours...";

    try {
      const { data, error } = await adminClient.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      const { data: admin, error: adminError } = await adminClient
        .from("admins")
        .select("user_id")
        .eq("user_id", data.user.id)
        .maybeSingle();

      if (adminError) throw adminError;

      if (!admin) {
        await adminClient.auth.signOut();
        throw new Error("Compte non autorisé.");
      }

      adminMessage.textContent = "Connexion réussie !";
      adminLogin.hidden = true;
      await chargerDashboardAdmin();

    } catch (error) {
      adminMessage.textContent = error.message;
    }
  });
}
