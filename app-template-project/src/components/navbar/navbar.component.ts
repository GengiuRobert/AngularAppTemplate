import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../../services/appconfig.service';

@Component({
  standalone : true,
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{

  constructor(private appService: AppConfigService) { }

  ngOnInit(): void {
    const config = this.appService.getConfig();
    console.log("Loaded config",config);
  }



}
