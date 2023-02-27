export const valueOrNull = (value: string | undefined) => value ?? null;
export const valueOrDefault = <T>(value: T | undefined, defaultValue: T) =>
  value ?? defaultValue;
