import { Component, Input } from '@angular/core';
import {Credential} from "../../models/credential.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
  imports: [
    DatePipe
  ],
  standalone: true
})
export class TableRowComponent {
  @Input() rowData!: Credential;
}