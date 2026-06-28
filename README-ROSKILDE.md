# Roskilde 2026 Festival App

A festival planning app built with React, Netlify Blobs, and serverless functions.  
**Based on Tons of Rock 2026 app architecture.**

**Features:**
- 📋 Multi-day festival schedule by stage
- ⭐ Mark favorites + "Møt meg her" (meet here) locations
- 🗺️ Arena map view
- ⚙️ Admin panel for lineup editing
- 🌙 Dark/Light theme + text size controls
- 👥 Friends list (Vennegjengen)
- ☁️ Cloud-synced favorites (Netlify Blobs)
- 📱 Mobile responsive

---

## 📁 Project Structure

```
Roskilde/
├── index.html                    # React app (main UI)
├── lineup.js                     # Festival data (external)
├── netlify.toml                  # Netlify config
├── package.json                  # Dependencies
├── netlify/
│   └── functions/
│       └── favorites.js          # Serverless function (Blobs)
└── README.md                     # This file
```

---

## 🚀 Quick Setup

### 1. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name:** `Roskilde`
3. **Public** (or Private for close friends)
4. **Create repository** (empty)

### 2. Upload Files to GitHub

**Option A: Drag & Drop (Easiest)**
1. Open your new `Roskilde` repo
2. Click "uploading an existing file"
3. Drag & drop these files:
   - `index.html`
   - `lineup.js`
   - `netlify.toml`
   - `package.json`
   - `README.md`
4. Create the `netlify/functions/` folder and upload `favorites.js`

**Option B: Via Git CLI**
```bash
git clone https://github.com/YOUR-USERNAME/Roskilde.git
cd Roskilde

# Copy all files here, then:
git add .
git commit -m "Initial commit: Roskilde 2026 app"
git push -u origin main
```

### 3. Deploy to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub (if needed)
4. Select `YOUR-USERNAME/Roskilde` repo
5. **Build settings:**
   - Build command: (leave empty)
   - Publish directory: `.`
6. Click **"Deploy site"**

**Your app will be live in 2-3 minutes at:** `https://[random-name].netlify.app`

### 4. Configure Admin Password (Optional)

1. In Netlify, go to **Site settings** → **Environment**
2. Add variable:
   - Key: `ADMIN_PASSWORD`
   - Value: `rock`

---

## 🔐 Admin Features

**Password:** `rock`

**What admins can do:**
- Edit artist names
- Change stage/scene assignments
- Update set times
- Add/remove shows from schedule
- View lineup statistics

**Admin access:**
1. Click "Schedule" → "⚙️ Admin" tab
2. Enter password: `rock`
3. Edit shows directly
4. Changes update in real-time

---

## 📊 Lineup Data Structure

Edit `lineup.js` to customize the festival schedule:

```javascript
const ROSKILDE_LINEUP = {
  'Wednesday 1st July': {
    'Orange Scene': [
      { id: 'r1-1', time: '17:30', artist: 'Artist Name' },
      // ... more shows
    ],
    'Arena': [
      // ...
    ]
  },
  // ... more days
};
```

**Format:**
- `id` — Unique identifier
- `time` — HH:MM format (24-hour)
- `artist` — Artist/band name

---

## 🎨 Customization

### Colors & Theme
Edit Tailwind classes in `index.html`:
- `bg-orange-600` → change to your brand color
- `text-white`, `bg-gray-800` → adjust for dark mode

### Add New Features
- Modify React component in `<script type="text/babel">` section
- Add new lineup days by updating `ROSKILDE_LINEUP` in `lineup.js`
- Create new Netlify functions in `netlify/functions/`

### Limit Access
Make the GitHub repo **Private** if you only want close friends to have access.

---

## ⚙️ Netlify Blobs (Cloud Storage)

Favorites are stored per user via Netlify Blobs:

**Endpoint:** `/.netlify/functions/favorites`

**GET** — Retrieve favorites:
```bash
curl "/.netlify/functions/favorites?username=rune"
```

**POST** — Save favorites:
```bash
curl -X POST /.netlify/functions/favorites \
  -H "Content-Type: application/json" \
  -d '{"username":"rune","favorites":["Artist1","Artist2"]}'
```

---

## 🔄 Updates & Deployment

1. Edit files locally (or in GitHub web editor)
2. Commit changes
3. Push to GitHub
4. **Netlify auto-deploys** (1-2 minutes)

Check deploy status at: `https://app.netlify.com` → your site → **Deploys**

---

## 📱 Share with Friends

Share your live URL:
```
https://[your-site-name].netlify.app
```

Friends can:
1. Enter their name
2. Mark favorites (⭐)
3. Mark "Møt meg her" (📍)
4. See friends list
5. Switch dark/light mode

---

## 🐛 Troubleshooting

**App won't load?**
- Clear browser cache (Ctrl+Shift+Del)
- Try incognito/private window
- Check Netlify deploy logs

**Favorites not saving?**
- Check browser console (F12)
- Verify localStorage is enabled
- For Blobs: ensure `netlify/functions/favorites.js` is deployed

**Admin panel not working?**
- Password is case-sensitive: `rock`
- Refresh after making changes

---

## 📈 Version

**Current:** v2.0.0-beta  
**Based on:** Tons of Rock 2026 architecture

---

## 📝 License

MIT — Use freely, credit appreciated

---

**Made for Roskilde Festival 2026** 🎸🎵
