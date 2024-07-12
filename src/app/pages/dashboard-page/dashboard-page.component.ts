import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import {MatDialog} from "@angular/material/dialog";
import {CreatePasswordComponent} from "../../components/create-password/create-password.component";
import {MatButton} from "@angular/material/button";
import {NgxIndexedDBService} from "ngx-indexed-db";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  standalone: true,
  imports: [TableComponent, MatButton]
})


export class DashboardPageComponent {
  searchTerm: string = '';

  constructor(private dialog: MatDialog,) {
  }

  openDialog(){
    this.dialog.open(CreatePasswordComponent);
  }

  searchStart(): void {
    // Implement your search logic here
  }

  exportPasswords(): void {
    // Implement your export passwords logic here
  }
}
