/**
 * Service layer to handle API communication with the MVC Backend
 */

export const fetchScheduleFromApi = async () => {
  try {
    const res = await fetch('/api/schedule');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.success ? data.content : null;
  } catch (err) {
    console.warn('Backend API request failed, falling back to client storage', err);
    return null;
  }
};

export const saveScheduleToApi = async (content) => {
  try {
    const res = await fetch('/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error('Failed to save schedule to Backend API:', err);
    return false;
  }
};
