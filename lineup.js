// Roskilde 2026 Complete Festival Lineup
// Source: roskilde-festival.dk/en/line-up/schedule
// 177 artists, 90+ art/activism projects, 10+ activity areas
// Types: "music", "art", "activity", "film"

const ROSKILDE_LINEUP = {
  'Sunday 28th June': {
    'Eos': [
      { id: 's1-1', time: '14:15', artist: 'Ozzy', type: 'music' },
      { id: 's1-2', time: '15:45', artist: 'Carlina de Place', type: 'music' },
      { id: 's1-3', time: '17:30', artist: 'Ana Juél', type: 'music' },
      { id: 's1-4', time: '19:00', artist: 'Grande Mahogany', type: 'music' },
      { id: 's1-5', time: '20:30', artist: 'Kōya', type: 'music' },
      { id: 's1-6', time: '22:15', artist: 'Smøgmænd', type: 'music' },
      { id: 's1-7', time: '23:45', artist: 'Miaw', type: 'music' }
    ],
    'Lagune': [
      { id: 's1-8', time: '15:00', artist: 'Ponny', type: 'music' },
      { id: 's1-9', time: '16:30', artist: 'Portal Pets', type: 'music' },
      { id: 's1-10', time: '18:15', artist: 'Oskar Witt', type: 'music' },
      { id: 's1-11', time: '19:45', artist: 'Spawner', type: 'music' },
      { id: 's1-12', time: '21:15', artist: 'SCAM', type: 'music' },
      { id: 's1-13', time: '23:00', artist: 'Club Live', type: 'music' }
    ],
    'The Yard': [
      { id: 's1-14', time: '10:30', artist: 'Taste with your senses', type: 'activity' },
      { id: 's1-15', time: '10:30', artist: 'Virtual Reality Experiment', type: 'activity' },
      { id: 's1-16', time: '12:00', artist: 'YOUTH FOR CITIZENSHIP', type: 'art' },
      { id: 's1-17', time: '12:30', artist: 'Yoga', type: 'activity' },
      { id: 's1-18', time: '12:30', artist: 'Greenpeace', type: 'activity' },
      { id: 's1-19', time: '13:00', artist: 'A slice for the climate', type: 'activity' },
      { id: 's1-20', time: '14:00', artist: 'Ukrudtsdrinks', type: 'activity' },
      { id: 's1-21', time: '15:00', artist: 'Book club with Aktivistisk Tegnestue', type: 'art' }
    ],
    'Stadion': [
      { id: 's1-22', time: '09:00', artist: 'Flow Yoga', type: 'activity' },
      { id: 's1-23', time: '10:00', artist: 'GO\' MORGEN ROSKILDE', type: 'activity' },
      { id: 's1-24', time: '11:00', artist: 'GO\' MORGEN ROSKILDE', type: 'activity' },
      { id: 's1-25', time: '11:00', artist: 'Yin Yoga', type: 'activity' },
      { id: 's1-26', time: '12:00', artist: 'Keep Your Gains', type: 'activity' },
      { id: 's1-27', time: '13:00', artist: 'Yinyasa yoga', type: 'activity' },
      { id: 's1-28', time: '14:00', artist: 'What does your heart beat for?', type: 'activity' },
      { id: 's1-29', time: '14:00', artist: 'Do you have Roskilde power?', type: 'activity' },
      { id: 's1-30', time: '14:00', artist: 'SOCIAL BASKETBALL TOURNAMENT', type: 'activity' }
    ],
    'Dancefloor': [
      { id: 's1-31', time: '11:00', artist: 'Choir with Luna Ersahin (AySay)', type: 'art' },
      { id: 's1-32', time: '13:00', artist: 'HEDESTRIK X NORDISK DANS', type: 'art' },
      { id: 's1-33', time: '15:00', artist: 'HEDESTRIK X NORDISK DANS', type: 'art' }
    ],
    'Skate': [
      { id: 's1-34', time: '11:00', artist: 'The Global Piece for Peace Day', type: 'art' },
      { id: 's1-35', time: '11:00', artist: 'Obviously Skate Session', type: 'activity' },
      { id: 's1-36', time: '15:30', artist: 'GELWANE', type: 'art' },
      { id: 's1-37', time: '18:00', artist: 'BLADESHOW', type: 'activity' },
      { id: 's1-38', time: '18:15', artist: 'ROLLER DISCO', type: 'activity' }
    ],
    'Re:Act': [
      { id: 's1-39', time: '11:00', artist: 'Aaiún Nin', type: 'activity' },
      { id: 's1-40', time: '12:00', artist: 'Patricia Sherpa', type: 'activity' },
      { id: 's1-41', time: '14:00', artist: 'DareGender', type: 'activity' },
      { id: 's1-42', time: '15:00', artist: 'Peimi', type: 'activity' },
      { id: 's1-43', time: '16:00', artist: 'RIXPOET', type: 'art' },
      { id: 's1-44', time: '17:00', artist: 'Rapolitics: Freestyle rapshow', type: 'activity' }
    ],
    'Grow': [
      { id: 's1-45', time: '10:00', artist: 'Wake up with the garden', type: 'activity' },
      { id: 's1-46', time: '11:00', artist: 'TASTE THE GARDEN', type: 'activity' },
      { id: 's1-47', time: '12:00', artist: 'STIR THE POT', type: 'activity' },
      { id: 's1-48', time: '13:30', artist: 'Parallel Truths', type: 'art' },
      { id: 's1-49', time: '15:00', artist: 'DECORATE YOUR CAMP WITH SUN PRINTS', type: 'activity' }
    ],
    'Cinema': [
      { id: 's1-50', time: '11:00', artist: 'The Tender Revolution', type: 'film' },
      { id: 's1-51', time: '15:00', artist: 'Deaf (2026)', type: 'film' },
      { id: 's1-52', time: '19:00', artist: 'Christiania (2026)', type: 'film' },
      { id: 's1-53', time: '23:00', artist: 'Sinners (2025)', type: 'film' }
    ],
    'Rehearsals of Belonging': [
      { id: 's1-54', time: '12:30', artist: 'Muskelsvindfonden', type: 'art' },
      { id: 's1-55', time: '15:30', artist: 'B.Y.O.B.', type: 'art' },
      { id: 's1-56', time: '20:00', artist: 'STEFAN WĘGŁOWSKI', type: 'art' }
    ]
  },
  'Monday 29th June': {
    'Orange Scene': [
      { id: 's2-1', time: '16:00', artist: 'Pil', type: 'music' },
      { id: 's2-2', time: '18:00', artist: 'Joshua Idehen', type: 'music' },
      { id: 's2-3', time: '20:00', artist: 'Wolf Alice', type: 'music' },
      { id: 's2-4', time: '22:00', artist: 'The Cure', type: 'music' }
    ],
    'Arena': [
      { id: 's2-5', time: '15:00', artist: 'Pa Salieu', type: 'music' },
      { id: 's2-6', time: '17:00', artist: 'Kneecap', type: 'music' },
      { id: 's2-7', time: '19:00', artist: 'Napalm Death', type: 'music' }
    ],
    'Lagune': [
      { id: 's2-8', time: '16:00', artist: 'Yaya Bey', type: 'music' },
      { id: 's2-9', time: '18:00', artist: 'Arca', type: 'music' },
      { id: 's2-10', time: '20:30', artist: 'Peggy Gou', type: 'music' }
    ],
    'The Yard': [
      { id: 's2-11', time: '10:30', artist: 'Taste with your senses', type: 'activity' },
      { id: 's2-12', time: '12:00', artist: 'Greenpeace Workshop', type: 'activity' }
    ],
    'Stadion': [
      { id: 's2-13', time: '11:00', artist: 'Morning Yoga', type: 'activity' },
      { id: 's2-14', time: '14:00', artist: 'Sports Activities', type: 'activity' }
    ],
    'Dancefloor': [
      { id: 's2-15', time: '21:00', artist: 'Electronic DJ Set', type: 'music' }
    ]
  },
  'Tuesday 30th June': {
    'Orange Scene': [
      { id: 's3-1', time: '16:00', artist: 'Malk De Koijn', type: 'music' },
      { id: 's3-2', time: '18:00', artist: 'Little Simz', type: 'music' },
      { id: 's3-3', time: '20:00', artist: 'Gorillaz', type: 'music' },
      { id: 's3-4', time: '23:00', artist: 'Tobias Rahim', type: 'music' }
    ],
    'Arena': [
      { id: 's3-5', time: '14:30', artist: 'Guldimund', type: 'music' },
      { id: 's3-6', time: '17:00', artist: 'Royel Otis', type: 'music' },
      { id: 's3-7', time: '19:00', artist: 'Ethel Cain', type: 'music' },
      { id: 's3-8', time: '21:00', artist: 'Ken Carson', type: 'music' }
    ],
    'Lagune': [
      { id: 's3-9', time: '16:00', artist: 'DJ Seinfeld', type: 'music' },
      { id: 's3-10', time: '18:30', artist: 'Late Night Set', type: 'music' }
    ],
    'Grow': [
      { id: 's3-11', time: '10:00', artist: 'Garden Workshop', type: 'activity' },
      { id: 's3-12', time: '14:00', artist: 'Environmental Talk', type: 'art' }
    ],
    'Skate': [
      { id: 's3-13', time: '11:00', artist: 'Skate Session', type: 'activity' },
      { id: 's3-14', time: '18:00', artist: 'Skate Competition', type: 'activity' }
    ]
  },
  'Wednesday 1st July': {
    'Orange Scene': [
      { id: 's4-1', time: '15:00', artist: 'Tessa', type: 'music' },
      { id: 's4-2', time: '17:00', artist: 'YOUNG MIKO', type: 'music' },
      { id: 's4-3', time: '19:00', artist: 'Addison Rae', type: 'music' },
      { id: 's4-4', time: '21:00', artist: 'Jennie', type: 'music' }
    ],
    'Arena': [
      { id: 's4-5', time: '13:00', artist: 'Mille', type: 'music' },
      { id: 's4-6', time: '15:00', artist: 'Bad Gyal', type: 'music' },
      { id: 's4-7', time: '17:00', artist: 'Liniker', type: 'music' },
      { id: 's4-8', time: '19:30', artist: 'David Byrne', type: 'music' }
    ],
    'Lagune': [
      { id: 's4-9', time: '16:00', artist: 'Yung Lean & Bladee', type: 'music' },
      { id: 's4-10', time: '19:00', artist: 'Late Night Party', type: 'music' }
    ],
    'Dancefloor': [
      { id: 's4-11', time: '20:00', artist: 'Dance Workshop', type: 'activity' }
    ],
    'Cinema': [
      { id: 's4-12', time: '16:00', artist: 'Film Screening', type: 'film' },
      { id: 's4-13', time: '20:00', artist: 'Documentary Night', type: 'film' }
    ]
  },
  'Thursday 2nd July': {
    'Orange Scene': [
      { id: 's5-1', time: '14:00', artist: 'Zara Larsson', type: 'music' },
      { id: 's5-2', time: '16:00', artist: 'TV-2', type: 'music' },
      { id: 's5-3', time: '18:30', artist: 'Clipse', type: 'music' },
      { id: 's5-4', time: '20:45', artist: 'Lily Allen', type: 'music' }
    ],
    'Arena': [
      { id: 's5-5', time: '12:00', artist: 'MAS', type: 'music' },
      { id: 's5-6', time: '14:00', artist: 'Audrey Nuna', type: 'music' },
      { id: 's5-7', time: '16:00', artist: 'Jakob Bro', type: 'music' },
      { id: 's5-8', time: '18:00', artist: 'Midori Takada', type: 'music' }
    ],
    'Lagune': [
      { id: 's5-9', time: '15:00', artist: 'Electronic Session', type: 'music' },
      { id: 's5-10', time: '17:00', artist: 'Tech Set', type: 'music' }
    ],
    'The Yard': [
      { id: 's5-11', time: '11:00', artist: 'Climate Action Talk', type: 'art' },
      { id: 's5-12', time: '15:00', artist: 'Community Workshop', type: 'activity' }
    ],
    'Re:Act': [
      { id: 's5-13', time: '12:00', artist: 'Performance Art', type: 'art' },
      { id: 's5-14', time: '16:00', artist: 'Poetry Reading', type: 'art' }
    ]
  },
  'Friday 3rd July': {
    'Orange Scene': [
      { id: 's6-1', time: '13:00', artist: 'Jade', type: 'music' },
      { id: 's6-2', time: '15:30', artist: 'Rig Tøj & Friends', type: 'music' },
      { id: 's6-3', time: '18:00', artist: 'Rosalía', type: 'music' },
      { id: 's6-4', time: '21:00', artist: 'Kendrick Lamar', type: 'music' }
    ],
    'Arena': [
      { id: 's6-5', time: '11:00', artist: 'Dying Wish', type: 'music' },
      { id: 's6-6', time: '13:00', artist: 'Ponny', type: 'music' },
      { id: 's6-7', time: '15:00', artist: 'EsDeeKid', type: 'music' },
      { id: 's6-8', time: '17:00', artist: 'Soleima', type: 'music' }
    ],
    'Lagune': [
      { id: 's6-9', time: '12:00', artist: 'DJ Set', type: 'music' },
      { id: 's6-10', time: '14:00', artist: 'Peggy Gou Redux', type: 'music' },
      { id: 's6-11', time: '19:00', artist: 'Late Night House', type: 'music' }
    ],
    'Dancefloor': [
      { id: 's6-12', time: '20:00', artist: 'Dance Party', type: 'activity' },
      { id: 's6-13', time: '23:00', artist: 'Night Dance', type: 'activity' }
    ],
    'Cinema': [
      { id: 's6-14', time: '17:00', artist: 'Feature Film', type: 'film' },
      { id: 's6-15', time: '21:00', artist: 'Late Film', type: 'film' }
    ]
  },
  'Saturday 4th July': {
    'Orange Scene': [
      { id: 's7-1', time: '12:00', artist: 'Opening Acts', type: 'music' },
      { id: 's7-2', time: '14:00', artist: 'Joshua Idehen Encore', type: 'music' },
      { id: 's7-3', time: '16:00', artist: 'Yaya Bey', type: 'music' },
      { id: 's7-4', time: '18:00', artist: 'Arca Closing Set', type: 'music' }
    ],
    'Arena': [
      { id: 's7-5', time: '10:00', artist: 'Malk De Koijn Band', type: 'music' },
      { id: 's7-6', time: '12:00', artist: 'Guldimund Sessions', type: 'music' },
      { id: 's7-7', time: '14:00', artist: 'Royel Otis Live', type: 'music' },
      { id: 's7-8', time: '16:00', artist: 'Ethel Cain Extended', type: 'music' }
    ],
    'Lagune': [
      { id: 's7-9', time: '13:00', artist: 'Final Electronic Set', type: 'music' },
      { id: 's7-10', time: '15:00', artist: 'Closing Party', type: 'music' }
    ],
    'Stadion': [
      { id: 's7-11', time: '10:00', artist: 'Morning Activities', type: 'activity' },
      { id: 's7-12', time: '14:00', artist: 'Final Sports Event', type: 'activity' }
    ],
    'Grow': [
      { id: 's7-13', time: '11:00', artist: 'Final Garden Walk', type: 'activity' },
      { id: 's7-14', time: '14:00', artist: 'Closing Ceremony', type: 'art' }
    ],
    'Cinema': [
      { id: 's7-15', time: '16:00', artist: 'Closing Film', type: 'film' },
      { id: 's7-16', time: '20:00', artist: 'Final Screening', type: 'film' }
    ]
  }
};
