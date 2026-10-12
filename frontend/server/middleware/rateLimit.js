// Fixed-window rate limiter kept in memory for this server process.
// Requests above "max" in one window get HTTP 429 until the window ends.
function createRateLimiter({ windowMs, max, message, now = () => Date.now() }) {
  const hits = new Map();

  function sweep(current) {
    for (const [key, entry] of hits) {
      if (current - entry.start >= windowMs) hits.delete(key);
    }
  }

  return function rateLimit(req, res, next) {
    const current = now();
    if (hits.size > 5000) sweep(current);
    const key = req.ip || "unknown";
    let entry = hits.get(key);
    if (!entry || current - entry.start >= windowMs) {
      entry = { start: current, count: 0 };
      hits.set(key, entry);
    }
    entry.count += 1;
    if (entry.count > max) {
      const retrySeconds = Math.max(1, Math.ceil((entry.start + windowMs - current) / 1000));
      res.set("Retry-After", String(retrySeconds));
      return res.status(429).json({ success: false, message: message || "Too many requests. Please wait and try again." });
    }
    return next();
  };
}

module.exports = { createRateLimiter };
