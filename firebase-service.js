// firebase-service.js - Firebase Datenbankoperationen für Zahngut App

const FirebaseService = {
    // Collection Names
    COLLECTIONS: {
        SETTINGS: 'settings',
        TREATMENTS: 'treatments',
        VIDEOS: 'videos',
        AFTERCARE: 'aftercare',
        PRAXIS_INFO: 'praxis_info',
        OPENING_HOURS: 'opening_hours',
        DESIGN: 'design',
        EMERGENCY: 'emergency'
    },

    // ============= AUTH FUNKTIONEN =============
    
    // Admin Login
    async loginAdmin(email, password) {
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            console.log('✅ Admin logged in:', result.user.email);
            return { success: true, user: result.user };
        } catch (error) {
            console.error('❌ Login error:', error);
            return { success: false, error: error.message };
        }
    },

    // Admin Logout
    async logoutAdmin() {
        try {
            await auth.signOut();
            console.log('✅ Admin logged out');
            return { success: true };
        } catch (error) {
            console.error('❌ Logout error:', error);
            return { success: false, error: error.message };
        }
    },

    // Check if user is admin
    isAdmin() {
        return currentUser !== null;
    },

    // Get current user
    getCurrentUser() {
        return currentUser;
    },

    // ============= PRAXIS INFO =============
    
    // Save Praxis Info
    async savePraxisInfo(data) {
        try {
            await db.collection(this.COLLECTIONS.PRAXIS_INFO).doc('main').set({
                name: data.name || 'Zahngut Bad Wünnenberg',
                slogan: data.slogan || '',
                telefon: data.telefon || '',
                notdienst: data.notdienst || '',
                email: data.email || '',
                doctolib: data.doctolib || '',
                address: {
                    street: data.address?.street || '',
                    zip: data.address?.zip || '',
                    city: data.address?.city || ''
                },
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            
            console.log('✅ Praxis info saved');
            return { success: true };
        } catch (error) {
            console.error('❌ Error saving praxis info:', error);
            return { success: false, error: error.message };
        }
    },

    // Get Praxis Info
    async getPraxisInfo() {
        try {
            const doc = await db.collection(this.COLLECTIONS.PRAXIS_INFO).doc('main').get();
            if (doc.exists) {
                return doc.data();
            }
            return null;
        } catch (error) {
            console.error('❌ Error getting praxis info:', error);
            return null;
        }
    },

    // ============= ÖFFNUNGSZEITEN =============
    
    // Save Opening Hours
    async saveOpeningHours(hours) {
        try {
            await db.collection(this.COLLECTIONS.OPENING_HOURS).doc('main').set({
                montag: hours.montag || { von: '', bis: '' },
                dienstag: hours.dienstag || { von: '', bis: '' },
                mittwoch: hours.mittwoch || { von: '', bis: '' },
                donnerstag: hours.donnerstag || { von: '', bis: '' },
                freitag: hours.freitag || { von: '', bis: '' },
                samstag: hours.samstag || { von: '', bis: '' },
                sonntag: hours.sonntag || { von: '', bis: '' },
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            console.log('✅ Opening hours saved');
            return { success: true };
        } catch (error) {
            console.error('❌ Error saving opening hours:', error);
            return { success: false, error: error.message };
        }
    },

    // Get Opening Hours
    async getOpeningHours() {
        try {
            const doc = await db.collection(this.COLLECTIONS.OPENING_HOURS).doc('main').get();
            if (doc.exists) {
                return doc.data();
            }
            return null;
        } catch (error) {
            console.error('❌ Error getting opening hours:', error);
            return null;
        }
    },

    // ============= BEHANDLUNGEN =============
    
    // Add Treatment
    async addTreatment(treatment) {
        try {
            const docRef = await db.collection(this.COLLECTIONS.TREATMENTS).add({
                ...treatment,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                active: treatment.active !== false
            });
            
            console.log('✅ Treatment added with ID:', docRef.id);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('❌ Error adding treatment:', error);
            return { success: false, error: error.message };
        }
    },

    // Update Treatment
    async updateTreatment(id, treatment) {
        try {
            await db.collection(this.COLLECTIONS.TREATMENTS).doc(id).update({
                ...treatment,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            console.log('✅ Treatment updated:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error updating treatment:', error);
            return { success: false, error: error.message };
        }
    },

    // Delete Treatment
    async deleteTreatment(id) {
        try {
            await db.collection(this.COLLECTIONS.TREATMENTS).doc(id).delete();
            console.log('✅ Treatment deleted:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error deleting treatment:', error);
            return { success: false, error: error.message };
        }
    },

    // Get All Treatments
    async getTreatments() {
        try {
            const snapshot = await db.collection(this.COLLECTIONS.TREATMENTS)
                .where('active', '==', true)
                .orderBy('createdAt', 'desc')
                .get();
            
            const treatments = [];
            snapshot.forEach(doc => {
                treatments.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return treatments;
        } catch (error) {
            console.error('❌ Error getting treatments:', error);
            return [];
        }
    },

    // ============= VIDEOS =============
    
    // Add Video
    async addVideo(video) {
        try {
            const docRef = await db.collection(this.COLLECTIONS.VIDEOS).add({
                ...video,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                active: video.active !== false
            });
            
            console.log('✅ Video added with ID:', docRef.id);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('❌ Error adding video:', error);
            return { success: false, error: error.message };
        }
    },

    // Update Video
    async updateVideo(id, video) {
        try {
            await db.collection(this.COLLECTIONS.VIDEOS).doc(id).update({
                ...video,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            console.log('✅ Video updated:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error updating video:', error);
            return { success: false, error: error.message };
        }
    },

    // Delete Video
    async deleteVideo(id) {
        try {
            await db.collection(this.COLLECTIONS.VIDEOS).doc(id).delete();
            console.log('✅ Video deleted:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error deleting video:', error);
            return { success: false, error: error.message };
        }
    },

    // Get All Videos
    async getVideos() {
        try {
            const snapshot = await db.collection(this.COLLECTIONS.VIDEOS)
                .where('active', '==', true)
                .orderBy('createdAt', 'desc')
                .get();
            
            const videos = [];
            snapshot.forEach(doc => {
                videos.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return videos;
        } catch (error) {
            console.error('❌ Error getting videos:', error);
            return [];
        }
    },

    // ============= NACHSORGE =============
    
    // Add Aftercare
    async addAftercare(aftercare) {
        try {
            const docRef = await db.collection(this.COLLECTIONS.AFTERCARE).add({
                ...aftercare,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                active: aftercare.active !== false
            });
            
            console.log('✅ Aftercare added with ID:', docRef.id);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('❌ Error adding aftercare:', error);
            return { success: false, error: error.message };
        }
    },

    // Update Aftercare
    async updateAftercare(id, aftercare) {
        try {
            await db.collection(this.COLLECTIONS.AFTERCARE).doc(id).update({
                ...aftercare,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            console.log('✅ Aftercare updated:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error updating aftercare:', error);
            return { success: false, error: error.message };
        }
    },

    // Delete Aftercare
    async deleteAftercare(id) {
        try {
            await db.collection(this.COLLECTIONS.AFTERCARE).doc(id).delete();
            console.log('✅ Aftercare deleted:', id);
            return { success: true };
        } catch (error) {
            console.error('❌ Error deleting aftercare:', error);
            return { success: false, error: error.message };
        }
    },

    // Get All Aftercare
    async getAftercare() {
        try {
            const snapshot = await db.collection(this.COLLECTIONS.AFTERCARE)
                .where('active', '==', true)
                .orderBy('createdAt', 'desc')
                .get();
            
            const aftercare = [];
            snapshot.forEach(doc => {
                aftercare.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return aftercare;
        } catch (error) {
            console.error('❌ Error getting aftercare:', error);
            return [];
        }
    },

    // ============= DESIGN SETTINGS =============
    
    // Save Design Settings
    async saveDesign(design) {
        try {
            await db.collection(this.COLLECTIONS.DESIGN).doc('main').set({
                ...design,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            
            console.log('✅ Design settings saved');
            return { success: true };
        } catch (error) {
            console.error('❌ Error saving design:', error);
            return { success: false, error: error.message };
        }
    },

    // Get Design Settings
    async getDesign() {
        try {
            const doc = await db.collection(this.COLLECTIONS.DESIGN).doc('main').get();
            if (doc.exists) {
                return doc.data();
            }
            return null;
        } catch (error) {
            console.error('❌ Error getting design:', error);
            return null;
        }
    },

    // ============= EMERGENCY INFO =============
    
    // Save Emergency Info
    async saveEmergency(emergency) {
        try {
            await db.collection(this.COLLECTIONS.EMERGENCY).doc('main').set({
                ...emergency,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            
            console.log('✅ Emergency info saved');
            return { success: true };
        } catch (error) {
            console.error('❌ Error saving emergency info:', error);
            return { success: false, error: error.message };
        }
    },

    // Get Emergency Info
    async getEmergency() {
        try {
            const doc = await db.collection(this.COLLECTIONS.EMERGENCY).doc('main').get();
            if (doc.exists) {
                return doc.data();
            }
            return null;
        } catch (error) {
            console.error('❌ Error getting emergency info:', error);
            return null;
        }
    },

    // ============= STORAGE FUNCTIONS =============
    
    // Upload Image (for logos and custom icons)
    async uploadImage(file, path) {
        try {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(path);
            
            // Upload file
            const snapshot = await fileRef.put(file);
            
            // Get download URL
            const downloadURL = await snapshot.ref.getDownloadURL();
            
            console.log('✅ Image uploaded:', downloadURL);
            return { success: true, url: downloadURL };
        } catch (error) {
            console.error('❌ Error uploading image:', error);
            return { success: false, error: error.message };
        }
    },

    // Delete Image
    async deleteImage(path) {
        try {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(path);
            
            await fileRef.delete();
            
            console.log('✅ Image deleted:', path);
            return { success: true };
        } catch (error) {
            console.error('❌ Error deleting image:', error);
            return { success: false, error: error.message };
        }
    },

    // ============= BULK OPERATIONS =============
    
    // Get all app data (for export)
    async getAllAppData() {
        try {
            const [praxis, hours, treatments, videos, aftercare, design, emergency] = await Promise.all([
                this.getPraxisInfo(),
                this.getOpeningHours(),
                this.getTreatments(),
                this.getVideos(),
                this.getAftercare(),
                this.getDesign(),
                this.getEmergency()
            ]);

            return {
                praxis,
                oeffnungszeiten: hours,
                treatments,
                videos,
                aftercare,
                design,
                emergency
            };
        } catch (error) {
            console.error('❌ Error getting all app data:', error);
            return null;
        }
    },

    // Import all app data
    async importAllData(data) {
        try {
            const promises = [];
            
            if (data.praxis) {
                promises.push(this.savePraxisInfo(data.praxis));
            }
            
            if (data.oeffnungszeiten) {
                promises.push(this.saveOpeningHours(data.oeffnungszeiten));
            }
            
            if (data.design) {
                promises.push(this.saveDesign(data.design));
            }
            
            if (data.emergency) {
                promises.push(this.saveEmergency(data.emergency));
            }
            
            // Clear existing collections before import
            if (data.treatments) {
                const treatmentsSnapshot = await db.collection(this.COLLECTIONS.TREATMENTS).get();
                treatmentsSnapshot.forEach(doc => doc.ref.delete());
                
                for (const treatment of data.treatments) {
                    promises.push(this.addTreatment(treatment));
                }
            }
            
            if (data.videos) {
                const videosSnapshot = await db.collection(this.COLLECTIONS.VIDEOS).get();
                videosSnapshot.forEach(doc => doc.ref.delete());
                
                for (const video of data.videos) {
                    promises.push(this.addVideo(video));
                }
            }
            
            if (data.aftercare) {
                const aftercareSnapshot = await db.collection(this.COLLECTIONS.AFTERCARE).get();
                aftercareSnapshot.forEach(doc => doc.ref.delete());
                
                for (const item of data.aftercare) {
                    promises.push(this.addAftercare(item));
                }
            }
            
            await Promise.all(promises);
            
            console.log('✅ All data imported successfully');
            return { success: true };
        } catch (error) {
            console.error('❌ Error importing data:', error);
            return { success: false, error: error.message };
        }
    },

    // Real-time listeners for live updates
    subscribeToTreatments(callback) {
        return db.collection(this.COLLECTIONS.TREATMENTS)
            .where('active', '==', true)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const treatments = [];
                snapshot.forEach(doc => {
                    treatments.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback(treatments);
            });
    },

    subscribeToVideos(callback) {
        return db.collection(this.COLLECTIONS.VIDEOS)
            .where('active', '==', true)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const videos = [];
                snapshot.forEach(doc => {
                    videos.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback(videos);
            });
    },

    subscribeToAftercare(callback) {
        return db.collection(this.COLLECTIONS.AFTERCARE)
            .where('active', '==', true)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const aftercare = [];
                snapshot.forEach(doc => {
                    aftercare.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback(aftercare);
            });
    }
};

// Make available globally
window.FirebaseService = FirebaseService;
console.log('🔥 Firebase Service loaded');
