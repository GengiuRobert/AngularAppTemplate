import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CountryService {

    private apiUrl = 'https://restcountries.com/v3.1/region/europe';

    constructor(private http: HttpClient) { }

    getCountries(): Observable<any> {
        const cachedData = localStorage.getItem('countriesData');
        const cacheTime = localStorage.getItem('countriesCacheTime');
        const now = new Date().getTime();

        if (cachedData && cacheTime && (now - parseInt(cacheTime, 10)) < 24 * 60 * 60 * 1000) {
            console.log('Returning cached countries...');
            return of(JSON.parse(cachedData)).pipe(delay(1500)); 
        }

        console.log('Fetching countries from API...');
        return this.http.get(this.apiUrl).pipe(
            catchError(err => {
                console.error('Error fetching countries:', err);
                return throwError(() => new Error('Failed to load countries.'));
            }),
            switchMap(data => {
                localStorage.setItem('countriesData', JSON.stringify(data));
                localStorage.setItem('countriesCacheTime', now.toString());
                return of(data);
            })
        );
    }
}
