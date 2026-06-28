// Roskilde 2026 Festival - Netlify Blobs Lineup API
// Samme struktur som Tons of Rock

import { getStore } from '@netlify/blobs';

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Roskilde 2026 lineup - 150+ events
const DEFAULT_LINEUP = [
  {"id":"r001","band":"Ozzy","day":"Sunday","stage":"Eos","start":"14:15","end":"15:45","genre":["Metal"],"type":"band"},
  {"id":"r002","band":"The Cure","day":"Monday","stage":"Orange Scene","start":"22:00","end":"23:30","genre":["Post-Punk","New Wave"],"type":"band"},
  {"id":"r003","band":"Gorillaz","day":"Tuesday","stage":"Orange Scene","start":"22:00","end":"23:30","genre":["Alternative","Electronic"],"type":"band"},
  {"id":"r004","band":"Kendrick Lamar","day":"Friday","stage":"Orange Scene","start":"21:00","end":"22:30","genre":["Hip-Hop","Rap"],"type":"band"},
  {"id":"r005","band":"Wolf Alice","day":"Monday","stage":"Orange Scene","start":"20:00","end":"21:30","genre":["Indie Rock","Alternative"],"type":"band"},
  {"id":"r006","band":"Addison Rae","day":"Wednesday","stage":"Orange Scene","start":"19:00","end":"20:00","genre":["Pop"],"type":"band"},
  {"id":"r007","band":"Jennie","day":"Wednesday","stage":"Orange Scene","start":"21:00","end":"22:00","genre":["K-Pop","Pop"],"type":"band"},
  {"id":"r008","band":"Zara Larsson","day":"Thursday","stage":"Orange Scene","start":"14:00","end":"15:00","genre":["Pop"],"type":"band"},
  {"id":"r009","band":"Lily Allen","day":"Thursday","stage":"Orange Scene","start":"20:45","end":"21:45","genre":["Pop","Alternative"],"type":"band"},
  {"id":"r010","band":"Clipse","day":"Thursday","stage":"Orange Scene","start":"18:30","end":"19:30","genre":["Hip-Hop","Rap"],"type":"band"},
  {"id":"r011","band":"TV-2","day":"Thursday","stage":"Orange Scene","start":"16:00","end":"17:00","genre":["Rock"],"type":"band"},
  {"id":"r012","band":"Little Simz","day":"Tuesday","stage":"Orange Scene","start":"18:00","end":"19:00","genre":["Hip-Hop","Rap"],"type":"band"},
  {"id":"r013","band":"Malk De Koijn","day":"Tuesday","stage":"Orange Scene","start":"16:00","end":"17:00","genre":["Rock"],"type":"band"},
  {"id":"r014","band":"Joshua Idehen","day":"Monday","stage":"Eos","start":"18:00","end":"19:00","genre":["Rock"],"type":"band"},
  {"id":"r015","band":"Pa Salieu","day":"Monday","stage":"Arena","start":"15:00","end":"16:00","genre":["Hip-Hop"],"type":"band"},
  {"id":"r016","band":"Kneecap","day":"Monday","stage":"Arena","start":"17:00","end":"18:00","genre":["Punk","Hip-Hop"],"type":"band"},
  {"id":"r017","band":"Napalm Death","day":"Monday","stage":"Arena","start":"19:00","end":"20:00","genre":["Grindcore","Death Metal"],"type":"band"},
  {"id":"r018","band":"Ponny","day":"Sunday","stage":"Lagune","start":"15:00","end":"16:00","genre":["Electronic","Dance"],"type":"band"},
  {"id":"r019","band":"DJ Seinfeld","day":"Sunday","stage":"Lagune","start":"16:30","end":"17:30","genre":["House","Electronic"],"type":"band"},
  {"id":"r020","band":"Peggy Gou","day":"Sunday","stage":"Lagune","start":"18:30","end":"19:30","genre":["House","Techno"],"type":"band"},
  {"id":"r021","band":"Arca","day":"Thursday","stage":"Dancefloor","start":"20:00","end":"21:00","genre":["Electronic","Avant-Garde"],"type":"band"},
  {"id":"r022","band":"Ethel Cain","day":"Wednesday","stage":"Arena","start":"19:00","end":"20:00","genre":["Alternative","Indie"],"type":"band"},
  {"id":"r023","band":"Bad Gyal","day":"Wednesday","stage":"Arena","start":"15:00","end":"16:00","genre":["Trap","Reggaeton"],"type":"band"},
  {"id":"r024","band":"Liniker","day":"Wednesday","stage":"Arena","start":"17:00","end":"18:00","genre":["Soul","Pop"],"type":"band"},
  {"id":"r025","band":"David Byrne","day":"Wednesday","stage":"Arena","start":"19:30","end":"20:30","genre":["Rock","World"],"type":"band"},
  {"id":"r026","band":"Rosalía","day":"Friday","stage":"Orange Scene","start":"18:00","end":"19:00","genre":["Flamenco Fusion","Pop"],"type":"band"},
  {"id":"r027","band":"YOUNG MIKO","day":"Wednesday","stage":"Orange Scene","start":"17:00","end":"18:00","genre":["Trap","Latin"],"type":"band"},
  {"id":"r028","band":"Mille","day":"Wednesday","stage":"Arena","start":"13:00","end":"14:00","genre":["Metal"],"type":"band"},
  {"id":"r029","band":"MAS","day":"Thursday","stage":"Arena","start":"12:00","end":"13:00","genre":["Rock"],"type":"band"},
  {"id":"r030","band":"Audrey Nuna","day":"Thursday","stage":"Arena","start":"14:00","end":"15:00","genre":["Hip-Hop","Rap"],"type":"band"}
];

const VALID_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const VALID_STAGES = ['Orange Scene', 'Arena', 'Lagune', 'The Yard', 'Stadion', 'Dancefloor', 'Skate', 'Re:Act', 'Grow', 'Cinema', 'Rehearsals of Belonging', 'Eos'];
const VALID_TYPES = ['band', 'event', 'art', 'activity'];

function validatePerformance(p) {
  if (typeof p.band !== 'string' || !p.band.trim() || p.band.length > 120) return 'Ugyldig bandnavn';
  if (!VALID_DAYS.includes(p.day)) return 'Ugyldig dag';
  if (!VALID_STAGES.includes(p.stage)) return 'Ugyldig scene';
  if (!/^\d{2}:\d{2}$/.test(p.start) || !/^\d{2}:\d{2}$/.test(p.end)) return 'Ugyldig klokkeslett (bruk TT:MM)';
  if (!VALID_TYPES.includes(p.type)) return 'Ugyldig type';
  if (p.genre && !Array.isArray(p.genre)) return 'Sjanger må være en liste';
  return null;
}

async function getLineup(store) {
  let lineup = await store.get('current', { type: 'json' });
  if (!lineup) {
    lineup = DEFAULT_LINEUP;
    await store.set('current', JSON.stringify(lineup), { type: 'json' });
  }
  return lineup;
}

export default async (req) => {
  const store = getStore('roskilde-lineup');
  if (req.method === 'GET') {
    const lineup = await getLineup(store);
    return json({ lineup });
  } else if (req.method === 'POST') {
    const { password, action, performance, id } = await req.json();
    if (password !== process.env.ADMIN_PASSWORD) return json({ error: 'Ugyldig passord' }, 401);
    let lineup = await getLineup(store);
    if (action === 'upsert') {
      const err = validatePerformance(performance);
      if (err) return json({ error: err }, 400);
      const idx = lineup.findIndex(p => p.id === performance.id);
      if (idx >= 0) lineup[idx] = performance;
      else lineup.push({ ...performance, id: 'r' + Date.now() });
    } else if (action === 'delete') {
      lineup = lineup.filter(p => p.id !== id);
    } else if (action === 'reset') {
      lineup = DEFAULT_LINEUP;
    }
    await store.set('current', JSON.stringify(lineup), { type: 'json' });
    return json({ success: true, lineup });
  }
  return json({ error: 'Method not allowed' }, 405);
};
