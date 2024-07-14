import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Subscription} from 'rxjs';
import {IdleService} from './services/idle.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'passwordManagerApp';

  private idleSubscription: Subscription | undefined;

  constructor(private idleService: IdleService,
              private authService: AuthService) {}

  ngOnInit(): void {
      this.idleSubscription = this.idleService.getIdleStatus().subscribe((isIdle: boolean) => {
      if (isIdle) {
          if (this.authService.isAuthenticated()){
              this.authService.logout();
              console.log('Logged out due to inactivity');
          }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
  }

}
