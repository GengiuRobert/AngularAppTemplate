import { Injectable, signal, computed } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";
import config from "../assets/config.json";
import { TranslationService } from "./translation.service";

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private appConfigSignal = signal<any>(config);
  private currentRoute = signal<string>('/');
  private isDropdownOpen = signal<boolean>(false);
  private selectedLanguage = signal<string>('en');

  constructor(private translationService: TranslationService,
  ) {
    const savedLanguage = localStorage.getItem('appLanguage') || 'en';
    this.selectedLanguage.set(savedLanguage);
    this.translationService.setLanguage(savedLanguage);
  }

  initializeRouteTracking(router: Router): void {
    this.setCurrentRoute(router.url);
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.setCurrentRoute(event.urlAfterRedirects);
    });
  }

  setCurrentRoute(route: string): void {
    this.currentRoute.set(route);
  }

  isRouteActive(route: string): boolean {
    return this.currentRoute() === route;
  }

  toggleDropdown(): void {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  isLanguageDropdownOpen(): boolean {
    return this.isDropdownOpen();
  }

  changeLanguage(languageCode: string): void {
    this.selectedLanguage.set(languageCode);
    localStorage.setItem('appLanguage', languageCode);
    this.translationService.setLanguage(languageCode);
    this.isDropdownOpen.set(false);
  }

  getLanguage(): string {
    return this.selectedLanguage();
  }

  getAvailableLanguages = computed(() => {
    const languageConfig = this.getComponentConfig('languageSwitcher');
    return languageConfig?.enabled ? languageConfig.language.filter((lang: any) => lang.enabled) : [];
  });

  getSidebarLinks = computed(() => {
    const sidebarConfig = this.getComponentConfig('sidebar');
    return sidebarConfig.links[this.currentRoute()] || [];
  });

  getComponentConfig(componentName: "navbar" | "footer" | "sidebar" | "languageSwitcher"): any {
    return this.appConfigSignal()?.[componentName];
  }
}
