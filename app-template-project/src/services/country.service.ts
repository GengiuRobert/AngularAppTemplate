import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CountryService {

    private apiUrl = 'https://restcountries.com/v3.1/region/europe';

    constructor(private http: HttpClient) {}

    getCountries(): Observable<any> {
        return this.http.get(this.apiUrl).pipe(
            catchError(err => {
                console.error('Error fetching countries:', err);
                return throwError(() => new Error('Failed to load countries.'));
            })
        );
    }
}
