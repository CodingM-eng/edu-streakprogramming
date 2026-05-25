// cache.js - exam progress and backup storage helper
const CacheManager = {
  authKey: 'exam_app_user',
  secret: 'ExamGateSecret2026',
  getCacheKey(user) {
    return `exam_cache_${user}`;
  },
  getHistoryKey(user) {
    return `exam_history_${user}`;
  },
  getProgressKey(user) {
    return `user_progress_${user}`;
  },
  saveAuthUser(user) {
    localStorage.setItem(this.authKey, user);
  },
  loadAuthUser() {
    return localStorage.getItem(this.authKey);
  },
  clearAuth() {
    localStorage.removeItem(this.authKey);
  },
  saveCache(user, cache) {
    const payload = {
      cache,
      checksum: this.computeChecksum(cache)
    };
    localStorage.setItem(this.getCacheKey(user), JSON.stringify(payload));
  },
  loadCache(user) {
    const raw = localStorage.getItem(this.getCacheKey(user));
    if (!raw) return null;
    try {
      const payload = JSON.parse(raw);
      if (!payload || !payload.cache || !payload.checksum) {
        localStorage.removeItem(this.getCacheKey(user));
        return null;
      }
      if (this.computeChecksum(payload.cache) !== payload.checksum) {
        localStorage.removeItem(this.getCacheKey(user));
        return null;
      }
      return payload.cache;
    } catch (err) {
      localStorage.removeItem(this.getCacheKey(user));
      return null;
    }
  },
  removeCache(user) {
    localStorage.removeItem(this.getCacheKey(user));
  },
  saveHistory(user, history) {
    localStorage.setItem(this.getHistoryKey(user), JSON.stringify(history));
  },
  loadHistory(user) {
    const raw = localStorage.getItem(this.getHistoryKey(user));
    if (!raw) return [];
    try {
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      return [];
    }
  },
  saveProgress(user, progress) {
    localStorage.setItem(this.getProgressKey(user), JSON.stringify(progress));
  },
  loadProgress(user) {
    const raw = localStorage.getItem(this.getProgressKey(user));
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  exportBackup(user, cache, history, progress) {
    return {
      user,
      version: 1,
      exportedAt: new Date().toISOString(),
      exam_cache: cache,
      exam_history: history,
      user_progress: progress
    };
  },
  computeChecksum(value) {
    const text = JSON.stringify(value) + this.secret;
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString(16);
  },
  computeScoreToken(score, timestamp, user) {
    return this.computeChecksum({ score, timestamp, user });
  },
  verifyScoreToken(score, timestamp, user, token) {
    return this.computeScoreToken(score, timestamp, user) === token;
  }
};
