import { Settings } from './../models/Settings';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  }

  constructor() { }

  getSettings(): Settings {
    return this.settings;
  }
}
