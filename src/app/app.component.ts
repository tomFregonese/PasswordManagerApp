import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreatePasswordComponent} from "./components/create-password/create-password.component";
import {MatButton} from "@angular/material/button";
import {AppModule} from "../app.module";
import {NgxIndexedDBService} from "ngx-indexed-db";

@Component({
  imports: [
    // RouterOutlet,
    MatButton,
    AppModule
  ],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'passwordManagerApp';

  constructor(private dialog: MatDialog, private dbService: NgxIndexedDBService) {

  }

  openDialog(){
    this.dialog.open(CreatePasswordComponent);
  }
}
