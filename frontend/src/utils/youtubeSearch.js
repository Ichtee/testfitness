/**
 * YouTube Video Embed Utility (Static Only)
 * Uses pre-configured embed IDs from exercise database.
 * No API key required — no live search functionality.
 */

/**
 * Check if YouTube live API search is configured.
 * Always returns false — live search has been removed.
 */
export function isYouTubeApiConfigured() {
  return false;
}

/**
 * Stub — always returns the fallback video.
 * @param {string} _query - Unused
 * @param {string} fallbackId - Fallback embed ID
 * @returns {Promise<{videoId: string, title: string, thumbnail: string, isLive: boolean}>}
 */
export async function searchExerciseVideo(_query, fallbackId = 'eG9iU9wuUu4') {
  return { videoId: fallbackId, title: '', thumbnail: '', isLive: false };
}
