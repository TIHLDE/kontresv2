import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function leftPad(value: number | string, length: number, padChar = "0") {
  return String(value).padStart(length, padChar);
}
