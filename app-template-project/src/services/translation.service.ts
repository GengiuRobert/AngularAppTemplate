import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {

    private translations: { [key: string]: string } = {};
    private currentLang = new BehaviorSubject<string>('en');


    constructor(private http: HttpClient) {
        const savedLanguage = localStorage.getItem('appLanguage') || 'en';
        this.loadTranslations(savedLanguage);
    }

    loadTranslations(lang: string): void {
        const url = '/assets/i18n/' + lang + '.json';
         
        this.http.get<{ [key: string]: string }>(url).subscribe({
            next: (translations) => {
                this.translations = translations;
                this.currentLang.next(lang);
            },
            error: (err) => console.error(`Failed to load translations for ${lang}:`, err)
        });
    }
    translate(key: string): string {
        return this.translations[key] || key;
    }

    setLanguage(lang: string): void {
        localStorage.setItem('appLanguage', lang);
        this.loadTranslations(lang);
    }

    getCurrentLangObservable() {
        return this.currentLang.asObservable();
    }

    getCurrentLang(): string {
        return this.currentLang.getValue();
    }
}