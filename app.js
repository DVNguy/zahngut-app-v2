// Main Application Logic
import { dataService } from './data-service.js';

// App State
let appData = null;
let currentView = 'home';
let isLoading = false;
let lastRefreshTime = null;

// Initialize App
async function initApp() {
    console.log('🚀 Initializing Zahngut App...');

    // Show loading screen
    showLoadingScreen();

    // Fetch all data
    try {
        appData = await dataService.fetchAll();
        console.log('✅ Data loaded successfully', appData);

        // Render the app
        renderApp();

        // Hide loading screen
        hideLoadingScreen();

        // Update last refresh time
        updateLastRefreshTime();
    } catch (error) {
        console.error('Error initializing app:', error);
        showError();
    }
}

// Show loading screen
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hide');
    }
}

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hide');
        }, 500);
    }
}

// Navigation
window.switchTab = function(tabName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const activeSection = document.getElementById(tabName);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Update nav if main tab
    const mainTabs = ['home', 'behandlungen', 'videos', 'nachsorge', 'termine', 'aktuelles'];
    if (mainTabs.includes(tabName)) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const navItem = document.querySelector(`[data-tab="${tabName}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }
    }

    currentView = tabName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Show Treatment Detail
window.showBehandlungDetail = function(treatmentId) {
    if (!appData || !appData.treatments) return;

    const treatment = appData.treatments.find(t => t.id === treatmentId);
    if (!treatment) return;

    const content = document.getElementById('behandlungDetailContent');
    content.innerHTML = `
        <div class="detail-header">
            <div class="detail-icon">${treatment.icon || '🦷'}</div>
            <div class="detail-title">${treatment.name}</div>
            <div class="detail-subtitle">${treatment.subtitle || ''}</div>
        </div>

        <div class="detail-section">
            <h3>Was ist das?</h3>
            <p>${treatment.description || 'Keine Beschreibung verfügbar'}</p>
        </div>

        ${treatment.procedure && treatment.procedure.length > 0 ? `
            <div class="detail-section">
                <h3>Behandlungsablauf</h3>
                <ul>
                    ${treatment.procedure.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        ` : ''}

        ${treatment.benefits && treatment.benefits.length > 0 ? `
            <div class="detail-section">
                <h3>Ihre Vorteile</h3>
                <ul>
                    ${treatment.benefits.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        ` : ''}

        <div class="detail-info">
            ${treatment.duration ? `
                <div class="detail-info-item">
                    <div class="detail-info-label">Dauer</div>
                    <div class="detail-info-value">${treatment.duration}</div>
                </div>
            ` : ''}
            ${treatment.recommended ? `
                <div class="detail-info-item">
                    <div class="detail-info-label">Empfohlen</div>
                    <div class="detail-info-value">${treatment.recommended}</div>
                </div>
            ` : ''}
        </div>
    `;

    switchTab('behandlungDetail');
};

// Toggle Nachsorge
window.toggleNachsorge = function(element) {
    element.classList.toggle('expanded');
};

// Show News Detail
window.showNewsDetail = function(newsId) {
    if (!appData || !appData.news) return;

    const article = appData.news.find(n => n.id === newsId);
    if (!article) return;

    const content = document.getElementById('newsDetailContent');
    content.innerHTML = `
        <div class="detail-header">
            <div class="detail-icon">📰</div>
            <div class="detail-title">${article.title}</div>
            <div class="detail-subtitle">${formatDate(article.published_at)} • ${article.author}</div>
        </div>

        ${article.image_url ? `
            <div class="news-detail-image">
                <img src="${article.image_url}" alt="${article.title}" style="width: 100%; border-radius: 16px; margin-bottom: 20px;">
            </div>
        ` : ''}

        <div class="detail-section">
            <div style="line-height: 1.8; white-space: pre-wrap;">${article.content}</div>
        </div>
    `;

    switchTab('newsDetail');
};

// Refresh Data
window.refreshData = async function() {
    if (isLoading) return;

    isLoading = true;
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.classList.add('spinning');
    }

    try {
        appData = await dataService.refreshAll();
        renderApp();
        updateLastRefreshTime();
        showToast('Aktualisiert', 'success');
    } catch (error) {
        console.error('Error refreshing data:', error);
        showToast('Aktualisierung fehlgeschlagen', 'error');
    } finally {
        isLoading = false;
        if (refreshBtn) {
            refreshBtn.classList.remove('spinning');
        }
    }
};

// Update last refresh time display
function updateLastRefreshTime() {
    const updateTime = dataService.getLastUpdateTime('news');
    const updateDisplay = document.getElementById('lastUpdateTime');
    if (updateDisplay && updateTime) {
        updateDisplay.textContent = `Aktualisiert ${updateTime}`;
    }
}

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Heute';
    if (days === 1) return 'Gestern';
    if (days < 7) return `vor ${days} Tagen`;

    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Render App
function renderApp() {
    if (!appData) return;

    // Update header
    renderHeader();

    // Render sections
    renderBehandlungen();
    renderVideos();
    renderNachsorge();
    renderOpeningHours();
    renderContactInfo();
    renderEmergencyInfo();
    renderNews();
}

// Render Header
function renderHeader() {
    if (!appData.praxis) return;

    const praxisName = document.querySelector('.praxis-name');
    if (praxisName) {
        praxisName.textContent = appData.praxis.name || 'Zahngut Bad Wünnenberg';
    }

    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.textContent = `Willkommen bei ${appData.praxis.name || 'Zahngut'}`;
    }

    const heroSlogan = document.querySelector('.hero-slogan');
    if (heroSlogan) {
        heroSlogan.textContent = appData.praxis.slogan || '';
    }
}

// Render Behandlungen
function renderBehandlungen() {
    const grid = document.getElementById('behandlungenGrid');
    if (!grid) return;

    if (!appData.treatments || appData.treatments.length === 0) {
        grid.innerHTML = '<p>Keine Behandlungen verfügbar</p>';
        return;
    }

    grid.innerHTML = appData.treatments
        .filter(b => b.active !== false)
        .map(behandlung => `
            <div class="behandlung-card" onclick="showBehandlungDetail('${behandlung.id}')">
                <div class="behandlung-icon">${behandlung.icon || '🦷'}</div>
                <div class="behandlung-name">${behandlung.name}</div>
            </div>
        `).join('');
}

// Render Videos
function renderVideos() {
    const container = document.getElementById('videosList');
    if (!container) return;

    if (!appData.videos || appData.videos.length === 0) {
        container.innerHTML = '<p>Keine Videos verfügbar</p>';
        return;
    }

    container.innerHTML = appData.videos
        .filter(v => v.active !== false)
        .map(video => `
            <div class="video-card" onclick="window.open('${video.url}', '_blank')">
                <div class="video-title">${video.title}</div>
                <div class="video-info">
                    <span>⏱ ${video.duration || 'N/A'}</span>
                    <span>👁 ${video.views || '0'} Aufrufe</span>
                </div>
            </div>
        `).join('');
}

// Render Nachsorge
function renderNachsorge() {
    const container = document.getElementById('nachsorgeList');
    if (!container) return;

    if (!appData.aftercare || appData.aftercare.length === 0) {
        container.innerHTML = '<p>Keine Nachsorge-Tipps verfügbar</p>';
        return;
    }

    container.innerHTML = appData.aftercare
        .filter(n => n.active !== false)
        .map(item => `
            <div class="nachsorge-card" onclick="toggleNachsorge(this)">
                <div class="nachsorge-header">
                    <div class="nachsorge-icon">${item.icon || '🦷'}</div>
                    <div class="nachsorge-info">
                        <h3>${item.treatment_name}</h3>
                        <p>${item.short_description}</p>
                    </div>
                </div>
                <div class="nachsorge-content">
                    <div class="timeline">
                        ${Object.values(item.phases || {}).map(phase => `
                            <div class="timeline-item">
                                <h4>${phase.title} (${phase.time})</h4>
                                <ul>
                                    ${phase.items.map(i => `<li>${i}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                    ${item.warning ? `
                        <div class="warning-box">
                            <strong>⚠️ Sofort melden bei:</strong> ${item.warning}
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
}

// Render Opening Hours
function renderOpeningHours() {
    const container = document.getElementById('openingHours');
    if (!container) return;

    if (!appData.openingHours) {
        container.innerHTML = '<p>Öffnungszeiten nicht verfügbar</p>';
        return;
    }

    const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

    container.innerHTML = appData.openingHours
        .map(hours => {
            const timeText = hours.is_closed || !hours.opening_time || !hours.closing_time
                ? 'Geschlossen'
                : `${hours.opening_time} - ${hours.closing_time} Uhr`;

            return `
                <div class="hours-row">
                    <div class="day">${hours.day_name || dayNames[hours.day_of_week]}</div>
                    <div class="time">${timeText}</div>
                </div>
            `;
        }).join('');
}

// Render Contact Info
function renderContactInfo() {
    if (!appData.praxis) return;

    const phoneNumber = document.getElementById('phoneNumber');
    if (phoneNumber) {
        phoneNumber.textContent = appData.praxis.telefon || '02957/1010';
    }

    const emailAddress = document.getElementById('emailAddress');
    if (emailAddress) {
        emailAddress.textContent = appData.praxis.email || 'info@dein-zahngut.de';
    }

    const praxisAddress = document.getElementById('praxisAddress');
    if (praxisAddress) {
        praxisAddress.innerHTML = `
            ${appData.praxis.street || 'Hauptstraße 1'}<br>
            ${appData.praxis.zip || '33181'} ${appData.praxis.city || 'Bad Wünnenberg'}
        `;
    }

    const doctolibLink = document.getElementById('doctolibLink');
    if (doctolibLink && appData.praxis.doctolib_url) {
        doctolibLink.href = appData.praxis.doctolib_url;
    }
}

// Render Emergency Info
function renderEmergencyInfo() {
    if (!appData.emergency) return;

    const emergencyNumber = document.getElementById('emergencyNumber');
    if (emergencyNumber) {
        emergencyNumber.textContent = appData.emergency.emergency_number || '01805 / 986 700';
    }

    const emergencyInstructions = document.getElementById('emergencyInstructions');
    if (emergencyInstructions && appData.emergency.instructions) {
        emergencyInstructions.innerHTML = appData.emergency.instructions
            .map(instruction => `<li>${instruction}</li>`)
            .join('');
    }

    const toothOutInstructions = document.getElementById('toothOutInstructions');
    if (toothOutInstructions && appData.emergency.tooth_loss_info) {
        toothOutInstructions.textContent = appData.emergency.tooth_loss_info;
    }

    const toothLooseInstructions = document.getElementById('toothLooseInstructions');
    if (toothLooseInstructions && appData.emergency.loose_tooth_info) {
        toothLooseInstructions.textContent = appData.emergency.loose_tooth_info;
    }
}

// Render News
function renderNews() {
    const container = document.getElementById('newsList');
    if (!container) return;

    if (!appData.news || appData.news.length === 0) {
        container.innerHTML = `
            <div class="news-empty">
                <div style="font-size: 48px; margin-bottom: 20px;">📰</div>
                <h3>Noch keine Neuigkeiten</h3>
                <p style="color: var(--text-light); margin-top: 10px;">Schauen Sie bald wieder vorbei!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = appData.news.map(article => {
        const publishedDate = new Date(article.published_at);
        const now = new Date();
        const diffDays = Math.floor((now - publishedDate) / (1000 * 60 * 60 * 24));
        const isNew = diffDays < 7;

        return `
            <div class="news-card ${article.is_featured ? 'featured' : ''}" onclick="showNewsDetail('${article.id}')">
                ${article.image_url ? `
                    <div class="news-image">
                        <img src="${article.image_url}" alt="${article.title}">
                    </div>
                ` : ''}
                <div class="news-content">
                    ${isNew ? '<span class="news-badge">Neu</span>' : ''}
                    <h3 class="news-title">${article.title}</h3>
                    <p class="news-excerpt">${article.excerpt || ''}</p>
                    <div class="news-meta">
                        <span>${formatDate(article.published_at)}</span>
                        <span>•</span>
                        <span>${article.author}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Show Error
function showError() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div style="padding: 40px; text-align: center;">
            <h2 style="color: var(--error);">Fehler beim Laden</h2>
            <p style="margin-top: 20px; color: var(--text-light);">
                Die App-Daten konnten nicht geladen werden.<br>
                Bitte prüfen Sie Ihre Internetverbindung.
            </p>
            <button onclick="location.reload()" style="
                margin-top: 30px;
                padding: 12px 24px;
                background: var(--primary);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
            ">Neu laden</button>
        </div>
    `;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('✅ Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

// Update refresh time periodically
setInterval(() => {
    updateLastRefreshTime();
}, 60 * 1000); // Every minute

console.log('✅ App initialized');
