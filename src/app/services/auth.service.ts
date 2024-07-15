import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Router} from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'appPasswordHash';
  private tempPassword: string = 'tempPassword'

  constructor(@Inject(PLATFORM_ID) private platformId: object,
              private router: Router) {

  }

  accountCreation(password: string): void {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    localStorage.setItem(this.storageKey, hash);
  }

  checkPassword(password: string): boolean {
    const storedHash = localStorage.getItem(this.storageKey);
    if (storedHash) {
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
    this.router.navigate(['/login']).then();
  }
}
