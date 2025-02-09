import { Component, computed, OnInit } from '@angular/core';
import { AppConfigService } from '../../services/appconfig.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  constructor(public appService: AppConfigService,
    public translateService: TranslationService
  ) { }

  ngOnInit(): void {
    this.appService.getComponentConfig('sidebar');
  }

  sidebarLinks = computed(() => this.appService.getSidebarLinks());
}
