const { HttpError } = require('./errors');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (value) =>
  typeof value === 'string' && value.trim().length <= 255 && EMAIL_RE.test(value.trim());

const normalizeEmail = (value) => value.trim().toLowerCase();

const requireEmail = (value, field = 'Email') => {
  if (!isValidEmail(value)) {
    throw new HttpError(400, `${field} must be a valid email address`);
  }
  return normalizeEmail(value);
};

const parseId = (value, name = 'id') => {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0 || n > 2147483647) {
    throw new HttpError(400, `Invalid ${name}`);
  }
  return n;
};

const parsePagination = (query = {}, { defaultLimit = 10, maxLimit = 50 } = {}) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || defaultLimit, 1), maxLimit);
  return { page, limit, offset: (page - 1) * limit };
};

const buildPagination = (page, limit, totalItems) => ({
  currentPage: page,
  totalPages: Math.ceil(totalItems / limit),
  totalItems,
  itemsPerPage: limit
});

const requireString = (value, field, { min = 1, max = 255 } = {}) => {
  if (typeof value !== 'string' || value.trim().length < min) {
    throw new HttpError(400, `${field} is required`);
  }
  const trimmed = value.trim();
  if (trimmed.length > max) {
    throw new HttpError(400, `${field} must be at most ${max} characters`);
  }
  return trimmed;
};

const optionalString = (value, field, { max = 255 } = {}) => {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') {
    throw new HttpError(400, `${field} must be a string`);
  }
  const trimmed = value.trim();
  if (trimmed.length > max) {
    throw new HttpError(400, `${field} must be at most ${max} characters`);
  }
  return trimmed || null;
};

const oneOf = (value, allowed, field) => {
  if (!allowed.includes(value)) {
    throw new HttpError(400, `${field} must be one of: ${allowed.join(', ')}`);
  }
  return value;
};

const parseDate = (value, field) => {
  const date = value === undefined || value === null || value === '' ? null : new Date(value);
  if (!date || Number.isNaN(date.getTime())) {
    throw new HttpError(400, `${field} must be a valid date`);
  }
  return date;
};

// Accepts site-relative paths ("/uploads/...") and absolute http(s) URLs only.
const optionalUrl = (value, field, { allowRelative = true, max = 500 } = {}) => {
  const url = optionalString(value, field, { max });
  if (url === null) return null;
  if (allowRelative && url.startsWith('/') && !url.startsWith('//')) return url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return url;
  } catch (e) {
    // fall through
  }
  throw new HttpError(400, `${field} must be a valid http(s) URL`);
};

const optionalQueryString = (value, max = 100) =>
  typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : undefined;

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const stripHtml = (html = '') => String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

module.exports = {
  isValidEmail,
  normalizeEmail,
  requireEmail,
  parseId,
  parsePagination,
  buildPagination,
  requireString,
  optionalString,
  oneOf,
  parseDate,
  optionalUrl,
  optionalQueryString,
  slugify,
  stripHtml
};
