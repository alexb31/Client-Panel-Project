import { SettingsService } from './../../services/settings.service';
import { ClientService } from './../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client,valid: boolean}) {
    if(this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if(!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add New Client
      this.clientService.newClient(value);
      // Show Message
      this.flashMessage.show('New Client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to dahsboard
      this.router.navigate(['/']);
    }
  }

}
