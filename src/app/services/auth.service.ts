import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import * as bcrypt from 'bcryptjs';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'appPasswordHash';
  private tempPassword: string = 'tempPassword'

  constructor(@Inject(PLATFORM_ID) private platformId: object) {

  }

  accountCreation(password: string): void {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    localStorage.setItem(this.storageKey, hash);
  }

  checkPassword(password: string): boolean {
    const storedHash = localStorage.getItem(this.storageKey);
    if (storedHash) {
      console.log('storedHash', storedHash)
      console.log('password', password)
      return bcrypt.compareSync(password, storedHash);
    }
    return false;
  }

  isAuthenticated(): boolean {
    if(isPlatformBrowser(this.platformId)){
      return this.checkPassword(localStorage.getItem(this.tempPassword) || '')
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tempPassword);
  }
}