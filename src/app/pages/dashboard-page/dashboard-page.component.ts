import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  standalone: true, imports: [TableComponent]
})


export class DashboardPageComponent {
  searchTerm: string = '';


  searchStart(): void {
    // Implement your search logic here
  }

  exportPasswords(): void {
    // Implement your export passwords logic here
  }

  createPassword(): void {
    // Implement your create password logic here
  }
}
