import {Component, OnDestroy, OnInit} from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import {MatDialog} from '@angular/material/dialog';
import {CredentialCreationComponent} from '../../components/credential-creation/credential-creation.component';
import {IdleService} from '../../services/idle.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  standalone: true, imports: [TableComponent]
})

export class DashboardPageComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private idleService: IdleService) { }

  ngOnInit(): void {
    this.idleService.startWatching();
  }

  ngOnDestroy(): void {
    this.idleService.stopWatching();
  }

  searchTerm: string = '';


  searchStart(): void {
    // Implement your search logic here
  }

  exportPasswords(): void {
    // Implement your export passwords logic here
  }

  createCredential(){
    this.dialog.open(CredentialCreationComponent);
  }

  logout() {
    this.authService.logout()
  }
}
