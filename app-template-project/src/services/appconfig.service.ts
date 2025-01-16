import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AppConfigService {

    private appConfig: any = null;
    private appConfigURL: string = "assets/config.json";

    constructor(private http: HttpClient) {

    }

    //load the whole config
    loadConfig(): Observable<any> {
        return this.http.get(this.appConfigURL).pipe(
            map((dataFromJSON) => {
                this.appConfig = dataFromJSON;
                return dataFromJSON;
            })
        );
    }

    //get whole config
    getConfig() : any{
        return this.appConfig;
    }


}