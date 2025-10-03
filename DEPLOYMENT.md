# Deployment Guide

## Pre-Deployment Checklist

- [ ] Test the app locally at `http://localhost:8080`
- [ ] Verify all content in `data.js` is correct
- [ ] Check that all icons are present in `/icons/` directory
- [ ] Test PWA installation on mobile device
- [ ] Test offline functionality
- [ ] Verify all external links (Doctolib, YouTube)
- [ ] Test on different browsers (Chrome, Safari, Firefox)

## Deployment Options

### Option 1: Netlify (Recommended for Quick Setup)

1. **Via Netlify Drop**:
   - Go to https://app.netlify.com/drop
   - Drag and drop the entire project folder
   - Your site will be live in seconds!

2. **Via Git**:
   ```bash
   # Initialize git repository
   git init
   git add .
   git commit -m "Initial commit"

   # Push to GitHub
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main

   # Connect to Netlify via their dashboard
   ```

3. **Configure**:
   - Build command: `npm run build` (optional)
   - Publish directory: `.` (root directory)
   - Enable HTTPS (automatic on Netlify)

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to complete deployment

### Option 3: GitHub Pages

1. Push code to GitHub repository

2. In repository settings:
   - Go to Pages section
   - Select branch (usually `main`)
   - Select root folder
   - Save

3. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 4: Traditional Web Hosting

1. **Upload files** via FTP/SFTP:
   - Upload all files to your web server
   - Ensure HTTPS is enabled (required for PWA)

2. **Configure server**:
   - Set up proper MIME types
   - Enable HTTPS
   - Configure caching headers (optional)

3. **Apache `.htaccess` example**:
   ```apache
   # Enable HTTPS
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

   # Service Worker
   <Files "sw.js">
       Header set Cache-Control "no-cache, no-store, must-revalidate"
   </Files>

   # Manifest
   <Files "manifest.json">
       Header set Content-Type "application/manifest+json"
   </Files>
   ```

4. **Nginx configuration example**:
   ```nginx
   server {
       listen 443 ssl;
       server_name yourdomain.com;

       ssl_certificate /path/to/certificate.crt;
       ssl_certificate_key /path/to/private.key;

       root /path/to/app;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       location /sw.js {
           add_header Cache-Control "no-cache, no-store, must-revalidate";
       }

       location /manifest.json {
           add_header Content-Type "application/manifest+json";
       }
   }
   ```

## Post-Deployment

### 1. Test PWA Installation

**On Android (Chrome)**:
1. Open the site in Chrome
2. Tap the three dots menu
3. Select "Install App" or "Add to Home Screen"
4. App should install and launch

**On iOS (Safari)**:
1. Open the site in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. App icon will be added to home screen

### 2. Verify Service Worker

1. Open DevTools (F12)
2. Go to Application tab
3. Check Service Workers section
4. Should show "activated and running"

### 3. Test Offline Mode

1. Open the app while online
2. Turn off network/wifi
3. Refresh the page
4. App should still work

### 4. Check PWA Score

Use Lighthouse (in Chrome DevTools):
1. Open DevTools
2. Go to Lighthouse tab
3. Select "Progressive Web App"
4. Run audit
5. Aim for 90+ score

## Custom Domain Setup

### Netlify
1. Go to Domain settings
2. Add your custom domain
3. Update DNS records as instructed
4. HTTPS will be configured automatically

### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records
4. HTTPS is automatic

### Cloudflare (for any hosting)
1. Add site to Cloudflare
2. Update nameservers at domain registrar
3. Enable "Always Use HTTPS" in SSL/TLS settings
4. Enable "Auto Minify" for performance

## Performance Optimization

### Optional Improvements

1. **Image Optimization**:
   - Use WebP format for icons
   - Compress images

2. **Caching Strategy**:
   - Update service worker caching as needed
   - Add more resources to cache

3. **CDN**:
   - Use a CDN for faster global delivery
   - Most hosting platforms include this

4. **Monitoring**:
   - Set up Google Analytics (optional)
   - Monitor performance with Lighthouse
   - Track PWA installs

## Troubleshooting

### PWA not installing
- Ensure HTTPS is enabled
- Check manifest.json is accessible
- Verify service worker is registered
- Check browser console for errors

### Offline mode not working
- Check service worker is activated
- Verify cache is populated
- Test in incognito mode (to avoid extension interference)

### Icons not showing
- Verify all icon files exist in `/icons/` directory
- Check paths in manifest.json
- Clear browser cache and reload

## Updates and Maintenance

### Updating Content

1. Edit `data.js` with new content
2. Update version number in `sw.js` (CACHE_NAME)
3. Deploy updated files
4. Users will get update on next visit

### Force Update

To force all users to update:
1. Change `CACHE_NAME` in `sw.js`
2. Deploy
3. Old caches will be cleared automatically

## Support

For deployment issues:
- Check browser console for errors
- Review network tab in DevTools
- Test on different browsers
- Verify HTTPS is working

## Security

- Always use HTTPS
- Keep dependencies updated
- Don't commit sensitive data
- Use environment variables for configuration
