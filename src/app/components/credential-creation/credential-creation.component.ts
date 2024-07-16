import {Component, Inject, Input, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {NgxIndexedDBService} from "ngx-indexed-db";
import {Credential} from "../../models/credential.model";
import {AppModule} from "../../app.module";

@Component({
  selector: 'app-credential-creation',
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
  templateUrl: './credential-creation.component.html',
  styleUrl: './credential-creation.component.scss'
})
export class CredentialCreationComponent implements OnInit{
  protected update: boolean = false
  @Input() credential : Credential | undefined

  credentialForm!: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: Credential,
              private builder: FormBuilder,
              private dbService: NgxIndexedDBService) {
    this.dbService.selectDb("pass-protector")
  }

  ngOnInit(): void {
    this.credential = this.data
    if (this.credential?.id !== undefined) {
      this.update = true
    }
    this.credentialForm = this.builder.group({
      username: [this.credential?.username, Validators.required],
      websiteUrl: [this.credential?.websiteUrl, Validators.required],
      password: [this.credential?.password, Validators.required],
      description: [this.credential?.description]
    })
  }

  validate(): void {
    if (this.update) {
        this.editPassword();
    } else {
      this.createPassword()
    }
  }


  createPassword(){
    const credential : Credential = {
      password: this.credentialForm.value.password,
      username: this.credentialForm.value.username,
      websiteUrl: this.credentialForm.value.websiteUrl,
      modificationDate: new Date()
    }

    this.dbService.add<Credential>('credential', credential).subscribe(() => {
      location.reload() //TODO - Fix the way the table is reloaded to not trigger the event on
    })                  // dashboard-page.component.ts line 29
  }


  editPassword(){
    if(this.credential?.id !== undefined){
      const newCredential: Credential = {
        id: this.data.id,
        modificationDate: new Date(),
        username: this.credentialForm.value.username,
        password: this.credentialForm.value.password,
        websiteUrl: this.credentialForm.value.websiteUrl,
        description: this.credentialForm.value.description
      }
      this.dbService.update<Credential>('credential', newCredential).subscribe(() => {
        alert("Password successfully updated!")
        location.reload()
      })
    }
  }

  auto_grow() {
    let textArea = document.getElementById('description');
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  }

}
