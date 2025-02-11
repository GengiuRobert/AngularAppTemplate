import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';


import { NavbarComponent } from "../components/navbar/navbar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FooterComponent, SidebarComponent, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'app-template-project';

  public noSideBarPage = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const routesWithoutSidebar = ['/404', '/signup','/login','/auth-required'];
        this.noSideBarPage = routesWithoutSidebar.some(route => event.urlAfterRedirects.startsWith(route));
      }
    });
  }
}
