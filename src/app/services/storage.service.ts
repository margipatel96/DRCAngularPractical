import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    constructor() { }

    public get(key: string): any {
        return localStorage.getItem(key);
    }

    public set(key: string, value: any): any {
        return localStorage.setItem(key, value);
    }

    public clear(): any {
        return localStorage.clear();
    }
}
