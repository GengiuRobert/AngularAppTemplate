import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslationService2 {

    private apiUrl = 'https://libretranslate.com/translate';
    private currentLang = 'en';

    constructor(private http: HttpClient) { }

    translateText(text: string, targetLang: string): Observable<string> {
        const payload = {
            q: text,
            source: this.currentLang,
            target: targetLang,
            format: 'text'
        };

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<{ translatedText: string }>(
            this.apiUrl,
            payload,
            { headers }
        ).pipe(
            map(response => response.translatedText)
        );
    }
    setCurrentLang(lang: string): void {
        this.currentLang = lang;
    }

    getCurrentLang(): string {
        return this.currentLang;
    }

}