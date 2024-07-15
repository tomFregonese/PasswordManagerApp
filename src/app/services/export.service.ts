import { Injectable } from '@angular/core';
import { Credential } from '../models/credential.model';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToCsv(credentials: Credential[]): void {
    let csvContent = "url, username, password, description\n";

    const checkValue = (value: any): string => value ? value : '';

    credentials.forEach((credential) => {
        const row: string = `${checkValue(credential.websiteUrl)}, ${checkValue(credential.username)}, ${checkValue(credential.password)}, ${checkValue(credential.description)}\n`
        csvContent += row
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute('href', url);
    link.setAttribute('download', 'credentials.csv');
    link.click();
    document.body.removeChild(link);
  }

}
