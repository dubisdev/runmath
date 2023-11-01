export function get(key: string) {
  return localStorage.getItem(key);
}

export function set(key: string, value: string) {
  return localStorage.setItem(key, value);
}
