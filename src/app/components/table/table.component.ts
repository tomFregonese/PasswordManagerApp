import {Component, OnInit} from '@angular/core';
import { TableRowComponent } from '../table-row/table-row.component';
import { CommonModule } from '@angular/common';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {Credential} from '../../models/credential.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true, imports: [TableRowComponent, CommonModule],

})


export class TableComponent /*implements OnInit*/ {

  tableData: Credential[] = [
    { websiteUrl:'test.com', username: 'manhhackt08@gmail.com', password: 'password1', modificationDate: new Date()},
    { websiteUrl:'test.com', username: 'trungkienspkntd@gmail.com', password: 'password2', modificationDate: new Date()},
  ];

  /*constructor(private dbService: NgxIndexedDBService) {
    this.dbService.selectDb('pass-protector')
  }

  ngOnInit() {
    this.dbService.getAll<Credential>('credential').subscribe((credentials: Credential[]) => {
      this.tableData = credentials
      console.log(this.tableData)
    })
  }*/

}
