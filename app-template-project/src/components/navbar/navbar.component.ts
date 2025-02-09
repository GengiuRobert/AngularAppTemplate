import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppConfigService } from '../../services/appconfig.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(
    public appService: AppConfigService,
    private router: Router,
    public translateService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.appService.initializeRouteTracking(this.router);
  }

  toggleDropdown(): void {
    this.appService.toggleDropdown();
  }

  setLanguage(languageCode: string): void {
    this.appService.changeLanguage(languageCode);
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
