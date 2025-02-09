import { Component, computed, OnInit } from '@angular/core';
import { AppConfigService } from '../../services/appconfig.service';
import { TranslationService } from '../../services/translation.service';
import { CountryService } from '../../services/country.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  public countries: any[] = [];
  public loading = false;
  public error = '';

  constructor(public appService: AppConfigService,
    public translateService: TranslationService,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.appService.getComponentConfig('sidebar');
  }

  sidebarLinks = computed(() => this.appService.getSidebarLinks());

  fetchCountries(): void {
    this.countries = [];
    this.loading = true;
    this.error = '';

    const cachedData = localStorage.getItem('countriesData');
    const cacheTime = localStorage.getItem('countriesCacheTime');
    const now = new Date().getTime();

    if (cachedData && cacheTime && (now - parseInt(cacheTime, 10)) < 24 * 60 * 60 * 1000) {
      console.log('Loading countries from cache...');
      setTimeout(() => {
        this.countries = JSON.parse(cachedData);
        this.loading = false;
      }, 1500);
      return;
    }

    console.log('Fetching countries...');
    this.countryService.getCountries().subscribe({
      next: (data) => {
        console.log('Countries fetched:', data);
        this.countries = data;
        localStorage.setItem('countriesData', JSON.stringify(data));
        localStorage.setItem('countriesCacheTime', now.toString());
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = 'Failed to load countries';
        this.loading = false;
      }
    });
  }
}
