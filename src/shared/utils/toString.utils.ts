export function toString(data: unknown) {
  if (typeof data === 'string') return data;
  if (!data || Object.keys(data as object).length === 0) return '';
  return JSON.stringify(data);
}
