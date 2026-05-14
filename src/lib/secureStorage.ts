"use client";

// Simple XOR encryption for demonstration (not for real production use)
// In a real app, use Web Crypto API (SubtleCrypto)
const SECRET_KEY = 'dcsprep-secure-key';

function xorEncryptDecrypt(input: string): string {
  let output = '';
  for (let i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length));
  }
  return output;
}

export function saveSecurely(key: string, data: any) {
  if (typeof window === 'undefined') return;
  const jsonString = JSON.stringify(data);
  const encrypted = xorEncryptDecrypt(jsonString);
  localStorage.setItem(key, btoa(encrypted));
}

export function loadSecurely(key: string): any | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(key);
  if (!stored) return null;
  try {
    const decoded = atob(stored);
    const decrypted = xorEncryptDecrypt(decoded);
    return JSON.parse(decrypted);
  } catch (e) {
    console.error('Failed to decrypt data', e);
    return null;
  }
}
