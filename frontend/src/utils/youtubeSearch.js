/**
 * YouTube Data API v3 - Exercise Video Search Utility
 * Fetches relevant tutorial/form-guide videos for exercises.
 * Results are cached in localStorage to minimize API quota usage.
 * 
 * IMPORTANT: Restrict your API key in Google Cloud Console:
 *   - Application restriction: HTTP referrers → ichtee.github.io/*
 *   - API restriction: YouTube Data API v3 only
 */

// ⚠️ Paste your YouTube Data API v3 key here
const YOUTUBE_API_KEY = 'AIzaSyCYZx3PVZ6y7c-B8XC7TVh-mjfFz8SARr8';

const CACHE_KEY = 'fitpulse_yt_cache';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Load cached search results from localStorage
 */
function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const cache = JSON.parse(raw);
    // Purge expired entries
    const now = Date.now();
    const cleaned = {};
    for (const [key, entry] of Object.entries(cache)) {
      if (now - entry.timestamp < CACHE_TTL_MS) {
        cleaned[key] = entry;
      }
    }
    return cleaned;
  } catch {
    return {};
  }
}

/**
 * Save cache to localStorage
 */
function saveCache(cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

/**
 * Search YouTube for exercise tutorial videos.
 * Returns a random video ID from the top results.
 * 
 * @param {string} query - Search query (e.g. "Bench Press form guide")
 * @param {string} fallbackId - Fallback embed ID if API fails
 * @returns {Promise<{videoId: string, title: string, thumbnail: string, isLive: boolean}>}
 */
export async function searchExerciseVideo(query, fallbackId = 'eG9iU9wuUu4') {
  // If no API key configured, return fallback immediately
  if (!YOUTUBE_API_KEY) {
    return { videoId: fallbackId, title: '', thumbnail: '', isLive: false };
  }

  const cacheKey = query.toLowerCase().trim();
  const cache = loadCache();

  // Check cache first
  if (cache[cacheKey] && cache[cacheKey].videos && cache[cacheKey].videos.length > 0) {
    const videos = cache[cacheKey].videos;
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    return { ...randomVideo, isLive: true };
  }

  // Call YouTube Data API v3
  try {
    const params = new URLSearchParams({
      part: 'snippet',
      q: `${query} exercise form guide tutorial`,
      type: 'video',
      maxResults: '5',
      videoDuration: 'medium', // 4-20 minutes
      relevanceLanguage: 'en',
      safeSearch: 'strict',
      key: YOUTUBE_API_KEY
    });

    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
    
    if (!response.ok) {
      console.warn(`YouTube API error: ${response.status}`);
      return { videoId: fallbackId, title: '', thumbnail: '', isLive: false };
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return { videoId: fallbackId, title: '', thumbnail: '', isLive: false };
    }

    // Map results to clean format
    const videos = data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.medium?.url || ''
    }));

    // Cache results
    cache[cacheKey] = {
      videos,
      timestamp: Date.now()
    };
    saveCache(cache);

    // Return a random video from results
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    return { ...randomVideo, isLive: true };

  } catch (err) {
    console.warn('YouTube search failed:', err);
    return { videoId: fallbackId, title: '', thumbnail: '', isLive: false };
  }
}

/**
 * Check if a YouTube API key is configured
 */
export function isYouTubeApiConfigured() {
  return YOUTUBE_API_KEY && YOUTUBE_API_KEY.length > 10;
}
