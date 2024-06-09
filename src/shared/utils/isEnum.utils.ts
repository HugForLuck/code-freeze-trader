export function isEnum<T>(o: unknown, e: object): boolean {
  return Object.values(e).includes(o as T);
}

export function isEnums<T>(os: unknown[], e: object) {
  return !!!os.find((o: T) => !isEnum(o, e));
}
