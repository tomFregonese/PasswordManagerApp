import {Component, Input} from '@angular/core';
import {Credential} from "../../models/credential.model";
import {DatePipe} from "@angular/common";
import {NgxIndexedDBService} from "ngx-indexed-db";
import {AppModule} from "../../app.module";
import {MatDialog} from "@angular/material/dialog";
import {CredentialCreationComponent} from '../credential-creation/credential-creation.component';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
  imports: [
    DatePipe, AppModule
  ],
  standalone: true
})
export class TableRowComponent {
  @Input() rowData!: Credential;

  constructor(private dbService: NgxIndexedDBService, private dialog: MatDialog,) {
    this.dbService.selectDb('pass-protector')
  }

  displayPassword(event: MouseEvent) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.type = 'text'
  }

  hidePassword(event: MouseEvent) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.type = 'password';
  }

  copyToClipboard(event: MouseEvent) {
    const inputElement = event.target as HTMLInputElement;
    navigator.clipboard.writeText(inputElement.value).then(() => {
      console.log('Password copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy password: ', err);
    });
  }

  deleteCredential(id: number | undefined){
    const messageConfirm = confirm("Are you sure to delete this credential?")
    if(id && messageConfirm){
      this.dbService.deleteByKey('credential', id).subscribe(() => {
        location.reload()
        alert("Password successfully deleted!")
      })
    }
  }

  editCredential(id: number | undefined){
    this.dialog.open(CredentialCreationComponent, {data: this.rowData})
  }
}
