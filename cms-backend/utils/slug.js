const pool = require('../db');

const SLUG_TABLES = { posts: 240, events: 240, tags: 90 };

/**
 * Returns `base` or `base-N` such that no other row in `table` uses it.
 */
async function uniqueSlug(table, base, { excludeId = null, fallback = 'item', db = pool } = {}) {
  const maxLength = SLUG_TABLES[table];
  if (!maxLength) throw new Error(`Unsupported slug table: ${table}`);

  const root = (base || fallback).slice(0, maxLength).replace(/-+$/g, '') || fallback;
  let candidate = root;
  let counter = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { rows } = await db.query(
      `SELECT id FROM ${table} WHERE slug = $1 AND ($2::int IS NULL OR id <> $2)`,
      [candidate, excludeId]
    );
    if (rows.length === 0) return candidate;
    candidate = `${root}-${counter++}`;
  }
}

module.exports = { uniqueSlug };
