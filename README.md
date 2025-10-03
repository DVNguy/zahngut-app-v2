# Zahngut Bad Wünnenberg - PWA App

A Progressive Web App (PWA) for dental practice patient information and services.

## Features

- **Offline-First**: Works without internet connection after first visit
- **Installable**: Can be installed on mobile devices as a native app
- **Treatments**: Information about dental treatments offered
- **Educational Videos**: Video library for patient education
- **Aftercare Tips**: Post-treatment care instructions
- **Appointment Booking**: Direct link to Doctolib for online appointments
- **Emergency Info**: Emergency contact information and first aid tips
- **Opening Hours**: Practice opening hours and contact information

## Quick Start

### Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser to `http://localhost:8080`

### PWA Installation

The app can be installed as a PWA:

1. Open the app in a modern browser (Chrome, Edge, Safari)
2. Look for the "Install" prompt in the address bar
3. Click "Install" to add the app to your home screen

## File Structure

```
├── index.html          # Main app file
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker for offline functionality
├── data.js            # App data and content
├── icons/             # PWA icons (various sizes)
└── package.json       # Dependencies and scripts
```

## Technology Stack

- **Frontend**: Pure HTML, CSS, and JavaScript
- **PWA**: Service Worker, Web Manifest
- **Storage**: LocalStorage for offline data
- **Icons**: Generated programmatically

## Customization

### Updating Content

Edit `data.js` to update:
- Practice information
- Opening hours
- Treatments
- Videos
- Aftercare instructions
- Emergency information

### Changing Colors

Edit the CSS variables in `index.html`:
```css
:root {
    --primary: #0891b2;
    --primary-dark: #0e7490;
    --accent: #06b6d4;
    /* ... */
}
```

### Adding Icons

Replace the icons in the `icons/` directory with your custom icons. Make sure to maintain the sizes specified in `manifest.json`.

## Deployment

### Static Hosting

This is a static site and can be deployed to any static hosting service:

- **Netlify**: Drop the folder or connect to Git
- **Vercel**: Deploy with zero config
- **GitHub Pages**: Push to a repository and enable Pages
- **Firebase Hosting**: `firebase deploy --only hosting`
- **Any web server**: Upload files to your server

### Requirements

- HTTPS is required for PWA features to work
- A valid SSL certificate

## Browser Support

- Chrome 67+
- Edge 79+
- Safari 11.1+
- Firefox 63+
- Opera 54+

## Offline Functionality

The app uses a Service Worker to cache:
- All HTML, CSS, and JavaScript files
- App icons
- App data

After the first visit, the app will work completely offline.

## Mobile App (Optional)

To build native mobile apps using Capacitor:

```bash
# Initialize Capacitor
npm run cap:init

# Add platforms
npm run cap:add:android
npm run cap:add:ios

# Sync web code to native projects
npm run cap:sync

# Open in Android Studio / Xcode
npm run cap:open:android
npm run cap:open:ios
```

## License

MIT

## Support

For support or questions, contact:
- Email: info@dein-zahngut.de
- Phone: 02957/1010
