import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authguard',
  imports: [],
  templateUrl: './authguard.component.html',
  styleUrl: './authguard.component.css'
})
export class AuthguardComponent {

  private returnUrl: string;

  constructor(private router: Router, private route: ActivatedRoute, public translateService: TranslationService) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  redirectToLogin(): void {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.returnUrl } });
  }

}
