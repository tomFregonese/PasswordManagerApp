import {Component, Inject, OnInit, Output} from '@angular/core';
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
import {AppModule} from "../../../app.module";

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [
    // BrowserAnimationsModule,
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
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss'
})
export class CreatePasswordComponent implements OnInit{

  passwordForm!: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private builder: FormBuilder, private dbService: NgxIndexedDBService) {
    this.dbService.selectDb("pass-protector")

  }

  ngOnInit(): void {
    this.passwordForm = this.builder.group({
    username: ["", Validators.required],
    websiteUrl: ["", Validators.required],
    password: ["", Validators.required],
    description: [""]
    })
  }

  createPassword(){
    const credential : Credential = {
      password: this.passwordForm.value.password,
      username: this.passwordForm.value.username,
      websiteUrl: this.passwordForm.value.websiteUrl,
      modificationDate: new Date()
    }

    this.dbService.add<Credential>('credential', credential).subscribe(result => {
      console.log(result)
    })
  }
}
