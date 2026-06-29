// Netlify Function: festivalprogram (lineup) for Roskilde 2026 — lagret i Netlify Blobs
//
// Programmet lagres som en FLAT liste av oppføringer (ett objekt per show/event),
// hver med en stabil id, slik at admin kan redigere band, tid, scene, sjanger og
// type direkte i appen uten ny kode-deploy.
//
// Endepunkter:
//   GET  /api/lineup                                  -> { lineup: [...] }
//   POST /api/lineup { password, action:'upsert', performance:{...} }
//   POST /api/lineup { password, action:'delete', id }
//   POST /api/lineup { password, action:'reset' }
//
// Admin-passord: miljøvariabel ADMIN_PASSWORD (settes i Netlify, ikke i koden).

import { getStore } from '@netlify/blobs';

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Roskilde 2026 — seed-program. Brukes til å fylle Blobs første gang og som
// "tilbakestill til original" i admin-panelet. Tider/scener fra offisiell
// tidsplan (roskilde-festival.dk) og Clashfinder.
const DEFAULT_LINEUP = [
  // ===== SUNDAY 28 JUNE (warm-up) =====
  {"id":"r017","band":"The Tender Revolution","day":"Sunday","stage":"Cinema","start":"11:00","end":"13:00","genre":["Film"],"type":"film"},
  {"id":"r018","band":"Sinners (2025)","day":"Sunday","stage":"Cinema","start":"23:00","end":"01:00","genre":["Film"],"type":"film"},
  {"id":"r001","band":"Ozzy","day":"Sunday","stage":"Eos","start":"14:15","end":"15:15","genre":["Metal"],"type":"band"},
  {"id":"r002","band":"Carlina de Place","day":"Sunday","stage":"Eos","start":"15:45","end":"16:45","genre":["Pop"],"type":"band"},
  {"id":"r003","band":"Ana Juél","day":"Sunday","stage":"Eos","start":"17:30","end":"18:30","genre":["Pop"],"type":"band"},
  {"id":"r004","band":"Grande Mahogany","day":"Sunday","stage":"Eos","start":"19:00","end":"20:00","genre":["Hip-Hop"],"type":"band"},
  {"id":"r005","band":"Kōya","day":"Sunday","stage":"Eos","start":"20:30","end":"21:30","genre":["Electronic"],"type":"band"},
  {"id":"r006","band":"Smøgmænd","day":"Sunday","stage":"Eos","start":"22:15","end":"23:15","genre":["Rock"],"type":"band"},
  {"id":"r007","band":"Miaw","day":"Sunday","stage":"Eos","start":"23:45","end":"00:45","genre":["Electronic"],"type":"band"},
  {"id":"r016","band":"Wake up with the garden","day":"Sunday","stage":"Grow","start":"10:00","end":"11:00","genre":["Workshop"],"type":"activity"},
  {"id":"r008","band":"Ponny","day":"Sunday","stage":"Lagune","start":"15:00","end":"16:00","genre":["Electronic"],"type":"band"},
  {"id":"r009","band":"Portal Pets","day":"Sunday","stage":"Lagune","start":"16:30","end":"17:30","genre":["Electronic"],"type":"band"},
  {"id":"r010","band":"Oskar Witt","day":"Sunday","stage":"Lagune","start":"18:15","end":"19:15","genre":["Pop"],"type":"band"},
  {"id":"r011","band":"Spawner","day":"Sunday","stage":"Lagune","start":"19:45","end":"20:45","genre":["Electronic"],"type":"band"},
  {"id":"r012","band":"SCAM","day":"Sunday","stage":"Lagune","start":"21:15","end":"22:15","genre":["Punk"],"type":"band"},
  {"id":"r013","band":"Club Live","day":"Sunday","stage":"Lagune","start":"23:00","end":"00:00","genre":["Electronic"],"type":"band"},
  {"id":"r019","band":"RIXPOET","day":"Sunday","stage":"Re:Act","start":"16:00","end":"17:00","genre":["Poetry"],"type":"art"},
  {"id":"r015","band":"Roller Disco","day":"Sunday","stage":"Skate","start":"18:15","end":"19:15","genre":["Activity"],"type":"activity"},
  {"id":"r014","band":"Flow Yoga","day":"Sunday","stage":"Stadion","start":"09:00","end":"10:00","genre":["Wellness"],"type":"activity"},

  // ===== WEDNESDAY 1 JULY =====
  {"id":"r106","band":"EsDeeKid","day":"Wednesday","stage":"Arena","start":"00:00","end":"01:00","genre":["Hip-Hop"],"type":"band"},
  {"id":"r107","band":"Sherelle","day":"Wednesday","stage":"Arena","start":"00:00","end":"01:30","genre":["Electronic","Jungle"],"type":"band"},
  {"id":"r123","band":"Pili Pili Girls","day":"Wednesday","stage":"Arena","start":"00:45","end":"01:45","genre":["Electronic"],"type":"band"},
  {"id":"r104","band":"Pa Salieu","day":"Wednesday","stage":"Arena","start":"18:30","end":"19:30","genre":["Hip-Hop"],"type":"band"},
  {"id":"r105","band":"Jade","day":"Wednesday","stage":"Arena","start":"20:45","end":"21:45","genre":["Pop"],"type":"band"},
  {"id":"r122","band":"¥ØU$UK€ ¥UK1MAT$U","day":"Wednesday","stage":"Eos","start":"00:30","end":"01:30","genre":["Electronic"],"type":"band"},
  {"id":"r119","band":"Iceage","day":"Wednesday","stage":"Eos","start":"17:00","end":"18:00","genre":["Post-Punk"],"type":"band"},
  {"id":"r120","band":"Sama' Abdulhadi","day":"Wednesday","stage":"Eos","start":"20:30","end":"22:00","genre":["Techno"],"type":"band"},
  {"id":"r121","band":"SMAG PÅ DIG SELV","day":"Wednesday","stage":"Eos","start":"23:30","end":"00:30","genre":["Electronic"],"type":"band"},
  {"id":"r112","band":"Tuvaband","day":"Wednesday","stage":"Fauna","start":"17:45","end":"18:45","genre":["Indie"],"type":"band"},
  {"id":"r113","band":"Smertegrænsens Toldere","day":"Wednesday","stage":"Fauna","start":"19:30","end":"20:30","genre":["Rock"],"type":"band"},
  {"id":"r114","band":"The Sophs","day":"Wednesday","stage":"Fauna","start":"21:00","end":"22:00","genre":["Rock"],"type":"band"},
  {"id":"r108","band":"Joshua Idehen","day":"Wednesday","stage":"Gloria","start":"17:30","end":"18:30","genre":["Spoken Word"],"type":"band"},
  {"id":"r109","band":"Hypnosis Therapy","day":"Wednesday","stage":"Gloria","start":"19:30","end":"20:30","genre":["Electronic"],"type":"band"},
  {"id":"r110","band":"Indus","day":"Wednesday","stage":"Gloria","start":"21:30","end":"22:30","genre":["Electronic"],"type":"band"},
  {"id":"r111","band":"Dying Wish","day":"Wednesday","stage":"Gloria","start":"23:30","end":"00:30","genre":["Metalcore"],"type":"band"},
  {"id":"r118","band":"Monolord","day":"Wednesday","stage":"Lagune","start":"00:30","end":"01:30","genre":["Doom Metal","Stoner"],"type":"band"},
  {"id":"r115","band":"Annie & the Caldwells","day":"Wednesday","stage":"Lagune","start":"18:30","end":"19:30","genre":["Gospel","Soul"],"type":"band"},
  {"id":"r116","band":"ANGÅENDE MIG","day":"Wednesday","stage":"Lagune","start":"20:30","end":"21:30","genre":["Pop"],"type":"band"},
  {"id":"r117","band":"Marwan Moussa","day":"Wednesday","stage":"Lagune","start":"22:30","end":"23:30","genre":["Hip-Hop"],"type":"band"},
  {"id":"r101","band":"Pil","day":"Wednesday","stage":"Orange Scene","start":"17:30","end":"18:30","genre":["Pop"],"type":"band"},
  {"id":"r102","band":"Wolf Alice","day":"Wednesday","stage":"Orange Scene","start":"19:30","end":"20:45","genre":["Indie Rock","Alternative"],"type":"band"},
  {"id":"r103","band":"The Cure","day":"Wednesday","stage":"Orange Scene","start":"22:00","end":"00:00","genre":["Post-Punk","New Wave"],"type":"band"},

  // ===== THURSDAY 2 JULY =====
  {"id":"r209","band":"Kneecap","day":"Thursday","stage":"Arena","start":"00:00","end":"01:00","genre":["Punk","Hip-Hop"],"type":"band"},
  {"id":"r210","band":"Brutalismus 3000","day":"Thursday","stage":"Arena","start":"02:00","end":"03:00","genre":["Techno"],"type":"band"},
  {"id":"r205","band":"Guldimund","day":"Thursday","stage":"Arena","start":"14:30","end":"15:30","genre":["Folk"],"type":"band"},
  {"id":"r206","band":"Royel Otis","day":"Thursday","stage":"Arena","start":"17:00","end":"18:00","genre":["Indie Rock"],"type":"band"},
  {"id":"r207","band":"Ethel Cain","day":"Thursday","stage":"Arena","start":"19:00","end":"20:15","genre":["Alternative","Indie"],"type":"band"},
  {"id":"r208","band":"Ken Carson","day":"Thursday","stage":"Arena","start":"21:00","end":"22:15","genre":["Hip-Hop","Trap"],"type":"band"},
  {"id":"r224","band":"Adrian Quesada","day":"Thursday","stage":"Eos","start":"13:00","end":"14:00","genre":["Soul"],"type":"band"},
  {"id":"r225","band":"Jalen Ngonda","day":"Thursday","stage":"Eos","start":"15:00","end":"16:00","genre":["Soul"],"type":"band"},
  {"id":"r226","band":"Napalm Death","day":"Thursday","stage":"Eos","start":"17:00","end":"18:00","genre":["Grindcore","Death Metal"],"type":"band"},
  {"id":"r227","band":"Wicky","day":"Thursday","stage":"Eos","start":"18:45","end":"19:45","genre":["Electronic"],"type":"band"},
  {"id":"r228","band":"KWN","day":"Thursday","stage":"Eos","start":"21:00","end":"22:00","genre":["Electronic"],"type":"band"},
  {"id":"r229","band":"Lykke Li","day":"Thursday","stage":"Eos","start":"23:30","end":"00:45","genre":["Indie Pop"],"type":"band"},
  {"id":"r238","band":"PL.VGTBL","day":"Thursday","stage":"Fauna","start":"01:00","end":"02:00","genre":["Electronic"],"type":"band"},
  {"id":"r218","band":"Dean Johnson","day":"Thursday","stage":"Fauna","start":"13:00","end":"14:00","genre":["Folk"],"type":"band"},
  {"id":"r219","band":"ŠIROM","day":"Thursday","stage":"Fauna","start":"15:00","end":"16:00","genre":["Folk","Experimental"],"type":"band"},
  {"id":"r220","band":"Yerai Cortés","day":"Thursday","stage":"Fauna","start":"17:00","end":"18:00","genre":["Flamenco"],"type":"band"},
  {"id":"r221","band":"Truck Violence","day":"Thursday","stage":"Fauna","start":"19:30","end":"20:30","genre":["Rock"],"type":"band"},
  {"id":"r222","band":"Khana Bierbood","day":"Thursday","stage":"Fauna","start":"21:00","end":"22:00","genre":["Surf Rock"],"type":"band"},
  {"id":"r223","band":"Nick León","day":"Thursday","stage":"Fauna","start":"23:00","end":"00:00","genre":["Electronic"],"type":"band"},
  {"id":"r216","band":"The Zawose Queens","day":"Thursday","stage":"Gloria","start":"00:00","end":"01:00","genre":["World"],"type":"band"},
  {"id":"r217","band":"Djrum","day":"Thursday","stage":"Gloria","start":"01:45","end":"02:45","genre":["Electronic"],"type":"band"},
  {"id":"r211","band":"SOLI CITY x VERTIGO","day":"Thursday","stage":"Gloria","start":"13:00","end":"14:00","genre":["Electronic"],"type":"band"},
  {"id":"r212","band":"Abdullah Miniawy Trio","day":"Thursday","stage":"Gloria","start":"16:30","end":"17:30","genre":["Jazz","Experimental"],"type":"band"},
  {"id":"r213","band":"The New Eves","day":"Thursday","stage":"Gloria","start":"18:30","end":"19:30","genre":["Folk"],"type":"band"},
  {"id":"r214","band":"Cortisa Star","day":"Thursday","stage":"Gloria","start":"20:30","end":"21:30","genre":["Hip-Hop"],"type":"band"},
  {"id":"r215","band":"Krøyer","day":"Thursday","stage":"Gloria","start":"22:15","end":"23:15","genre":["Electronic"],"type":"band"},
  {"id":"r236","band":"Cobrah","day":"Thursday","stage":"Lagune","start":"00:15","end":"01:15","genre":["Electronic"],"type":"band"},
  {"id":"r237","band":"Honningbarna","day":"Thursday","stage":"Lagune","start":"02:15","end":"03:15","genre":["Punk"],"type":"band"},
  {"id":"r230","band":"Uld","day":"Thursday","stage":"Lagune","start":"12:00","end":"13:00","genre":["Electronic"],"type":"band"},
  {"id":"r231","band":"TARRAK","day":"Thursday","stage":"Lagune","start":"14:00","end":"15:00","genre":["Electronic"],"type":"band"},
  {"id":"r232","band":"BB Trickz","day":"Thursday","stage":"Lagune","start":"16:30","end":"17:30","genre":["Hip-Hop"],"type":"band"},
  {"id":"r233","band":"Ecca Vandal","day":"Thursday","stage":"Lagune","start":"18:30","end":"19:30","genre":["Punk"],"type":"band"},
  {"id":"r234","band":"Naïka","day":"Thursday","stage":"Lagune","start":"20:15","end":"21:15","genre":["Pop"],"type":"band"},
  {"id":"r235","band":"Uncle Acid & The Deadbeats","day":"Thursday","stage":"Lagune","start":"22:15","end":"23:15","genre":["Doom Rock"],"type":"band"},
  {"id":"r204","band":"Tobias Rahim","day":"Thursday","stage":"Orange Scene","start":"01:00","end":"02:00","genre":["Pop"],"type":"band"},
  {"id":"r201","band":"Malk De Koijn","day":"Thursday","stage":"Orange Scene","start":"16:00","end":"17:00","genre":["Hip-Hop"],"type":"band"},
  {"id":"r202","band":"Little Simz","day":"Thursday","stage":"Orange Scene","start":"18:00","end":"19:00","genre":["Hip-Hop","Rap"],"type":"band"},
  {"id":"r203","band":"Gorillaz","day":"Thursday","stage":"Orange Scene","start":"22:00","end":"23:45","genre":["Alternative","Electronic"],"type":"band"},

  // ===== FRIDAY 3 JULY =====
  {"id":"r309","band":"Yung Lean & Bladee","day":"Friday","stage":"Arena","start":"00:15","end":"01:15","genre":["Cloud Rap"],"type":"band"},
  {"id":"r310","band":"Sammy Virji","day":"Friday","stage":"Arena","start":"02:30","end":"03:30","genre":["UK Garage"],"type":"band"},
  {"id":"r305","band":"Mille","day":"Friday","stage":"Arena","start":"13:00","end":"14:00","genre":["Pop"],"type":"band"},
  {"id":"r306","band":"YOUNG MIKO","day":"Friday","stage":"Arena","start":"15:00","end":"16:00","genre":["Trap","Latin"],"type":"band"},
  {"id":"r307","band":"Sierra Ferrell","day":"Friday","stage":"Arena","start":"17:30","end":"18:30","genre":["Folk","Americana"],"type":"band"},
  {"id":"r308","band":"David Byrne","day":"Friday","stage":"Arena","start":"20:30","end":"22:00","genre":["Rock","World"],"type":"band"},
  {"id":"r325","band":"AySay","day":"Friday","stage":"Eos","start":"12:00","end":"13:00","genre":["Folk"],"type":"band"},
  {"id":"r326","band":"The Savage Rose","day":"Friday","stage":"Eos","start":"15:00","end":"16:00","genre":["Rock"],"type":"band"},
  {"id":"r327","band":"Rizwan-Muazzam Qawwali","day":"Friday","stage":"Eos","start":"18:00","end":"19:00","genre":["Qawwali","World"],"type":"band"},
  {"id":"r328","band":"DBN Gogo","day":"Friday","stage":"Eos","start":"20:30","end":"21:30","genre":["Amapiano"],"type":"band"},
  {"id":"r329","band":"Oklou","day":"Friday","stage":"Eos","start":"23:00","end":"00:00","genre":["Pop","Electronic"],"type":"band"},
  {"id":"r324","band":"Vegyn","day":"Friday","stage":"Fauna","start":"01:00","end":"02:00","genre":["Electronic"],"type":"band"},
  {"id":"r339","band":"Lechuga Zafiro & Verraco","day":"Friday","stage":"Fauna","start":"02:00","end":"03:00","genre":["Electronic"],"type":"band"},
  {"id":"r318","band":"Cat Clyde","day":"Friday","stage":"Fauna","start":"13:00","end":"14:00","genre":["Folk"],"type":"band"},
  {"id":"r319","band":"Folk Bitch Trio","day":"Friday","stage":"Fauna","start":"15:00","end":"16:00","genre":["Folk"],"type":"band"},
  {"id":"r320","band":"Maruja","day":"Friday","stage":"Fauna","start":"17:00","end":"18:00","genre":["Post-Punk"],"type":"band"},
  {"id":"r321","band":"Saad Tiouly","day":"Friday","stage":"Fauna","start":"19:00","end":"20:00","genre":["World"],"type":"band"},
  {"id":"r338","band":"Thicket","day":"Friday","stage":"Fauna","start":"20:15","end":"21:15","genre":["Electronic"],"type":"band"},
  {"id":"r322","band":"Lamisi","day":"Friday","stage":"Fauna","start":"21:00","end":"22:00","genre":["World"],"type":"band"},
  {"id":"r323","band":"Kin'Gongolo Kiniata","day":"Friday","stage":"Fauna","start":"23:00","end":"00:00","genre":["World"],"type":"band"},
  {"id":"r317","band":"POISON RUÏN","day":"Friday","stage":"Gloria","start":"00:30","end":"01:30","genre":["Punk"],"type":"band"},
  {"id":"r311","band":"Vanessa Amara","day":"Friday","stage":"Gloria","start":"12:30","end":"13:30","genre":["Ambient"],"type":"band"},
  {"id":"r312","band":"Gwenifer Raymond","day":"Friday","stage":"Gloria","start":"14:30","end":"15:30","genre":["Folk"],"type":"band"},
  {"id":"r313","band":"Milkweed","day":"Friday","stage":"Gloria","start":"16:30","end":"17:30","genre":["Folk"],"type":"band"},
  {"id":"r314","band":"Luisa Almaguer","day":"Friday","stage":"Gloria","start":"18:30","end":"19:30","genre":["Pop"],"type":"band"},
  {"id":"r315","band":"No Joy","day":"Friday","stage":"Gloria","start":"20:30","end":"21:30","genre":["Shoegaze"],"type":"band"},
  {"id":"r316","band":"Mark William Lewis","day":"Friday","stage":"Gloria","start":"22:30","end":"23:30","genre":["Folk"],"type":"band"},
  {"id":"r336","band":"Blawan","day":"Friday","stage":"Lagune","start":"00:00","end":"01:00","genre":["Techno"],"type":"band"},
  {"id":"r337","band":"Tonser","day":"Friday","stage":"Lagune","start":"02:15","end":"03:15","genre":["Electronic"],"type":"band"},
  {"id":"r330","band":"Hemlocke Springs","day":"Friday","stage":"Lagune","start":"12:00","end":"13:00","genre":["Pop"],"type":"band"},
  {"id":"r331","band":"Chezile","day":"Friday","stage":"Lagune","start":"14:00","end":"15:00","genre":["Pop"],"type":"band"},
  {"id":"r332","band":"Getdown Services","day":"Friday","stage":"Lagune","start":"16:00","end":"17:00","genre":["Post-Punk"],"type":"band"},
  {"id":"r333","band":"Smerz","day":"Friday","stage":"Lagune","start":"18:00","end":"19:00","genre":["Electronic"],"type":"band"},
  {"id":"r334","band":"Genesis Owusu","day":"Friday","stage":"Lagune","start":"20:00","end":"21:00","genre":["Hip-Hop","Soul","Punk"],"type":"band"},
  {"id":"r335","band":"Los Thuthanaka","day":"Friday","stage":"Lagune","start":"22:00","end":"23:00","genre":["Experimental"],"type":"band"},
  {"id":"r304","band":"Aphaca","day":"Friday","stage":"Orange Scene","start":"01:00","end":"02:00","genre":["Electronic"],"type":"band"},
  {"id":"r301","band":"Tessa","day":"Friday","stage":"Orange Scene","start":"16:00","end":"17:00","genre":["Hip-Hop"],"type":"band"},
  {"id":"r302","band":"Addison Rae","day":"Friday","stage":"Orange Scene","start":"19:00","end":"20:00","genre":["Pop"],"type":"band"},
  {"id":"r303","band":"Jennie","day":"Friday","stage":"Orange Scene","start":"22:00","end":"23:15","genre":["K-Pop","Pop"],"type":"band"},

  // ===== SATURDAY 4 JULY =====
  {"id":"r409","band":"Zar Paulo","day":"Saturday","stage":"Arena","start":"00:45","end":"01:45","genre":["Electronic"],"type":"band"},
  {"id":"r405","band":"MAS","day":"Saturday","stage":"Arena","start":"14:30","end":"15:30","genre":["Rock"],"type":"band"},
  {"id":"r406","band":"Audrey Nuna","day":"Saturday","stage":"Arena","start":"17:15","end":"18:15","genre":["Hip-Hop","Rap"],"type":"band"},
  {"id":"r407","band":"Liniker","day":"Saturday","stage":"Arena","start":"19:30","end":"20:30","genre":["Soul","MPB"],"type":"band"},
  {"id":"r408","band":"Bad Gyal","day":"Saturday","stage":"Arena","start":"22:00","end":"23:00","genre":["Trap","Reggaeton"],"type":"band"},
  {"id":"r428","band":"Kettama","day":"Saturday","stage":"Eos","start":"02:00","end":"03:00","genre":["House"],"type":"band"},
  {"id":"r424","band":"Lojay","day":"Saturday","stage":"Eos","start":"14:00","end":"15:00","genre":["Afrobeats"],"type":"band"},
  {"id":"r425","band":"Los Mirlos","day":"Saturday","stage":"Eos","start":"17:00","end":"18:00","genre":["Cumbia"],"type":"band"},
  {"id":"r426","band":"Frost Children","day":"Saturday","stage":"Eos","start":"19:45","end":"20:45","genre":["Hyperpop"],"type":"band"},
  {"id":"r427","band":"Panda Bear & Sonic Boom","day":"Saturday","stage":"Eos","start":"22:00","end":"23:00","genre":["Psychedelic"],"type":"band"},
  {"id":"r423","band":"CRRDR","day":"Saturday","stage":"Fauna","start":"01:15","end":"02:15","genre":["Electronic"],"type":"band"},
  {"id":"r417","band":"Midori Takada & Jakob Bro","day":"Saturday","stage":"Fauna","start":"12:30","end":"13:30","genre":["Jazz","Ambient"],"type":"band"},
  {"id":"r418","band":"Sara Parkman","day":"Saturday","stage":"Fauna","start":"14:30","end":"15:30","genre":["Folk"],"type":"band"},
  {"id":"r419","band":"Jorjiana","day":"Saturday","stage":"Fauna","start":"16:30","end":"17:30","genre":["Pop"],"type":"band"},
  {"id":"r420","band":"The Callous Daoboys","day":"Saturday","stage":"Fauna","start":"18:15","end":"19:15","genre":["Mathcore"],"type":"band"},
  {"id":"r421","band":"Albertslund Terror Korps","day":"Saturday","stage":"Fauna","start":"21:00","end":"22:00","genre":["Hardcore"],"type":"band"},
  {"id":"r422","band":"Sorry","day":"Saturday","stage":"Fauna","start":"23:15","end":"00:15","genre":["Indie"],"type":"band"},
  {"id":"r416","band":"Lord Snow","day":"Saturday","stage":"Gloria","start":"00:30","end":"01:30","genre":["Electronic"],"type":"band"},
  {"id":"r410","band":"Madra Salach","day":"Saturday","stage":"Gloria","start":"12:30","end":"13:30","genre":["World"],"type":"band"},
  {"id":"r411","band":"Heinali & Andriana-Yaroslava Saienko","day":"Saturday","stage":"Gloria","start":"14:30","end":"15:30","genre":["Ambient"],"type":"band"},
  {"id":"r412","band":"CUIRASS","day":"Saturday","stage":"Gloria","start":"16:30","end":"17:30","genre":["Electronic"],"type":"band"},
  {"id":"r413","band":"Bruno Berle","day":"Saturday","stage":"Gloria","start":"18:30","end":"19:30","genre":["Pop"],"type":"band"},
  {"id":"r414","band":"1111","day":"Saturday","stage":"Gloria","start":"20:30","end":"21:30","genre":["Electronic"],"type":"band"},
  {"id":"r415","band":"Ata Kak","day":"Saturday","stage":"Gloria","start":"22:30","end":"23:30","genre":["Highlife"],"type":"band"},
  {"id":"r434","band":"Rochelle Jordan","day":"Saturday","stage":"Lagune","start":"00:00","end":"01:00","genre":["R&B","Electronic"],"type":"band"},
  {"id":"r429","band":"Snuggle","day":"Saturday","stage":"Lagune","start":"12:00","end":"13:00","genre":["Pop"],"type":"band"},
  {"id":"r430","band":"EEE GEE","day":"Saturday","stage":"Lagune","start":"14:30","end":"15:30","genre":["Pop"],"type":"band"},
  {"id":"r431","band":"Nourished By Time","day":"Saturday","stage":"Lagune","start":"17:00","end":"18:00","genre":["R&B","Electronic"],"type":"band"},
  {"id":"r432","band":"Igorrr","day":"Saturday","stage":"Lagune","start":"19:30","end":"20:30","genre":["Experimental Metal"],"type":"band"},
  {"id":"r433","band":"Jane Remover","day":"Saturday","stage":"Lagune","start":"22:00","end":"23:00","genre":["Hyperpop"],"type":"band"},
  {"id":"r401","band":"TV-2","day":"Saturday","stage":"Orange Scene","start":"15:30","end":"16:30","genre":["Pop Rock"],"type":"band"},
  {"id":"r402","band":"Clipse","day":"Saturday","stage":"Orange Scene","start":"18:30","end":"19:30","genre":["Hip-Hop","Rap"],"type":"band"},
  {"id":"r403","band":"Lily Allen","day":"Saturday","stage":"Orange Scene","start":"20:45","end":"21:45","genre":["Pop","Alternative"],"type":"band"},
  {"id":"r404","band":"Zara Larsson","day":"Saturday","stage":"Orange Scene","start":"23:15","end":"00:30","genre":["Pop"],"type":"band"}
];

const VALID_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const VALID_STAGES = ['Orange Scene', 'Arena', 'Lagune', 'Gloria', 'Fauna', 'The Yard', 'Stadion', 'Dancefloor', 'Skate', 'Re:Act', 'Grow', 'Cinema', 'Rehearsals of Belonging', 'Eos'];
const VALID_TYPES = ['band', 'event', 'art', 'activity', 'film'];

function validatePerformance(p) {
  if (typeof p.band !== 'string' || !p.band.trim() || p.band.length > 120) return 'Ugyldig navn';
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
    await store.setJSON('current', lineup);
  }
  return lineup;
}

export default async (req) => {
  const store = getStore('roskilde-lineup');

  if (req.method === 'GET') {
    const lineup = await getLineup(store);
    return json({ lineup });
  }

  if (req.method === 'POST') {
    let body = {};
    try { body = await req.json(); } catch (e) { /* tom body */ }

    const expected = process.env.ADMIN_PASSWORD || '';
    if (!expected) return json({ error: 'Admin ikke konfigurert (mangler ADMIN_PASSWORD)' }, 500);
    if (body.password !== expected) return json({ error: 'Feil passord' }, 403);

    let lineup = await getLineup(store);

    if (body.action === 'reset') {
      lineup = DEFAULT_LINEUP;
      await store.setJSON('current', lineup);
      return json({ ok: true, lineup });
    }

    if (body.action === 'delete') {
      if (!body.id) return json({ error: 'Mangler id' }, 400);
      lineup = lineup.filter(p => p.id !== body.id);
      await store.setJSON('current', lineup);
      return json({ ok: true, lineup });
    }

    if (body.action === 'upsert') {
      const incoming = body.performance || {};
      const err = validatePerformance(incoming);
      if (err) return json({ error: err }, 400);

      const clean = {
        id: incoming.id || ('r-' + Date.now() + '-' + Math.floor(Math.random() * 1000)),
        band: incoming.band.trim(),
        day: incoming.day,
        stage: incoming.stage,
        start: incoming.start,
        end: incoming.end,
        genre: Array.isArray(incoming.genre) ? incoming.genre.slice(0, 6) : [],
        type: incoming.type
      };

      const idx = lineup.findIndex(p => p.id === clean.id);
      if (idx >= 0) lineup[idx] = clean;
      else lineup.push(clean);

      await store.setJSON('current', lineup);
      return json({ ok: true, lineup, performance: clean });
    }

    return json({ error: 'Ukjent action' }, 400);
  }

  return json({ error: 'Metode ikke støttet' }, 405);
};

export const config = {
  path: '/api/lineup'
};
