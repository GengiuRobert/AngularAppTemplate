import { Injectable, signal } from "@angular/core";
import config from "../assets/config.json";

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    private appConfigSignal = signal<any>(config);

    getComponentConfig(componentName: "navbar" | "footer" | "sidebar" | "languageSwitcher"): any {
        return this.appConfigSignal()?.[componentName];
    }
}