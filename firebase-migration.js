// firebase-migration.js - Migriert bestehende localStorage Daten zu Firebase

const FirebaseMigration = {
    
    // Migrate all data from localStorage to Firebase
    async migrateFromLocalStorage() {
        console.log('🔄 Starting migration from localStorage to Firebase...');
        
        try {
            // Check if user is authenticated
            if (!FirebaseService.isAdmin()) {
                console.error('❌ User must be logged in as admin to migrate data');
                return { success: false, error: 'Not authenticated' };
            }
            
            // Get data from localStorage
            const localData = localStorage.getItem('zahngutAppData');
            
            if (!localData) {
                console.log('ℹ️ No localStorage data found to migrate');
                return { success: false, error: 'No data to migrate' };
            }
            
            const appData = JSON.parse(localData);
            console.log('📦 Found localStorage data:', appData);
            
            // Migrate each section
            const results = {
                praxis: false,
                oeffnungszeiten: false,
                treatments: 0,
                videos: 0,
                aftercare: 0,
                design: false,
                emergency: false
            };
            
            // Migrate Praxis Info
            if (appData.praxis) {
                const result = await FirebaseService.savePraxisInfo(appData.praxis);
                results.praxis = result.success;
                console.log('✅ Praxis info migrated');
            }
            
            // Migrate Opening Hours
            if (appData.oeffnungszeiten) {
                const result = await FirebaseService.saveOpeningHours(appData.oeffnungszeiten);
                results.oeffnungszeiten = result.success;
                console.log('✅ Opening hours migrated');
            }
            
            // Migrate Treatments
            if (appData.treatments && Array.isArray(appData.treatments)) {
                for (const treatment of appData.treatments) {
                    const result = await FirebaseService.addTreatment(treatment);
                    if (result.success) results.treatments++;
                }
                console.log(`✅ ${results.treatments} treatments migrated`);
            }
            
            // Migrate Videos
            if (appData.videos && Array.isArray(appData.videos)) {
                for (const video of appData.videos) {
                    const result = await FirebaseService.addVideo(video);
                    if (result.success) results.videos++;
                }
                console.log(`✅ ${results.videos} videos migrated`);
            }
            
            // Migrate Aftercare
            if (appData.aftercare && Array.isArray(appData.aftercare)) {
                for (const item of appData.aftercare) {
                    const result = await FirebaseService.addAftercare(item);
                    if (result.success) results.aftercare++;
                }
                console.log(`✅ ${results.aftercare} aftercare items migrated`);
            }
            
            // Migrate Design Settings
            if (appData.design) {
                // Handle base64 images - upload to Firebase Storage
                const design = { ...appData.design };
                
                if (design.customIcon && design.customIcon.startsWith('data:')) {
                    // Convert base64 to blob and upload
                    const blob = await this.base64ToBlob(design.customIcon);
                    const uploadResult = await FirebaseService.uploadImage(blob, 'design/custom-icon.png');
                    if (uploadResult.success) {
                        design.customIcon = uploadResult.url;
                    }
                }
                
                if (design.customLogo && design.customLogo.startsWith('data:')) {
                    // Convert base64 to blob and upload
                    const blob = await this.base64ToBlob(design.customLogo);
                    const uploadResult = await FirebaseService.uploadImage(blob, 'design/custom-logo.png');
                    if (uploadResult.success) {
                        design.customLogo = uploadResult.url;
                    }
                }
                
                const result = await FirebaseService.saveDesign(design);
                results.design = result.success;
                console.log('✅ Design settings migrated');
            }
            
            // Migrate Emergency Info
            if (appData.emergency) {
                const result = await FirebaseService.saveEmergency(appData.emergency);
                results.emergency = result.success;
                console.log('✅ Emergency info migrated');
            }
            
            // Create backup of localStorage data
            const backupKey = `zahngutAppData_backup_${Date.now()}`;
            localStorage.setItem(backupKey, localData);
            console.log(`💾 Backup created: ${backupKey}`);
            
            // Optionally clear original localStorage data
            // localStorage.removeItem('zahngutAppData');
            
            console.log('🎉 Migration completed!', results);
            return { success: true, results };
            
        } catch (error) {
            console.error('❌ Migration error:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Helper function to convert base64 to blob
    async base64ToBlob(base64) {
        const response = await fetch(base64);
        return await response.blob();
    },
    
    // Check migration status
    async checkMigrationStatus() {
        try {
            const hasLocalData = localStorage.getItem('zahngutAppData') !== null;
            const hasFirebaseData = await this.hasFirebaseData();
            
            return {
                hasLocalData,
                hasFirebaseData,
                needsMigration: hasLocalData && !hasFirebaseData
            };
        } catch (error) {
            console.error('Error checking migration status:', error);
            return {
                hasLocalData: false,
                hasFirebaseData: false,
                needsMigration: false
            };
        }
    },
    
    // Check if Firebase has data
    async hasFirebaseData() {
        try {
            const data = await FirebaseService.getAllAppData();
            return data && (
                data.praxis ||
                data.treatments?.length > 0 ||
                data.videos?.length > 0 ||
                data.aftercare?.length > 0
            );
        } catch (error) {
            return false;
        }
    },
    
    // Interactive migration with UI
    async startInteractiveMigration() {
        const status = await this.checkMigrationStatus();
        
        if (!status.needsMigration) {
            if (!status.hasLocalData) {
                alert('Keine lokalen Daten zum Migrieren gefunden.');
            } else if (status.hasFirebaseData) {
                if (confirm('Firebase enthält bereits Daten. Möchten Sie trotzdem die lokalen Daten importieren? (Bestehende Daten werden überschrieben)')) {
                    return await this.migrateFromLocalStorage();
                }
            }
            return { success: false, error: 'No migration needed' };
        }
        
        if (confirm('Lokale Daten gefunden! Möchten Sie diese jetzt zu Firebase migrieren?')) {
            const result = await this.migrateFromLocalStorage();
            
            if (result.success) {
                alert('✅ Migration erfolgreich abgeschlossen!\n\n' + 
                    `Migriert:\n` +
                    `- Behandlungen: ${result.results.treatments}\n` +
                    `- Videos: ${result.results.videos}\n` +
                    `- Nachsorge: ${result.results.aftercare}`);
            } else {
                alert('❌ Migration fehlgeschlagen: ' + result.error);
            }
            
            return result;
        }
        
        return { success: false, error: 'Migration cancelled' };
    },
    
    // Load default data if no data exists
    async loadDefaultData() {
        try {
            // Check if data already exists
            const hasData = await this.hasFirebaseData();
            
            if (hasData) {
                console.log('ℹ️ Firebase already contains data');
                return { success: false, error: 'Data already exists' };
            }
            
            // Load default data from data.js if available
            if (typeof ZahngutData !== 'undefined' && ZahngutData.defaultData) {
                console.log('📦 Loading default data from data.js...');
                
                const result = await FirebaseService.importAllData(ZahngutData.defaultData);
                
                if (result.success) {
                    console.log('✅ Default data loaded successfully');
                    alert('Standard-Daten wurden erfolgreich geladen!');
                }
                
                return result;
            } else {
                console.log('ℹ️ No default data available');
                return { success: false, error: 'No default data found' };
            }
        } catch (error) {
            console.error('❌ Error loading default data:', error);
            return { success: false, error: error.message };
        }
    }
};

// Make available globally
window.FirebaseMigration = FirebaseMigration;
console.log('🔄 Firebase Migration Tool loaded');

// Auto-check for migration on load if user is authenticated
if (typeof auth !== 'undefined') {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            const status = await FirebaseMigration.checkMigrationStatus();
            if (status.needsMigration) {
                console.log('📦 Local data found that needs migration to Firebase');
                console.log('Run FirebaseMigration.startInteractiveMigration() to begin');
            }
        }
    });
}
