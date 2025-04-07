import { Injectable } from '@angular/core';
import CryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  private static ENCRYPTION_KEY = 'my-encryption-key';

  set(key: string, value: string): void {
    const encryptedValue = CryptoJs.AES.encrypt(
      value,
      PersistanceService.ENCRYPTION_KEY
    ).toString();
    localStorage.setItem(key, encryptedValue);
  }

  get(key: string): string | null {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;
      return CryptoJs.AES.decrypt(
        encryptedValue,
        PersistanceService.ENCRYPTION_KEY
      ).toString(CryptoJs.enc.Utf8);
    } catch (error) {
      return null;
    }
  }

  clearAuth() {
    localStorage.removeItem('token');
  }
}
