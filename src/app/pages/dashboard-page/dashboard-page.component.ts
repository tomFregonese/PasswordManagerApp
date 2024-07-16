import {Component, OnDestroy, OnInit} from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import {MatDialog} from '@angular/material/dialog';
import {CredentialCreationComponent} from '../../components/credential-creation/credential-creation.component';
import {IdleService} from '../../services/idle.service';
import {AuthService} from '../../services/auth.service';
import {Credential} from '../../models/credential.model';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {ExportService} from '../../services/export.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  standalone: true, imports: [TableComponent]
})

export class DashboardPageComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private idleService: IdleService,
              private dbService: NgxIndexedDBService,
              private exportService: ExportService) {
      this.dbService.selectDb('pass-protector')
  }

  ngOnInit(): void {
    window.addEventListener('beforeunload', () => {
      this.authService.logout();
    });
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
    this.dbService.getAll<Credential>('credential').subscribe((credentials: Credential[]) => {
      this.exportService.exportToCsv(credentials)
    })

  }

  createCredential(){
    this.dialog.open(CredentialCreationComponent);
  }

  logout() {
    this.authService.logout()
  }
}
