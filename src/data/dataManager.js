import { defaultData } from "./defaultData";

const STORAGE_KEY = "presentation-data";

export function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { ...defaultData };
    }
  }
  return { ...defaultData };
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultData };
}
