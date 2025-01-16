import { Component, OnInit, signal } from '@angular/core';
import { AppConfigService } from '../../services/appconfig.service';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {

  constructor(public appService: AppConfigService) { }

  ngOnInit(): void {

    this.appService.getComponentConfig('navbar');

  }

}
