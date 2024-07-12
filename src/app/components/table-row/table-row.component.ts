import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
  standalone: true
})
export class TableRowComponent {
  @Input() rowData: any;
}
