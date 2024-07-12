import {Component, Inject, Output} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import EventEmitter from "events";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-create-password',
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
    MatInput, MatLabel
  ],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss'
})
export class CreatePasswordComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}
