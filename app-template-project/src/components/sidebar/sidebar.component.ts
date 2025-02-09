import { Component, computed, OnInit } from '@angular/core';
import { AppConfigService } from '../../services/appconfig.service';
import { TranslationService } from '../../services/translation.service';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  constructor(public appService: AppConfigService,
    public translateService: TranslationService,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.appService.getComponentConfig('sidebar');
  }

  sidebarLinks = computed(() => this.appService.getSidebarLinks());

  fetchCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        console.log('Countries fetched:');
      },
      error: (err) => {
        console.error('Error:');
      }
    });
  }
}
