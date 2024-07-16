import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private timeoutId: any;
  private idleTime: number = 600000; // 1 minute
  private idle$: Subject<boolean> = new Subject<boolean>();

  constructor(private ngZone: NgZone) { }

  startWatching(): void {
    if (typeof document === 'undefined') {
        return;
    }

    console.log('Started tracking user\'s activity');
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', () => this.resetTimer(), true);
      document.addEventListener('click', () => this.resetTimer(), true);
      document.addEventListener('keypress', () => this.resetTimer(), true);
      document.addEventListener('scroll', () => this.resetTimer(), true);
    });
    this.resetTimer();
  }

  resetTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.ngZone.run(() => {
        this.idle$.next(true);
      });
    }, this.idleTime);
  }

  getIdleStatus(): Observable<boolean> {
    return this.idle$.asObservable();
  }

  stopWatching(): void {
    clearTimeout(this.timeoutId);
    document.removeEventListener('mousemove', () => this.resetTimer(), true);
    document.removeEventListener('click', () => this.resetTimer(), true);
    document.removeEventListener('keypress', () => this.resetTimer(), true);
    document.removeEventListener('scroll', () => this.resetTimer(), true);
    console.log('Stopped tracking user\'s activity');
  }
}
