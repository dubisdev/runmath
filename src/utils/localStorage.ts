// wrapper for localStorage
import type { Schema } from "./settingsStorage";

export function get(key: keyof Schema) {
  return localStorage.getItem(key);
}

export function set<T extends keyof Schema>(key: T, value: Schema[T]) {
  return localStorage.setItem(key, String(value));
}
