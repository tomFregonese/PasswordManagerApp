import { Component, Input } from '@angular/core';
import {Credential} from "../../models/credential.model";
import {DatePipe} from "@angular/common";
import {NgxIndexedDBService} from "ngx-indexed-db";
import {AppModule} from "../../app.module";
import {MatDialog} from "@angular/material/dialog";
import {CredentialEditComponent} from "../credential-edit/credential-edit.component";

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

  deleteCredential(id: number | undefined){
    const messageConfirm = confirm("Voulez-vous supprimer ce mot de passe ?")
    if(id && messageConfirm){
      this.dbService.deleteByKey('credential', id).subscribe(() => {
        alert("Le mot de passe a été supprimé avec succès !")
        location.reload()
      })
    }
  }

  editCredential(id: number | undefined){
    this.dialog.open(CredentialEditComponent, {data: this.rowData})
    console.log(this.rowData)
  }
}
