// firebase-adapter.js - Adapter um die bestehende index.html mit Firebase zu verbinden

// Override the loadData function to use Firebase instead of localStorage
window.loadData = async function() {
    try {
        // Try to get data from Firebase first
        if (typeof FirebaseService !== 'undefined') {
            console.log('📱 Loading data from Firebase...');
            
            const data = await FirebaseService.getAllAppData();
            
            if (data) {
                console.log('✅ Data loaded from Firebase');
                return data;
            }
        }
        
        // Fallback to localStorage if Firebase is not available
        console.log('📦 Fallback to localStorage...');
        const stored = localStorage.getItem('zahngutAppData');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                return data;
            } catch (error) {
                console.error('Error parsing localStorage data:', error);
            }
        }
        
        // Fallback to default data
        if (typeof ZahngutData !== 'undefined') {
            return ZahngutData.defaultData;
        }
        
        return null;
    } catch (error) {
        console.error('Error loading data:', error);
        
        // Fallback to localStorage on error
        const stored = localStorage.getItem('zahngutAppData');
        if (stored) {
            return JSON.parse(stored);
        }
        
        return null;
    }
};

// Real-time updates for the app
function setupRealtimeUpdates() {
    if (typeof FirebaseService === 'undefined') {
        console.log('Firebase not available, skipping realtime updates');
        return;
    }
    
    // Subscribe to treatments updates
    FirebaseService.subscribeToTreatments((treatments) => {
        console.log('📱 Treatments updated in real-time');
        // Update the UI with new treatments
        if (typeof generateBehandlungen === 'function') {
            const appData = { treatments };
            generateBehandlungen(appData);
            generateBehandlungDetails(appData);
        }
    });
    
    // Subscribe to videos updates
    FirebaseService.subscribeToVideos((videos) => {
        console.log('📹 Videos updated in real-time');
        // Update the UI with new videos
        if (typeof generateVideos === 'function') {
            const appData = { videos };
            generateVideos(appData);
        }
    });
    
    // Subscribe to aftercare updates
    FirebaseService.subscribeToAftercare((aftercare) => {
        console.log('💊 Aftercare updated in real-time');
        // Update the UI with new aftercare
        if (typeof generateNachsorge === 'function') {
            const appData = { aftercare };
            generateNachsorge(appData);
        }
    });
}

// Initialize Firebase connection for the app
function initializeFirebaseApp() {
    // Check if Firebase is available
    if (typeof firebase === 'undefined') {
        console.log('Firebase not loaded, running in offline mode');
        return;
    }
    
    console.log('🔥 Initializing Firebase for app...');
    
    // Setup realtime updates
    setupRealtimeUpdates();
    
    // Monitor connection status
    if (firebase.database) {
        const connectedRef = firebase.database().ref('.info/connected');
        connectedRef.on('value', (snap) => {
            if (snap.val() === true) {
                console.log('✅ App connected to Firebase');
                
                // Show online indicator (optional)
                const indicator = document.createElement('div');
                indicator.id = 'firebase-indicator';
                indicator.style.cssText = `
                    position: fixed;
                    bottom: 70px;
                    right: 10px;
                    background: #10b981;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 20px;
                    font-size: 11px;
                    z-index: 100;
                    opacity: 0.8;
                `;
                indicator.textContent = '🔥 Live';
                
                const existing = document.getElementById('firebase-indicator');
                if (existing) existing.remove();
                document.body.appendChild(indicator);
                
                // Hide after 3 seconds
                setTimeout(() => {
                    indicator.style.display = 'none';
                }, 3000);
            } else {
                console.log('⚠️ App offline - using cached data');
                
                // Show offline indicator
                const indicator = document.getElementById('firebase-indicator');
                if (indicator) {
                    indicator.textContent = '📴 Offline';
                    indicator.style.background = '#ef4444';
                    indicator.style.display = 'block';
                }
            }
        });
    }
}

// Enhanced applyData function that works with Firebase
const originalApplyData = window.applyData;
window.applyData = async function() {
    // Load data from Firebase or localStorage
    const appData = await loadData();
    
    if (!appData) {
        console.log('No data available');
        return;
    }
    
    // Call the original applyData if it exists
    if (typeof originalApplyData === 'function') {
        originalApplyData();
    } else {
        // Apply data directly if original function doesn't exist
        applyDataDirect(appData);
    }
};

// Direct data application (backup if original doesn't exist)
function applyDataDirect(appData) {
    // Apply design settings
    if (appData.design) {
        applyDesignSettings(appData);
    }
    
    // Update logo
    if (typeof updateLogo === 'function') {
        updateLogo(appData);
    }
    
    // Update praxis info
    if (appData.praxis) {
        // Update all text elements with praxis data
        const praxisName = appData.praxis.name || 'Zahngut';
        document.querySelectorAll('.praxis-name').forEach(el => {
            el.textContent = praxisName;
        });
        
        document.querySelectorAll('.hero-title').forEach(el => {
            el.textContent = 'Willkommen bei ' + praxisName;
        });
        
        document.querySelectorAll('.hero-slogan').forEach(el => {
            el.textContent = appData.praxis.slogan || '';
        });
    }
    
    // Generate dynamic content
    if (typeof generateBehandlungen === 'function') {
        generateBehandlungen(appData);
    }
    if (typeof generateVideos === 'function') {
        generateVideos(appData);
    }
    if (typeof generateNachsorge === 'function') {
        generateNachsorge(appData);
    }
    if (typeof updateOeffnungszeiten === 'function') {
        updateOeffnungszeiten(appData);
    }
    if (typeof updateEmergencyInfo === 'function') {
        updateEmergencyInfo(appData);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFirebaseApp);
} else {
    initializeFirebaseApp();
}

console.log('🔥 Firebase Adapter loaded - App can now use Firebase data!');
