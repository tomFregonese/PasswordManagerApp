import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AppModule} from "../../app.module";
import {Credential} from "../../models/credential.model";
import {NgxIndexedDBService} from "ngx-indexed-db";

@Component({
  selector: 'app-credential-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatInput, MatLabel, AppModule
  ],
  templateUrl: './credential-edit.component.html',
  styleUrl: './credential-edit.component.scss'
})
export class CredentialEditComponent implements OnInit {
  passwordEditForm!: FormGroup
  @Input() credential! : Credential

  constructor(private builder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Credential,
              private dbService: NgxIndexedDBService) {
  }

  ngOnInit() {
    this.passwordEditForm = this.builder.group({
      username: ["", Validators.required],
      websiteUrl: ["", Validators.required],
      password: ["", Validators.required],
      description: [""]
    })
    this.credential = this.data
  }

  editPassword(){
    if(this.credential.id !== undefined){
      const newCredential: Credential = {
        id: this.data.id,
        modificationDate: new Date(),
        username: this.passwordEditForm.value.username,
        password: this.passwordEditForm.value.password,
        websiteUrl: this.passwordEditForm.value.websiteUrl,
        description: this.passwordEditForm.value.description
      }
      this.dbService.update<Credential>('credential', newCredential).subscribe(() => {
        alert("Votre mot de passe a bien été mis à jour !")
        location.reload()
      })
    }
  }
}
