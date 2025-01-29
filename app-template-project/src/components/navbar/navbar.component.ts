import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../../services/appconfig.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterModule,TranslateModule,UpperCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {

  constructor(public appService: AppConfigService, private router: Router) { }

  ngOnInit(): void {

    this.appService.getComponentConfig('navbar');
    this.appService.setCurrentRoute(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.appService.setCurrentRoute(event.urlAfterRedirects);
      });

  }

  onNavClick(route: string): void {
    this.router.navigateByUrl(route);
    this.appService.setCurrentRoute(route);
  }

  isActive(route: string): boolean {
    return this.appService.getCurrentRoute() === route;
  }

}
