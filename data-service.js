// Data Service Layer - Handles all data fetching from Supabase with caching
import { supabase } from './supabase-client.js';

class DataService {
    constructor() {
        this.cache = {
            praxis: null,
            openingHours: null,
            treatments: null,
            videos: null,
            aftercare: null,
            news: null,
            emergency: null,
            icons: null,
            lastUpdate: {}
        };

        this.cacheExpiry = {
            praxis: 6 * 60 * 60 * 1000, // 6 hours
            openingHours: 6 * 60 * 60 * 1000, // 6 hours
            treatments: 24 * 60 * 60 * 1000, // 24 hours
            videos: 24 * 60 * 60 * 1000, // 24 hours
            aftercare: 24 * 60 * 60 * 1000, // 24 hours
            news: 60 * 60 * 1000, // 1 hour
            emergency: 24 * 60 * 60 * 1000, // 24 hours
            icons: 7 * 24 * 60 * 60 * 1000 // 7 days
        };
    }

    // Check if cache is still valid
    isCacheValid(key) {
        const lastUpdate = this.cache.lastUpdate[key];
        if (!lastUpdate) return false;

        const now = Date.now();
        const expiry = this.cacheExpiry[key] || 60 * 60 * 1000; // Default 1 hour

        return (now - lastUpdate) < expiry;
    }

    // Update cache
    updateCache(key, data) {
        this.cache[key] = data;
        this.cache.lastUpdate[key] = Date.now();

        // Also save to localStorage for offline fallback
        try {
            localStorage.setItem(`cache_${key}`, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
        }
    }

    // Get from cache or localStorage
    getFromCache(key) {
        // Try memory cache first
        if (this.cache[key] && this.isCacheValid(key)) {
            return this.cache[key];
        }

        // Try localStorage
        try {
            const stored = localStorage.getItem(`cache_${key}`);
            if (stored) {
                const { data, timestamp } = JSON.parse(stored);
                const now = Date.now();
                const expiry = this.cacheExpiry[key] || 60 * 60 * 1000;

                if ((now - timestamp) < expiry) {
                    // Update memory cache
                    this.cache[key] = data;
                    this.cache.lastUpdate[key] = timestamp;
                    return data;
                }
            }
        } catch (e) {
            console.warn('Failed to read from localStorage:', e);
        }

        return null;
    }

    // Fetch practice information
    async getPraxisInfo() {
        const cached = this.getFromCache('praxis');
        if (cached) return cached;

        try {
            const { data, error } = await supabase
                .from('praxis_info')
                .select('*')
                .maybeSingle();

            if (error) throw error;

            if (data) {
                this.updateCache('praxis', data);
            }

            return data;
        } catch (error) {
            console.error('Error fetching praxis info:', error);
            return cached; // Return stale cache if available
        }
    }

    // Fetch opening hours
    async getOpeningHours() {
        const cached = this.getFromCache('openingHours');
        if (cached) return cached;

        try {
            const { data, error } = await supabase
                .from('opening_hours')
                .select('*')
                .order('day_of_week');

            if (error) throw error;

            if (data) {
                this.updateCache('openingHours', data);
            }

            return data;
        } catch (error) {
            console.error('Error fetching opening hours:', error);
            return cached;
        }
    }

    // Fetch treatments
    async getTreatments() {
        const cached = this.getFromCache('treatments');
        if (cached) return cached;

        try {
            const { data, error } = await supabase
                .from('treatments')
                .select('*')
                .eq('active', true)
                .order('sort_order');

            if (error) throw error;

            if (data) {
                this.updateCache('treatments', data);
            }

            return data;
        } catch (error) {
            console.error('Error fetching treatments:', error);
            return cached;
        }
    }

    // Fetch videos
    async getVideos() {
        const cached = this.getFromCache('videos');
        if (cached) return cached;

        try {
            const { data, error } = await supabase
                .from('videos')
                .select('*')
                .eq('active', true)
                .order('sort_order');

            if (error) throw error;

            if (data) {
                this.updateCache('videos', data);
            }

            return data;
        } catch (error) {
            console.error('Error fetching videos:', error);
            return cached;
        }
    }

    // Fetch aftercare
    async getAftercare() {
        const cached = this.getFromCache('aftercare');
        if (cached) return cached;

        try {
            const { data, error } = await supabase
                .from('aftercare')
                .select('*')
                .eq('active', true)
                .order('sort_order');

            if (error) throw error;

            if (data) {
                this.updateCache('aftercare', data);
            }

            return data;
        } catch (error) {
            console.error('Error fetching aftercare:', error);
            return cached;
        }
    }

    // Fetch news articles
    async getNews(limit = 20) {
        const cached = this.getFromCache('news');
        if (cached) return cached;

        try {
            const { data, error} = await supabase
                .from('news')
                .select('*')
                .eq('is_published', true)
                .order('published_at', { ascending: false })
                .limit(limit);

            if (error) throw error;

            if (data) {
                this.updateCache('news', data);
            }

            return data;
        } catch (error) {
            console.error('Error fetching news:', error);
            return cached;
        }
    }

    // Fetch emergency info
    async getEmergencyInfo() {
        const cached = this.getFromCache('emergency');
        if (cached) return cached;

        try {
            const { data, error } = await supabase
                .from('emergency_info')
                .select('*')
                .maybeSingle();

            if (error) throw error;

            if (data) {
                this.updateCache('emergency', data);
            }

            return data;
        } catch (error) {
            console.error('Error fetching emergency info:', error);
            return cached;
        }
    }

    // Fetch icon configuration
    async getIconConfig() {
        const cached = this.getFromCache('icons');
        if (cached) return cached;

        try {
            const { data, error } = await supabase
                .from('icon_config')
                .select('*');

            if (error) throw error;

            if (data) {
                // Convert to object for easier lookup
                const iconMap = {};
                data.forEach(icon => {
                    iconMap[icon.component_key] = {
                        value: icon.icon_value,
                        type: icon.icon_type
                    };
                });
                this.updateCache('icons', iconMap);
                return iconMap;
            }

            return {};
        } catch (error) {
            console.error('Error fetching icon config:', error);
            return cached || {};
        }
    }

    // Fetch all data at once
    async fetchAll() {
        const results = await Promise.allSettled([
            this.getPraxisInfo(),
            this.getOpeningHours(),
            this.getTreatments(),
            this.getVideos(),
            this.getAftercare(),
            this.getNews(),
            this.getEmergencyInfo(),
            this.getIconConfig()
        ]);

        return {
            praxis: results[0].status === 'fulfilled' ? results[0].value : null,
            openingHours: results[1].status === 'fulfilled' ? results[1].value : null,
            treatments: results[2].status === 'fulfilled' ? results[2].value : null,
            videos: results[3].status === 'fulfilled' ? results[3].value : null,
            aftercare: results[4].status === 'fulfilled' ? results[4].value : null,
            news: results[5].status === 'fulfilled' ? results[5].value : null,
            emergency: results[6].status === 'fulfilled' ? results[6].value : null,
            icons: results[7].status === 'fulfilled' ? results[7].value : null
        };
    }

    // Force refresh all data (invalidate cache)
    async refreshAll() {
        // Clear all caches
        Object.keys(this.cache.lastUpdate).forEach(key => {
            this.cache.lastUpdate[key] = 0;
        });

        return await this.fetchAll();
    }

    // Get last update time for UI display
    getLastUpdateTime(key = 'news') {
        const timestamp = this.cache.lastUpdate[key];
        if (!timestamp) return null;

        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (60 * 1000));
        const hours = Math.floor(diff / (60 * 60 * 1000));
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));

        if (minutes < 1) return 'gerade eben';
        if (minutes < 60) return `vor ${minutes} Min`;
        if (hours < 24) return `vor ${hours} Std`;
        return `vor ${days} Tag${days > 1 ? 'en' : ''}`;
    }
}

// Create singleton instance
export const dataService = new DataService();

// Auto-refresh logic for when app comes to foreground
if (typeof document !== 'undefined') {
    let autoRefreshInterval;

    // Refresh when page becomes visible
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            console.log('App resumed, checking for updates...');
            dataService.fetchAll();
        }
    });

    // Auto-refresh every 10 minutes while app is active
    const startAutoRefresh = () => {
        if (autoRefreshInterval) clearInterval(autoRefreshInterval);

        autoRefreshInterval = setInterval(() => {
            if (!document.hidden) {
                console.log('Auto-refresh: Fetching fresh data...');
                dataService.fetchAll();
            }
        }, 10 * 60 * 1000); // 10 minutes
    };

    // Start auto-refresh when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startAutoRefresh);
    } else {
        startAutoRefresh();
    }
}

console.log('✅ Data service initialized with smart caching');
