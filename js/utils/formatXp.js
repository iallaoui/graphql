export function formatXp(value = 0) {
  if (!Number.isFinite(value)) {
    return "0 B";
  }

  if (value < 1_000) {
    return `${Math.round(value)} B`;
  }

  if (value < 1_000_000) {
    return `${(value / 1_000).toFixed(2)} KB`;
  }

  return `${(value / 1_000_000).toFixed(2)} MB`;
}
