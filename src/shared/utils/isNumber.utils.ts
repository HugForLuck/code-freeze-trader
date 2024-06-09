export default function isNumber(object: unknown) {
  return !isNaN(Number(object));
}
