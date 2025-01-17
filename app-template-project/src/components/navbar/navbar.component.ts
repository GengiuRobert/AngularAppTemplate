import { Component, OnInit, signal } from '@angular/core';
import { AppConfigService } from '../../services/appconfig.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {

  constructor(public appService: AppConfigService) { }

  ngOnInit(): void {

    this.appService.getComponentConfig('navbar');

  }

  onNavClick(route: string): void {
    this.appService.setCurrentRoute(route); 
  }

  isActive(route: string): boolean{
    return this.appService.getCurrentRoute() === route;
  }

}
