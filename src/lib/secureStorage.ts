"use client";

/**
 * WARNING: This is NOT production-grade encryption.
 * This is a simple XOR-based obfuscation helper designed to prevent casual 
 * inspection of LocalStorage. It uses a hardcoded key and is NOT secure against 
 * any deliberate attempt to access the data.
 * 
 * USE CASE: Local-only privacy assistance for non-sensitive professional development progress.
 * RESTRICTION: NEVER store real student, staff, parent, or credential data here.
 */
const OBFUSCATION_KEY = 'dcsprep-local-obfuscation-only';

function xorProcess(input: string): string {
  let output = '';
  for (let i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) ^ OBFUSCATION_KEY.charCodeAt(i % OBFUSCATION_KEY.length));
  }
  return output;
}

export function saveWithLocalObfuscation(key: string, data: any) {
  if (typeof window === 'undefined') return;
  const jsonString = JSON.stringify(data);
  const processed = xorProcess(jsonString);
  localStorage.setItem(key, btoa(processed));
}

export function loadWithLocalObfuscation(key: string): any | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(key);
  if (!stored) return null;
  try {
    const decoded = atob(stored);
    const decrypted = xorProcess(decoded);
    return JSON.parse(decrypted);
  } catch (e) {
    console.error('Failed to de-obfuscate data', e);
    return null;
  }
}
