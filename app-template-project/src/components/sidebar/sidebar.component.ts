import { Component, computed, OnInit } from '@angular/core';
import { AppConfigService } from '../../services/appconfig.service';
import { TranslationService } from '../../services/translation.service';
import { CountryService } from '../../services/country.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [NgFor,NgIf, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  countries: any[] = [];
  loading = false;
  error = '';

  constructor(public appService: AppConfigService,
    public translateService: TranslationService,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.appService.getComponentConfig('sidebar');
  }

  sidebarLinks = computed(() => this.appService.getSidebarLinks());

  fetchCountries(): void {
    this.loading = true;
    this.error = '';
    console.log('Fetching countries...');
    this.countryService.getCountries().subscribe({
      next: (data) => {
        console.log('Countries fetched:', data);
        this.countries = data;
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
