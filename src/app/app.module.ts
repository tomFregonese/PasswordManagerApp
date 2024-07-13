import { NgModule } from '@angular/core';
import {DBConfig, NgxIndexedDBModule, NgxIndexedDBService} from 'ngx-indexed-db';

const dbConfig: DBConfig = {
    name: 'pass-protector',
    objectStoresMeta: [
        {
            store: 'credential',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'username', keypath: 'username', options: { unique: false } },
                { name: 'websiteUrl', keypath: 'websiteUrl', options: { unique: false } },
                { name: 'password', keypath: 'password', options: { unique: false } },
                { name: 'description', keypath: 'description', options: { unique: false } },
                { name: 'modificationDate', keypath: 'modificationDate', options: { unique: false } }
            ]
        },
        {
            store: 'user',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                {name: 'password', keypath: 'password', options: { unique: false }}
            ]
        }
    ],
    version: 1
};

@NgModule({
    imports: [
        NgxIndexedDBModule.forRoot(dbConfig)
    ]
})
export class AppModule {}
