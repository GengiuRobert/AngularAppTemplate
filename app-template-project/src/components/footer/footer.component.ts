import { Component, OnInit } from '@angular/core';

import { AppConfigService } from '../../services/appconfig.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  constructor(public appService: AppConfigService, public translateService: TranslationService) { }

  ngOnInit(): void {
    this.appService.getComponentConfig('footer');
  }

}
