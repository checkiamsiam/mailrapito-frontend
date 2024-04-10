/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie, setCookie } from "cookies-next";

export function loadObj(key: string) {
  return getCookie(key);
}

export function persistObj(key: string, value: any) {
  // localStorage.setItem(key, JSON.stringify(value));
  setCookie(key, value, { path: "/" });
}
