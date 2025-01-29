import { computed, Injectable, signal } from "@angular/core";
import config from "../assets/config.json";

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    private appConfigSignal = signal<any>(config);
    private currentRoute = signal<string>('/');
    private isDropdownOpen = signal<boolean>(false);
    private selectedLanguage = signal<string>('English');

    getComponentConfig(componentName: "navbar" | "footer" | "sidebar" | "languageSwitcher"): any {
        return this.appConfigSignal()?.[componentName];
    }

    setCurrentRoute(route: string): void {
        this.currentRoute.set(route);
    }

    getCurrentRoute(): string {
        return this.currentRoute();
    }

    getSidebarLinks = computed(() => {
        const sidebarConfig = this.getComponentConfig('sidebar');
        return sidebarConfig.links[this.currentRoute()] || [];
    });

    getAvailableLanguages = computed(() => {
        const languageConfig = this.getComponentConfig('languageSwitcher');
        return languageConfig?.enabled ? languageConfig.language.filter((lang: any) => lang.enabled) : [];
    });

    toggleDropdown(): void {
        this.isDropdownOpen.set(!this.isDropdownOpen());
    }

    isLanguageDropdownOpen(): boolean {
        return this.isDropdownOpen();
    }

    setLanguage(languageSelected: string): void {
        this.selectedLanguage.set(languageSelected);
        this.isDropdownOpen.set(false);
    }

    getLanguage(): string {
        return this.selectedLanguage();
    }


}