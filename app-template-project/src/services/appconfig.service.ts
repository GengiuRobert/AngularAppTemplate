import { Injectable, signal } from "@angular/core";
import config from "../assets/config.json";

@Injectable({ providedIn: 'root' })
export class AppConfigService {

    private appConfig: any = config;
    private component: string = "";
    private componentConfig = signal<any>(null);

    //get whole config
    getConfig(): any {
        return this.appConfig;
    }

    //set component to get the config
    setComponent(componentName: "navbar" | "footer" | "sidebar" | "languageSwitcher"): void {
        this.component = componentName;
        this.componentConfig.set(this.appConfig[this.component]);
    }

    //get config for component
    getComponentConfig(): any {
        return this.componentConfig();
    }


}