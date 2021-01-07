import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mindfrontend';

  constructor(public authenticationService: AuthenticationService, private router: Router) {
    this.initializeApp()
  }
  initializeApp() {

    
    this.authenticationService.authenticationState.subscribe(state => {
      console.log(state)
      if (state) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['sign-up']);
      }
    });

  }
}
