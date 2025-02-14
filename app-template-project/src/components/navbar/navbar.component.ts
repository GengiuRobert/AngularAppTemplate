import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppConfigService } from '../../services/appconfig.service';
import { TranslationService } from '../../services/translation.service';
import { AuthService } from '../../services/auth.services';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public isAuthenticated = false;

  constructor(
    public appService: AppConfigService,
    private router: Router,
    public translateService: TranslationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.appService.initializeRouteTracking(this.router);

    this.authService.authState$.subscribe((authState) => {
      this.isAuthenticated = authState;

      if (this.isAuthenticated) {
        this.authService.userPreferencesService
          .getPreferences()
          .then((preferences) => {
            if (preferences?.language) {
              this.appService.changeLanguage(preferences.language);
            }
          })
          .catch((error) => {
            console.error('Error loading preferences:', error);
          });
      }
    });
  }

  toggleDropdown(): void {
    this.appService.toggleDropdown();
  }

  setLanguage(languageCode: string): void {
    this.appService.changeLanguage(languageCode);

    if (this.authService.getCurrentUser()?.uid) {
      this.authService.userPreferencesService
        .savePreferences({ language: languageCode })
        .then(() => {
          console.log('Language preference saved successfully.');
        })
        .catch((error) => {
          console.error('Error saving language preference:', error);
        });
    }
  }

  get currentLanguage(): string {
    return this.appService.getLanguage();
  }

  get availableLanguages() {
    return this.appService.getAvailableLanguages();
  }

  get dropdownOpen(): boolean {
    return this.appService.isLanguageDropdownOpen();
  }

  isActive(route: string): boolean {
    return this.appService.isRouteActive(route);
  }
}
