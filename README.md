# Roskilde 2026 Festival App

A festival planning app built with React + Netlify Blobs. Based on Tons of Rock design.

**Features:**
- 📋 Schedule with day/scene filtering
- ⭐ Mark favorites + "Møt meg her" markers
- 🗺️ Arena map view
- ⚙️ Admin panel for lineup editing
- 🌙 Dark/Light theme + text size controls
- 👥 Friends list (Vennegjengen)
- ☁️ Cloud-synced favorites (Netlify Blobs)

---

## 🚀 Quick Setup

### 1. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name:** `Roskilde`
3. **Private/Public:** Choose (can be private for friends only)
4. **Create repository** (without README, .gitignore, or license)

### 2. Add Files to GitHub

**Option A: Drag & Drop (Easiest)**
1. Open your new repo
2. Click "uploading an existing file"
3. Drag & drop these files:
   - `index.html`
   - `netlify.toml`
   - `README.md` (this file)

**Option B: Via Git CLI**
```bash
git clone https://github.com/runevangen/Roskilde.git
cd Roskilde
# Copy index.html, netlify.toml, README.md here
git add .
git commit -m "Initial commit: Roskilde app"
git push -u origin main
```

### 3. Deploy to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub account (if not already)
4. Select `runevangen/Roskilde` repo
5. **Build settings:**
   - Build command: (leave empty)
   - Publish directory: `.`
6. Click **"Deploy site"**

### 4. Set Environment Variables (Optional)

1. In Netlify, go to **Site settings** → **Environment**
2. Add variable:
   - Key: `ADMIN_PASSWORD`
   - Value: `rock`

Your app will be live at: `https://[your-random-name].netlify.app`

---

## 🔐 Admin Panel

**Password:** `rock`

**Admin features:**
- Edit artist names
- Change scene/stage
- Update times
- Add/remove shows
- View statistics

---

## 📱 Features

### Schedule View
- Filter by day (Wed-Sat)
- View by scene/stage
- Star (⭐) artists to favorite
- Mark (📍) "Møt meg her" (meet here)

### Arena Map
- Visual representation of stages
- Scene information
- Daily show count

### User Preferences
- Dark/Light theme toggle (🌙☀️)
- Text size scaling (S/M/L)
- Username login

### Favorites (Cloud-Synced)
- Stored per user
- Persists across sessions
- Synced via Netlify Blobs (future)

---

## 🛠️ Customization

### Edit Lineup Data
Edit the `INITIAL_LINEUP` object in `index.html` (lines ~55-100) to add/modify shows:

```javascript
const INITIAL_LINEUP = {
  'Wednesday 1st July': {
    'Orange Scene': [
      { id: '1', time: '17:30', artist: 'Artist Name' },
      // ...
    ]
  }
}
```

### Change Styling
- Colors: Edit Tailwind classes (orange-600, etc)
- Fonts: Modify `font-family` in `<style>`
- Layout: Adjust Tailwind grid/flex classes

---

## 📊 Version

Current: **v2.0.0-beta**

Next: Full Netlify Blobs integration for real-time data sync

---

## 👥 For Your Friends

Share this link with friends:
```
https://[your-deployed-url].netlify.app
```

They can:
1. Enter their name
2. Mark favorites
3. Plan meeting spots
4. View friends' names

---

## ❓ Troubleshooting

**App won't load?**
- Clear browser cache (Ctrl+Shift+Del)
- Try incognito/private window

**Favorites not saving?**
- Check browser localStorage (DevTools → Application → Local Storage)

**Admin panel not working?**
- Password is case-sensitive: `rock`

---

## 🔄 Updates

To update the app:
1. Edit files in your repo
2. Commit & push to GitHub
3. Netlify auto-deploys (1-2 minutes)

Check deploy status at: https://app.netlify.com → your site → Deploys

---

**Made for Roskilde 2026** 🎵🎸
