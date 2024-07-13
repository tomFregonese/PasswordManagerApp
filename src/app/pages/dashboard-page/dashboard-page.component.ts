import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import {MatDialog} from '@angular/material/dialog';
import {CredentialCreationComponent} from '../../components/credential-creation/credential-creation.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  standalone: true, imports: [TableComponent]
})


export class DashboardPageComponent {

  constructor(private dialog: MatDialog) {
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

}
