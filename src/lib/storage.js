// LocalStorage drafts. Every access is wrapped — storage can be blocked or full.
const KEY = 'foliomuse.draft.v1';

export function loadDraft() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Returns true on success, false if storage is full/blocked.
export function saveDraft(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function getPref(key, fallback) {
  try {
    const v = localStorage.getItem('foliomuse.pref.' + key);
    return v === null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
}
export function setPref(key, value) {
  try {
    localStorage.setItem('foliomuse.pref.' + key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}
