const BLOCKED_PATTERNS = [
  /\bspam\b/i,
  /\bscam\b/i,
  /\bphishing\b/i,
  /\bfuck\b/i,
  /\bshit\b/i,
  /\bbitch\b/i,
  /\basshole\b/i
];

const MAX_TEXT_LENGTH = 5000;

function moderateText(value = '') {
  const text = String(value).trim();

  if (!text) {
    return {
      allowed: false,
      reason: 'Content cannot be empty.'
    };
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return {
      allowed: false,
      reason: `Content cannot exceed ${MAX_TEXT_LENGTH} characters.`
    };
  }

  const matched = BLOCKED_PATTERNS.find(pattern =>
    pattern.test(text)
  );

  if (matched) {
    return {
      allowed: false,
      reason:
        'This content contains language that is not allowed.'
    };
  }

  return {
    allowed: true,
    reason: null
  };
}

module.exports = {
  moderateText
};