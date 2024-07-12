import { Component} from '@angular/core';
import { TableRowComponent } from '../table-row/table-row.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true, imports: [TableRowComponent, CommonModule],

})


export class TableComponent {
  tableData = [
    { website:'test.com', username: 'manhhackt08@gmail.com', password: 'password1', modificationDate: 'Dec 29, 09:42 PM' },
    { website:'test.com', username: 'trungkienspkntd@gmail.com', password: 'password2', modificationDate: 'Dec 29, 09:42 PM'},
  ];
}
