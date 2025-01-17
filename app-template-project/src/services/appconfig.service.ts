import { computed, Injectable, signal } from "@angular/core";
import config from "../assets/config.json";

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    private appConfigSignal = signal<any>(config);
    private currentRoute = signal<string>('/');

    getComponentConfig(componentName: "navbar" | "footer" | "sidebar" | "languageSwitcher"): any {
        return this.appConfigSignal()?.[componentName];
    }

    setCurrentRoute(route: string): void {
        this.currentRoute.set(route);
    }

    getCurrentRoute(): string{
        return this.currentRoute();
    }

    getSidebarLinks = computed(() => {
        const sidebarConfig = this.getComponentConfig('sidebar');
        return sidebarConfig.links[this.currentRoute()] || [];
    });

}