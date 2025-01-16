import { Injectable } from "@angular/core";
import  config  from "../assets/config.json";

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    
    private appConfig: any = config ;
    private component: string = "";

    //get whole config
    getConfig() : any{
        return this.appConfig;
    }

    //set component to get the config
    setComponent(componentName : "navbar" | "footer" | "sidebar" | "languageSwitcher") : void{
        this.component = componentName;
    }

    //get config for component
    getComponentConfig() : any{
        return this.appConfig[this.component];
    }


}