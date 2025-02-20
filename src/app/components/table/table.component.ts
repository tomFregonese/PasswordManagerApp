import {Component, OnInit} from '@angular/core';
import { TableRowComponent } from '../table-row/table-row.component';
import { CommonModule } from '@angular/common';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {Credential} from '../../models/credential.model';
import {AppModule} from '../../app.module';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [TableRowComponent,
    CommonModule,
    AppModule],

})


export class TableComponent implements OnInit {

  tableData: Credential[] = [];

  constructor(private dbService: NgxIndexedDBService) {
    this.dbService.selectDb('pass-protector')
  }

  ngOnInit() {
    this.dbService.getAll<Credential>('credential').subscribe((credentials: Credential[]) => {
      this.tableData = credentials
    })
  }

}
