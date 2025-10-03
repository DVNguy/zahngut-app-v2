# Quick Start Guide

## Get Your App Running in 5 Minutes

### Step 1: Test Locally (30 seconds)

```bash
npm install
npm start
```

Open your browser to: **http://localhost:8080**

### Step 2: Deploy to Internet (2 minutes)

#### Option A: Netlify (Easiest)
1. Go to https://app.netlify.com/drop
2. Drag and drop your project folder
3. Done! Your app is live 🎉

#### Option B: Vercel
```bash
npm install -g vercel
vercel
```
Follow prompts. Done!

### Step 3: Test on Phone (2 minutes)

1. Open the deployed URL on your phone
2. In Chrome (Android):
   - Tap menu → "Install App"
3. In Safari (iPhone):
   - Tap Share → "Add to Home Screen"

**That's it! Your patients can now install and use the app.**

---

## What Your Patients Will Experience

### On First Visit
1. Visit your app URL
2. See prompt to install app
3. Install to home screen (optional)
4. Browse treatments, videos, and info

### After Installation
1. App icon on home screen (like any app)
2. Opens full-screen (no browser UI)
3. Works offline completely
4. Fast and smooth experience

---

## Customization (Optional)

### Change Practice Info
Edit `data.js` - find the `praxis` section:
```javascript
"praxis": {
    "name": "Your Practice Name",
    "telefon": "Your Phone",
    "email": "your@email.com",
    ...
}
```

### Change Colors
Edit `index.html` - find the `:root` section:
```css
:root {
    --primary: #0891b2;  /* Change this */
    --accent: #06b6d4;   /* And this */
}
```

### Add/Edit Treatments
Edit `data.js` - find the `treatments` array:
```javascript
"treatments": [
    {
        "name": "Your Treatment",
        "icon": "🦷",
        ...
    }
]
```

---

## Updating the App

1. Make changes to `data.js` or `index.html`
2. Update version in `sw.js` (line 2):
   ```javascript
   const CACHE_NAME = 'zahngut-v1.2.0'; // Bump version
   ```
3. Deploy (same as Step 2 above)
4. Users will get update automatically on next visit

---

## Need Help?

- **Read full docs**: `README.md`
- **Deployment guide**: `DEPLOYMENT.md`
- **What was fixed**: `SUMMARY.md`
- **Test locally**: `npm start` then open http://localhost:8080

---

## Checklist Before Going Live

- [ ] Tested app at http://localhost:8080
- [ ] All practice info is correct in `data.js`
- [ ] Phone numbers are correct
- [ ] Email address is correct
- [ ] Doctolib link works
- [ ] Emergency number is correct
- [ ] Tested on your phone
- [ ] PWA installation works
- [ ] All videos play
- [ ] Opening hours are correct

---

## Common Questions

**Q: Do I need a database?**
A: No! Everything works from static files.

**Q: Will it work offline?**
A: Yes! After first visit, works completely offline.

**Q: Can I update content easily?**
A: Yes! Just edit `data.js` and redeploy.

**Q: Does it work on iPhone?**
A: Yes! Works on all modern browsers.

**Q: Do I need to pay for hosting?**
A: No! Free hosting on Netlify, Vercel, or GitHub Pages.

**Q: Is it secure?**
A: Yes! Static files only, HTTPS enforced by hosting.

**Q: Can patients install it like a real app?**
A: Yes! It's a Progressive Web App (PWA).

---

## Your App is Ready! 🚀

Everything is configured and working. Just deploy and share with your patients!

**Share URL**: After deploying, you'll get a URL like:
- `https://your-app.netlify.app`
- `https://your-app.vercel.app`
- Or your custom domain

**Tell patients to**:
1. Visit the URL
2. Install to home screen
3. Enjoy the app!
