import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { UserPreferencesService } from '../../services/preferences.services';
import { TranslationService } from '../../services/translation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
})
export class PreferencesComponent implements OnInit {
  public availableLanguages = ['en', 'ro', 'it'];
  public selectedLanguage: string = '';
  public successMessage: string = '';
  public errorMessage: string = '';

  constructor(
    private userPreferencesService: UserPreferencesService,
    public translationService: TranslationService,
  ) { }

  ngOnInit(): void {
    this.loadPreferences();
  }

  savePreferences(): void {
    const preferences = { language: this.selectedLanguage };
    this.userPreferencesService
      .savePreferences(preferences)
      .then(() => {
        this.translationService.setLanguage(this.selectedLanguage);
        this.successMessage = this.translationService.translate('PreferencesSaved');
        this.errorMessage = '';
      })
      .catch((error) => {
        console.error('Error saving preferences:', error);
        this.errorMessage = this.translationService.translate('PreferencesSaveFailed');
        this.successMessage = '';
      });
  }

  loadPreferences(): void {
    this.userPreferencesService
      .getPreferences()
      .then((preferences) => {
        if (preferences.language) {
          this.selectedLanguage = preferences.language;
          this.translationService.setLanguage(this.selectedLanguage);
        }
      })
      .catch((error) => {
        console.error('Error loading preferences:', error);
      });
  }
}
