import { Injectable } from "@angular/core";
import  config  from "../assets/config.json";

@Injectable({ providedIn: 'root' })
export class AppConfigService {

    private appConfig: any = config ;

    //get whole config
    getConfig() : any{
        return this.appConfig;
    }


}