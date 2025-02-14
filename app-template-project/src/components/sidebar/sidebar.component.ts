import { Component, computed, OnInit } from '@angular/core';
import { AppConfigService } from '../../services/appconfig.service';
import { TranslationService } from '../../services/translation.service';
import { CountryService } from '../../services/country.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';

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
  public successMessage = '';
  public errorMessage = '';

  constructor(public appService: AppConfigService,
    public translateService: TranslationService,
    private countryService: CountryService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.appService.getComponentConfig('sidebar');
  }

  sidebarLinks = computed(() => this.appService.getSidebarLinks());

  // onLogOut(): void {
  //   this.successMessage = '';
  //   this.errorMessage = '';

  //   this.authService.logout()
  //     .then(() => {
  //       console.log("success");
  //     })
  //     .catch(error => {
  //       console.error('Logout error:', error);
  //     });
  // }

  onLogOut(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.logout()
      .then(() => {
        console.log("success");

        if (!this.authService.isAuthenticated() && this.router.url === '/services') {
          this.router.navigate(['/auth-required'], { queryParams: { returnUrl: '/services' } });
        }
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  }

  fetchCountries(): void {
    this.countries = [];
    this.loading = true;
    this.error = '';

    this.countryService.fetchCountries().subscribe({
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
